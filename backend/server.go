package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

// Server constants
const (
	InternalServerError = "Internal Server Error"
	ContentTypeJSON     = "application/json"
)

// Server - the server
type Server struct {
	config Config
	http.Handler
}

// NewServer - creates a new instance of Server
func NewServer(config Config) *Server {
	s := new(Server)

	router := mux.NewRouter().StrictSlash(true)
	router.Use(accessControlMiddleware)
	router.HandleFunc("/config", s.getConfig).Methods(http.MethodGet)

	s.Handler = router
	s.config = config

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

func (s *Server) getConfig(w http.ResponseWriter, r *http.Request) {
	respondWithJSON(w, http.StatusOK, s.config)
}
