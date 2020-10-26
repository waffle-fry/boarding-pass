package main

// Config - the configuration
type Config struct {
	Logo            string   `json:"logo" mapstructure:"logo"`
	CompanyName     string   `json:"company_name" mapstructure:"company_name"`
	EmailAddress    string   `json:"email_address" mapstructure:"email_address"`
	WelcomeTitle    string   `json:"welcome_title" mapstructure:"welcome_title"`
	WelcomeSubtitle string   `json:"welcome_subtitle" mapstructure:"welcome_subtitle"`
	PrimaryColour   string   `json:"primary_colour" mapstructure:"primary_colour"`
	SecondaryColour string   `json:"secondary_colour" mapstructure:"secondary_colour"`
	Teams           []Team   `json:"teams" mapstructure:"teams"`
	Onboarded       []string `json:"onboarded" mapstructure:"onboarded"`
}

// Team - the elements that make up a Team
type Team struct {
	Name   string  `json:"name" mapstructure:"name"`
	Slug   string  `json:"slug" mapstructure:"slug"`
	Stages []Stage `json:"stages" mapstructure:"stages"`
}

// Stage - the elements that make up a Stage
type Stage struct {
	Title   string   `json:"title" mapstructure:"title"`
	Message *Message `json:"message,omitempty" mapstructure:"message"`
	Steps   []Step   `json:"steps" mapstructure:"steps"`
}

// Message - the elements that make up a Message
type Message struct {
	Title string `json:"title" mapstructure:"title"`
	Text  string `json:"text" mapstructure:"text"`
}

// Step - the elements that make up a Step
type Step struct {
	Type         string       `json:"type" mapstructure:"type"`
	Title        string       `json:"title" mapstructure:"title"`
	Text         string       `json:"text" mapstructure:"text"`
	Terminal     *Terminal    `json:"terminal,omitempty" mapstructure:"terminal"`
	ActionButton ActionButton `json:"action_button" mapstructure:"action_button"`
}

// Terminal - the elements that make up a Terminal
type Terminal struct {
	Commands []TerminalCommand `json:"commands" mapstructure:"commands"`
}

// TerminalCommand - the elements that make up a TerminalCommand
type TerminalCommand struct {
	Title   string `json:"title" mapstructure:"title"`
	Command string `json:"command" mapstructure:"command"`
}

// ActionButton - the elements that make up an ActionButton
type ActionButton struct {
	Enabled bool   `json:"enabled" mapstructure:"enabled"`
	Title   string `json:"title" mapstructure:"title"`
}
