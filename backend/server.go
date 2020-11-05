package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
)

// Server constants
const (
	InternalServerError = "Internal Server Error"
	ContentTypeJSON     = "application/json"
)

// Server - the server
type Server struct {
	store  Store
	config Config
	http.Handler
}

// NewServer - creates a new instance of Server
func NewServer(store Store, config Config) *Server {
	s := new(Server)

	router := mux.NewRouter().StrictSlash(true)
	router.Use(accessControlMiddleware)
	router.HandleFunc("/dashboard", s.getDashboard).Methods(http.MethodGet)
	router.HandleFunc("/webhooks", s.getWebhooks).Methods(http.MethodGet)
	router.HandleFunc("/webhooks/create", s.getCreateWebhook).Methods(http.MethodGet)
	router.HandleFunc("/webhooks", s.postCreateWebhook).Methods(http.MethodPost)
	router.PathPrefix("/resources/").Handler(http.StripPrefix("/resources/", http.FileServer(http.Dir("resources/"))))
	router.HandleFunc("/config", s.getConfig).Methods(http.MethodGet)

	for _, app := range store.GetApps() {
		router.HandleFunc(fmt.Sprintf("/%v", strings.ToLower(app.Name)), s.callAppEndpoint)
	}

	s.Handler = router
	s.config = config
	s.store = store

	return s
}

func accessControlMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS,PUT")
		w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type")

		if r.Method == "OPTIONS" {
			return
		}

		next.ServeHTTP(w, r)
	})
}

func (s *Server) getDashboard(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("layout/template.html", "layout/header.html", "layout/index.html"))
	err := t.Execute(w, nil)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "There was a problem loading this page")
	}
}

func (s *Server) getWebhooks(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("layout/template.html", "layout/header.html", "layout/webhooks.html"))
	page := Page{"Webhooks", s.store.GetApps()}

	err := t.Execute(w, page)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "There was a problem loading this page")
	}
}

func (s *Server) getCreateWebhook(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("layout/template.html", "layout/header.html", "layout/add_webhook.html"))
	page := Page{"Add Webhook", nil}

	err := t.Execute(w, page)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "There was a problem loading this page")
	}
}

func (s *Server) postCreateWebhook(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Please try again")
	}

	name := r.Form.Get("name")
	webhookURL := r.Form.Get("webhookurl")
	dataString := r.Form.Get("data")

	var data map[string]interface{}
	err = json.Unmarshal([]byte(dataString), &data)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Please try again")
	}

	s.store.AddApp(name, webhookURL, data)

	t := template.Must(template.ParseFiles("layout/template.html", "layout/header.html", "layout/webhooks.html"))
	page := Page{"Webhooks", s.store.GetApps()}

	err = t.Execute(w, page)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "There was a problem loading this page")
	}
}

func (s *Server) getConfig(w http.ResponseWriter, r *http.Request) {
	respondWithJSON(w, http.StatusOK, s.config)
}

func (s *Server) callAppEndpoint(w http.ResponseWriter, r *http.Request) {
	apps := s.store.GetApps()
	var app App

	for _, appFromStore := range apps {
		if r.URL.Path == strings.ToLower("/"+appFromStore.Name) {
			app = appFromStore
		}
	}

	requestBody, err := json.Marshal(app.Data)

	if err != nil {
		log.Fatalln(err)
	}

	response, err := http.Post(app.WebhookURL, "applcation/json", bytes.NewBuffer(requestBody))
	if err != nil {
		log.Fatalln(err)
	}

	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatalln(err)
	}

	respondWithMessage(w, http.StatusOK, string(body))
}
