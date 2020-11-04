package main

import (
	"net/http"
	"net/http/httptest"
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

func TestGETApps(t *testing.T) {
	t.Run("Returns stored apps", func(t *testing.T) {
		want := []App{
			{"Test App", "http://webhook.com", map[string]interface{}{"text": "test"}},
		}
		store := &InMemoryStore{want}
		server := NewServer(store, getConfig())
		request := newGetAppsRequest()
		response := httptest.NewRecorder()

		server.ServeHTTP(response, request)

		got := getAppsFromResponse(t, response.Body)

		assertStatus(t, response.Code, http.StatusOK)
		assertContentType(t, response, ContentTypeJSON)
		assertApps(t, got, want)
	})
}
