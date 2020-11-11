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
		}

		store := &InMemoryStore{}
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
			{"test-webhook", "webhookurl.com", map[string]interface{}{"foo": "bar"}},
		}

		store := &InMemoryStore{}
		server := NewServer(store, getConfig())
		dataJSON, _ := json.Marshal(want[0].Data)

		data := url.Values{}
		data.Set("name", want[0].Name)
		data.Set("webhookurl", want[0].URL)
		data.Set("data", string(dataJSON))

		request := newPostWebhookRequest(data)
		response := httptest.NewRecorder()

		server.ServeHTTP(response, request)
		got := store.GetWebhooks()

		assertWebhooks(t, got, want)
		assertStatus(t, response.Code, http.StatusOK)
	})
}

func TestWebhooks(t *testing.T) {
	t.Run("Creates endpoints for webhooks in store", func(t *testing.T) {
		webhooks := []Webhook{
			{"test-webhook", "http://www.google.com", map[string]interface{}{"foo": "bar"}},
		}

		store := &InMemoryStore{webhooks}
		server := NewServer(store, getConfig())

		request := newGetDashboardRequest(fmt.Sprintf("/%v", webhooks[0].Name))
		response := httptest.NewRecorder()
		server.ServeHTTP(response, request)

		assertStatus(t, response.Code, http.StatusOK)
	})
}
