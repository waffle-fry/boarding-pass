package main

// Webhook - the elements that make up an app
type Webhook struct {
	ID   int
	Name string
	URL  string
	Data map[string]interface{}
}
