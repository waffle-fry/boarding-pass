# Boarding Pass

Boarding Pass is a desktop application that intends to streamline and improve upon the onboarding process at any organisation (with an eye toward engineers).

The application takes a (as yet incomplete) config-as-code approach to the onboarding journey, with the intention that it would be engineers - not managers or someone in HR - who would define and update the journey as necessary.

As it stands, the app is both incomplete and very minimal. While it can't currently achieve a whole lot, the vision is that it will eventually be able to hook into various different APIs and handle the the onboarding process end-to-end; from cloning repos to raising Jira tickets to interfacing with Slack or even furnishing the user's calendar with relevant meetings (such as standups).

## Prerequisits

You'll need NPM for this.

## Running the app

```bash
cd boarding-pass
npm install #if it's your first time
npm start
```

## Running the tests

```bash
cd boarding-pass
npm run test
```

## The config file

The config file is currently setup as JSON. It expects the following:

| Item             | Type   | Description                                                                                 |
| ---------------- | ------ | ------------------------------------------------------------------------------------------- |
| logo             | String | A URL that links to your organisation's logo                                                |
| company_name     | String | The name of your organisation                                                               |
| email_address    | String | The email address extension that your organisation uses (not currently used)                |
| welcome_title    | String | The welcome message that you'd like displayed on the first page of the app                  |
| welcome_subtitle | String | A subtitle that you'd like displayed beneath the welcome_title on the first page of the app |
| teams            | Array  | A list of the teams at your organisation (see Teams below)                                  |

### Teams

| Item   | Type   | Description                                                             |
| ------ | ------ | ----------------------------------------------------------------------- |
| name   | String | The name of the team                                                    |
| slug   | String | The name of the team without spaces                                     |
| stages | Array  | Each stage that a new employee must progress through (see Stages below) |

### Stages

| Item  | Type   | Description                                         |
| ----- | ------ | --------------------------------------------------- |
| title | String | The title of the stage                              |
| steps | Array  | The steps that make up each stage (see Steps below) |

### Steps

| Item          | Type   | Description                                                                    |
| ------------- | ------ | ------------------------------------------------------------------------------ |
| type          | String | The type of step (see Step Types below)                                        |
| title         | String | The title of the step                                                          |
| text          | Array  | The text to display for that stage                                             |
| terminal      | object | A list of commands for the terminal step type (see below)                      |
| action_button | object | Expects an "enabled" (boolean) and a "title" (string) to display on the button |

### Step Types

| Name        | Terminal                                       | Action Button                        |
| ----------- | ---------------------------------------------- | ------------------------------------ |
| terminal    | Y - {"commands": ["title": "", "command": ""]} | Y - runs specified terminal commands |
| download    | X                                              | X                                    |
| open-folder | X                                              | X                                    |
| text-input  | X                                              | X                                    |
| account     | X                                              | X                                    |
| jira        | X                                              | X                                    |
| github      | X                                              | X                                    |
| aws         | X                                              | X                                    |
