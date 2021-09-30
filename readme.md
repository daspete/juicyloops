# juicyloops

This is a training project, for getting into audio development with JavaScript.

## Installation

copy the .env.example file to .env and start the docker environment via docker-compose.

After everything is up and running, the app should be browsable at: http://juicyloops.localhost

## Microphone usage with no HTTPS in chrome

To use your microphone without an HTTPS context, you need to add the origin http://juicyloops.localhost in your chrome flags.
To do this, just open chrome://flags/ and search for "Insecure origins treated as secure" and add this URL into the textfield and set this to "Enabled"

## Live demo

You can play around with a live demo here: https://juicyloops.daspete.at