package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/spf13/viper"
)

var config Config

func initialiseConfig() error {
	viper.SetConfigName("config")
	viper.AddConfigPath(".")

	err := viper.ReadInConfig()
	if err != nil {
		return fmt.Errorf("Error loading config file: %v", err)
	}

	err = viper.Unmarshal(&config)
	if err != nil {
		return fmt.Errorf("Error reading config file: %v", err)
	}

	err = validate(config)
	if err != nil {
		return fmt.Errorf("Configuration file error: %v", err)
	}

	return nil
}

func main() {
	err := initialiseConfig()
	if err != nil {
		log.Fatal(err)
	}

	server := NewServer(config)
	if err = http.ListenAndServe(":5000", server); err != nil {
		log.Fatalf("Could not listen on port 5000: %v", err)
	}
}
