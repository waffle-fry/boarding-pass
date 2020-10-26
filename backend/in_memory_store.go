package main

type InMemoryStore struct {
	store []App
}

func (i *InMemoryStore) GetApps() []App {
	return i.store
}

func (i *InMemoryStore) AddApp(name, webhookURL string, data map[string]string) {
	app := App{name, webhookURL, data}
	i.store = append(i.store, app)
}
