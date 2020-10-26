package main

import (
	"fmt"
	"net/http"
	"path/filepath"
	"plugin"
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
	router.HandleFunc("/config", s.getConfig).Methods(http.MethodGet)
	router.HandleFunc("/apps", s.getApps).Methods(http.MethodGet)

	registerPluginEndpoints(router)

	s.Handler = router
	s.config = config
	s.store = store

	return s
}

func registerPluginEndpoints(router *mux.Router) {
	allPlugins, err := filepath.Glob("plugins/*.so")
	if err != nil {
		panic(err)
	}

	for _, filename := range allPlugins {
		pluginName := strings.Split(strings.Split(filename, "plugins/")[1], ".so")[0]
		plugin, err := plugin.Open(filename)
		if err != nil {
			panic(err)
		}
		symbol, err := plugin.Lookup("Endpoint")
		if err != nil {
			panic(err)
		}
		endpointFunc, ok := symbol.(func(w http.ResponseWriter, r *http.Request))
		if !ok {
			panic("Plugin has no 'w http.ResponseWriter, r *http.Request' function")
		}

		router.HandleFunc(fmt.Sprintf("/%v", pluginName), endpointFunc)
	}

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

func (s *Server) getApps(w http.ResponseWriter, r *http.Request) {
	respondWithJSON(w, http.StatusOK, s.store.GetApps())
}
