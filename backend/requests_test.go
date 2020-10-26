package main

import "net/http"

func newGetConfigRequest() *http.Request {
	request, _ := http.NewRequest(http.MethodGet, "/config", nil)
	return request
}

func newGetAppsRequest() *http.Request {
	request, _ := http.NewRequest(http.MethodGet, "/apps", nil)
	return request
}
