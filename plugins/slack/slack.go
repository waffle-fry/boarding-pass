package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

const webhookURL = "https://hooks.slack.com/services/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"

func Endpoint(w http.ResponseWriter, r *http.Request) {
	sendSlackMessage()
	fmt.Fprint(w, "Message Sent")
}

func sendSlackMessage() {
	requestBody, err := json.Marshal(map[string]string{
		"text": "A new person has joined the team",
	})

	if err != nil {
		log.Fatalln(err)
	}

	response, err := http.Post(webhookURL, "applcation/json", bytes.NewBuffer(requestBody))
	if err != nil {
		log.Fatalln(err)
	}

	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatalln(err)
	}

	log.Println(string(body))
}
