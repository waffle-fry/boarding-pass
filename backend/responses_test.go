package main

import (
	"encoding/json"
	"io"
	"testing"
)

func getConfigFromResponse(t *testing.T, body io.Reader) (config Config) {
	t.Helper()

	err := json.NewDecoder(body).Decode(&config)
	if err != nil {
		t.Fatalf("Unable to parse response %q from server into slice of Config, '%v'", body, err)
	}

	return
}

func getAppsFromResponse(t *testing.T, body io.Reader) (apps []App) {
	t.Helper()

	err := json.NewDecoder(body).Decode(&apps)
	if err != nil {
		t.Fatalf("Unable to parse response %q from server into slice of Apps, '%v'", body, err)
	}

	return
}
