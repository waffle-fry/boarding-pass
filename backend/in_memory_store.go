package main

type InMemoryStore struct {
	store []Webhook
}

func (i *InMemoryStore) GetWebhooks() []Webhook {
	return i.store
}

func (i *InMemoryStore) GetWebhook(id int) Webhook {
	return i.store[id-1]
}

func (i *InMemoryStore) AddWebhook(name, URL string, data map[string]interface{}) {
	id := len(i.store) + 1
	webhook := Webhook{id, name, URL, data}
	i.store = append(i.store, webhook)
}

func (i *InMemoryStore) EditWebhook(id int, name, URL string, data map[string]interface{}) {
	i.store[id-1].Name = name
	i.store[id-1].URL = URL
	i.store[id-1].Data = data
}

func (i *InMemoryStore) DeleteWebhook(id int) {
	x := id - 1

	newStore := make([]Webhook, 0)
	newStore = append(newStore, i.store[:x]...)
	i.store = append(newStore, i.store[x+1:]...)
}
