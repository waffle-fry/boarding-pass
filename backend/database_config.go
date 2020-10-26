package main

// DatabaseConfig - the database configuration
type DatabaseConfig struct {
	Driver     string   `json:"driver" mapstructure:"driver"`
	Username   string   `json:"username" mapstructure:"username"`
	Password   string   `json:"password" mapstructure:"password"`
	Host       []string `json:"host" mapstructure:"host"`
	Database   string   `json:"database" mapstructure:"database"`
	Collection string   `json:"collection" mapstructure:"collection"`
}
