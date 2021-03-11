{
  "logo": "https://dynl.mktgcdn.com/p/jPpU9bYhzEYWnQ2poYw1EIYj9ha4ySR9guujLOLODIc/400x400.jpg",
  "company_name": "Nationwide",
  "email_address": "@nationwide.co.uk",
  "welcome_title": "Welcome to Nationwide",
  "welcome_subtitle": "We're thrilled to have you",
  "primary_colour": "#004A8F",
  "secondary_colour": "#EC1C24",
  "teams": [
    {
      "name": "Izumi",
      "slug": "izumi"
    },
    {
      "name": "Quantum Pipes",
      "slug": "quantum-pipes",
      "stages": [
        {
          "title": "Step One: Terminal Setup",
          "steps": [
            {
              "type": "terminal",
              "title": "Setup Your Terminal",
              "text": "It’s recommended that you install the following to complete the onboarding process:",
              "terminal": {
                "commands": [
                  {
                    "title": "Docker:",
                    "command": "docker pull busybox"
                  },
                  {
                    "title": "Docker:",
                    "command": "docker pull helloworld"
                  }
                ]
              },
              "action_button": {
                "enabled": true,
                "title": "Install All"
              }
            }
          ]
        },
        {
          "title": "Step Two: VPN Access",
          "message": {
            "title": "CHECK YOUR EMAIL",
            "text": "Joe Blogs (joe.blogs@nationwide.co.uk) should have sent you an email with your VPN login details. If not, you’ll need to get in touch with them."
          },
          "steps": [
            {
              "type": "download",
              "title": "Install Tunnelblick",
              "text": "Open the Mac Self Service app to find the Tunnelblick install."
            },
            {
              "type": "open-folder",
              "title": "Open the profile included with your login details",
              "text": "This will install it into Tunnelblick"
            },
            {
              "type": "text-input",
              "title": "Connect with the profile",
              "text": "You’ll be prompted to enter the username and password you’ve been emailed - be sure to tick “save in keychain”."
            }
          ]
        }
      ]
    },
    {
      "name": "Landing Zone",
      "slug": "landing-zone"
    },
    {
      "name": "Test",
      "slug": "test"
    }
  ]
}
