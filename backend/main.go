package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/shaaaanks/kibisis"
	"github.com/spf13/viper"
)

var config Config
var databaseConfig DatabaseConfig
var database kibisis.Database

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

func initialiseDatabase() error {
	viper.SetConfigName("database_config")
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

	database, err = kibisis.GetDriver(databaseConfig.Driver)
	if err != nil {
		return fmt.Errorf("Error loading database driver: %v", err)
	}

	err = database.Conn(databaseConfig.Host, databaseConfig.Username, databaseConfig.Password)
	if err != nil {
		return fmt.Errorf("Error connecting to database: %v", err)
	}

	err = database.Init(databaseConfig.Database, databaseConfig.Collection)
	if err != nil {
		return fmt.Errorf("Error initialising database: %v", err)
	}

	return nil
}

func main() {
	err := initialiseConfig()
	if err != nil {
		log.Fatal(err)
	}

	// err = initialiseDatabase()
	// if err != nil {
	// 	log.Fatal(err)
	// }
	store := &InMemoryStore{}
	server := NewServer(store, config)
	if err = http.ListenAndServe(":5000", server); err != nil {
		log.Fatalf("Could not listen on port 5000: %v", err)
	}
}
