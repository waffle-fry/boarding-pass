package main

import (
	"log"

	"github.com/spf13/viper"
)

func getConfig() Config {
	var config Config
	viper.SetConfigName("config")
	viper.AddConfigPath(".")

	err := viper.ReadInConfig()
	if err != nil {
		log.Fatalf("Error loading config file: %v", err)
	}

	err = viper.Unmarshal(&config)
	if err != nil {
		log.Fatalf("Error reading config file - aws: %v", err)
	}

	err = validate(config)
	if err != nil {
		log.Fatalf("Configuration file error: %v", err)
	}

	return config
}
