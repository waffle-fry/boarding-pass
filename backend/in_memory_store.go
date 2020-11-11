package main

type InMemoryStore struct {
	store []Webhook
}

func (i *InMemoryStore) GetWebhooks() []Webhook {
	return i.store
}

func (i *InMemoryStore) AddWebhook(name, webhookURL string, data map[string]interface{}) {
	app := Webhook{name, webhookURL, data}
	i.store = append(i.store, app)
}
