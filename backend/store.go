package main

// Store - the functions that make up a store
type Store interface {
	GetWebhooks() []Webhook
	AddWebhook(name, webhookURL string, data map[string]interface{})
}
