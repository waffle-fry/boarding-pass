package main

// Store - the functions that make up a store
type Store interface {
	GetApps() []App
	AddApp(name, webhookURL string, data map[string]interface{})
}
