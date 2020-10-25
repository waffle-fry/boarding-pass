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
	router.HandleFunc("/config", s.getConfig).Methods(http.MethodGet)

	s.Handler = router
	s.config = config

	return s
}

func (s *Server) getConfig(w http.ResponseWriter, r *http.Request) {
	respondWithJSON(w, http.StatusOK, s.config)
}
