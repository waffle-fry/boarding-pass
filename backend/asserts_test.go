package main

import (
	"net/http/httptest"
	"reflect"
	"testing"
)

func assertStatus(t *testing.T, got, want int) {
	t.Helper()

	if got != want {
		t.Errorf("Did not get correct status: got %d want %d", got, want)
	}
}

func assertContentType(t *testing.T, got *httptest.ResponseRecorder, want string) {
	t.Helper()

	if got.Result().Header.Get("content-type") != want {
		t.Errorf("Did not get correct content-type: got %v want %v", got, want)
	}
}

func assertConfig(t *testing.T, got, want Config) {
	t.Helper()

	if !reflect.DeepEqual(got, want) {
		t.Errorf("Configs don't match: got %v, want %v", got, want)
	}
}

func assertApps(t *testing.T, got, want []App) {
	t.Helper()

	if !reflect.DeepEqual(got, want) {
		t.Errorf("Apps don't match: got %v, want %v", got, want)
	}
}
