package main

// Webhook - the elements that make up an app
type Webhook struct {
	Name string
	URL  string
	Data map[string]interface{}
}
