package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	w.Header().Set("Content-Type", ContentTypeJSON)
	w.WriteHeader(code)
	err := json.NewEncoder(w).Encode(payload)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprint(w, InternalServerError)
	}
}

func respondWithError(w http.ResponseWriter, code int, message string) {
	respondWithJSON(w, code, map[string]string{"error": message})
}

func respondWithMessage(w http.ResponseWriter, code int, message string) {
	respondWithJSON(w, code, map[string]string{"message": message})
}
