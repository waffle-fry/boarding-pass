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

func TestUI(t *testing.T) {
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
}
