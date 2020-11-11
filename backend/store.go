package main

// Store - the functions that make up a store
type Store interface {
	GetWebhooks() []Webhook
	GetWebhook(id int) Webhook
	AddWebhook(name, webhookURL string, data map[string]interface{})
	EditWebhook(id int, name, webhookURL string, data map[string]interface{})
}
