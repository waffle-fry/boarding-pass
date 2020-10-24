package main

import (
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGETConfig(t *testing.T) {
	t.Run("Returns stored config", func(t *testing.T) {
		want := Config{"Nationwide"}
		server := NewServer()
		request := newGetConfigRequest()
		response := httptest.NewRecorder()

		server.ServeHTTP(response, request)

		got := getConfigFromResponse(t, response.Body)

		assertStatus(t, response.Code, http.StatusOK)
		assertContentType(t, response, ContentTypeJSON)
		assertConfig(t, got, want)
	})
}

func newGetConfigRequest() *http.Request {
	request, _ := http.NewRequest(http.MethodGet, "/config", nil)
	return request
}

func getConfigFromResponse(t *testing.T, body io.Reader) (config Config) {
	t.Helper()

	err := json.NewDecoder(body).Decode(&config)
	if err != nil {
		t.Fatalf("Unable to parse response %q from server into slice of Config, '%v'", body, err)
	}

	return
}

func assertContentType(t *testing.T, got *httptest.ResponseRecorder, want string) {
	t.Helper()

	if got.Result().Header.Get("content-type") != want {
		t.Errorf("Did not get correct content-type: got %v want %v", got, want)
	}
}

func assertStatus(t *testing.T, got, want int) {
	t.Helper()

	if got != want {
		t.Errorf("Did not get correct status: got %d want %d", got, want)
	}
}

func assertConfig(t *testing.T, got, want Config) {
	t.Helper()

	if got != want {
		t.Errorf("Configs don't match: got %v, want %v", got, want)
	}
}
