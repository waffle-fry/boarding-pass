package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"
)

func TestGETConfig(t *testing.T) {
	t.Run("Returns stored config", func(t *testing.T) {
		want := getConfig()
		store := &InMemoryStore{}
		server := NewServer(store, want)
		request := newGetConfigRequest()
		response := httptest.NewRecorder()

		server.ServeHTTP(response, request)

		got := getConfigFromResponse(t, response.Body)

		assertStatus(t, response.Code, http.StatusOK)
		assertContentType(t, response, ContentTypeJSON)
		assertConfig(t, got, want)
	})
}

func TestDashboard(t *testing.T) {
	t.Run("Loads all dashboard endpoints", func(t *testing.T) {
		endpointTests := []struct {
			endpoint string
		}{
			{"/dashboard"},
			{"/webhooks"},
			{"/webhooks/create"},
			{"/webhooks/edit/1"},
		}

		webhooks := []Webhook{
			{1, "test-webhook", "webhookurl.com", map[string]interface{}{"foo": "bar"}},
		}
		store := &InMemoryStore{webhooks}
		server := NewServer(store, getConfig())

		for _, tt := range endpointTests {
			request := newGetDashboardRequest(tt.endpoint)
			response := httptest.NewRecorder()
			server.ServeHTTP(response, request)

			assertStatus(t, response.Code, http.StatusOK)
		}
	})

	t.Run("Adds a webhook on form submit", func(t *testing.T) {
		want := []Webhook{
			{1, "test-webhook", "webhookurl.com", map[string]interface{}{"foo": "bar"}},
		}

		store := &InMemoryStore{}
		server := NewServer(store, getConfig())

		data := url.Values{}
		dataJSON, _ := json.Marshal(want[0].Data)
		data.Set("name", want[0].Name)
		data.Set("url", want[0].URL)
		data.Set("data", string(dataJSON))

		request := newPostWebhookRequest(data)
		response := httptest.NewRecorder()

		server.ServeHTTP(response, request)
		got := store.GetWebhooks()

		assertWebhooks(t, got, want)
		assertStatus(t, response.Code, http.StatusOK)
	})

	t.Run("Edits a webhook on form submit", func(t *testing.T) {
		webhooks := []Webhook{
			{1, "test-webhook", "webhookurl.com", map[string]interface{}{"foo": "bar"}},
		}
		want := []Webhook{
			{1, "edited-webhook", "webhookurledited.com", map[string]interface{}{"fizz": "buzz"}},
		}
		store := &InMemoryStore{webhooks}
		server := NewServer(store, getConfig())

		data := url.Values{}
		dataJSON, _ := json.Marshal(want[0].Data)
		data.Set("name", want[0].Name)
		data.Set("url", want[0].URL)
		data.Set("data", string(dataJSON))

		request := newPostUpdateWebhookRequest(want[0].ID, data)
		response := httptest.NewRecorder()

		server.ServeHTTP(response, request)
		got := store.GetWebhooks()

		assertWebhooks(t, got, want)
		assertStatus(t, response.Code, http.StatusOK)
	})

	t.Run("Deletes a webhook on link click", func(t *testing.T) {
		webhooks := []Webhook{
			{1, "test-webhook", "webhookurl.com", map[string]interface{}{"foo": "bar"}},
			{2, "another-webhook", "webhookurl.com", map[string]interface{}{"foo": "bar"}},
		}
		want := []Webhook{
			{webhooks[1].ID, webhooks[1].Name, webhooks[1].URL, webhooks[1].Data},
		}
		store := &InMemoryStore{webhooks}
		server := NewServer(store, getConfig())

		request := newGetDeleteWebhookRequest(webhooks[0].ID)
		response := httptest.NewRecorder()

		server.ServeHTTP(response, request)
		got := store.GetWebhooks()

		assertWebhooks(t, got, want)
		assertStatus(t, response.Code, http.StatusSeeOther)
	})
}

func TestWebhooks(t *testing.T) {
	t.Run("Creates endpoints for webhooks in store", func(t *testing.T) {
		webhooks := []Webhook{
			{1, "test-webhook", "http://www.google.com", map[string]interface{}{"foo": "bar"}},
		}

		store := &InMemoryStore{webhooks}
		server := NewServer(store, getConfig())

		request := newGetDashboardRequest(fmt.Sprintf("/%v", webhooks[0].Name))
		response := httptest.NewRecorder()
		server.ServeHTTP(response, request)

		assertStatus(t, response.Code, http.StatusOK)
	})
}
