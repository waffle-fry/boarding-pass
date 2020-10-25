package main

// Config - the configuration
type Config struct {
	Logo            string
	CompanyName     string
	EmailAddress    string
	WelcomeTitle    string
	WelcomeSubtitle string
	PrimaryColour   string
	SecondaryColour string
	Teams           []Team
}

// Team - the elements that make up a Team
type Team struct {
	Name   string
	Slug   string
	Stages []Stage
}

// Stage - the elements that make up a Stage
type Stage struct {
	Title   string
	Message Message
	Steps   []Step
}

// Message - the elements that make up a Message
type Message struct {
	title string
	text  string
}

// Step - the elements that make up a Step
type Step struct {
	Type     string
	Title    string
	Text     string
	Terminal Terminal
}

// Terminal - the elements that make up a Terminal
type Terminal struct {
	Commands     []TerminalCommand
	ActionButton ActionButton
}

// TerminalCommand - the elements that make up a TerminalCommand
type TerminalCommand struct {
	Title   string
	Command string
}

// ActionButton - the elements that make up an ActionButton
type ActionButton struct {
	enabled bool
	title   string
}
