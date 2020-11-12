package main

// InMemoryStore - The store
type InMemoryStore struct {
	store []Webhook
}

// GetWebhooks - Returns a slice of Webhooks
func (i *InMemoryStore) GetWebhooks() []Webhook {
	return i.store
}

// GetWebhook - Returns a single Webhook
func (i *InMemoryStore) GetWebhook(id int) Webhook {
	return i.store[id-1]
}

// AddWebhook - Adds a Webhook to the store
func (i *InMemoryStore) AddWebhook(name, URL string, data map[string]interface{}) {
	id := len(i.store) + 1
	webhook := Webhook{id, name, URL, data}
	i.store = append(i.store, webhook)
}

// EditWebhook - Updates a Webhook in the store
func (i *InMemoryStore) EditWebhook(id int, name, URL string, data map[string]interface{}) {
	i.store[id-1].Name = name
	i.store[id-1].URL = URL
	i.store[id-1].Data = data
}

// DeleteWebhook - Removes a Webhook from the store
func (i *InMemoryStore) DeleteWebhook(id int) {
	x := id - 1

	newStore := make([]Webhook, 0)
	newStore = append(newStore, i.store[:x]...)
	i.store = append(newStore, i.store[x+1:]...)
}
