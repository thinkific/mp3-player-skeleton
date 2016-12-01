# Welcome to Thinkific's front-end challenge!

This challenge is designed to give us an idea of your skills with Javascript and CSS (and a small amount of backend code). It is purposely not fully spec'd as part of your job as a developer is to make sense of specs that may not be perfectly written or thought through. We encourage you to ask questions!

In this repository, you'll find code that creates an MP3 player. The MP3 player should load an MP3 file from the API and play it.

Note that this challenge requires that you have a small amount of backend experience with Ruby (in order to implement the API endpoint that returns the song data).

All assets needed to complete this challenge are included in this repository. If you find yourself looking elsewhere for assets, you're probably missing something.

## Specs:

1. The MP3 player should look something like:

![alt tag] (https://s3.amazonaws.com/thinkific/default_images/mp3_player_final_look.png)

2. It should load song data from the API and play it.
3. It should display the playback progress in the progress bar.
4. It should be possible to play and pause the playback.
5. It should start in a state of not playing.

## To Run:

1. `bundle install`
2. `bundle exec rake db:migrate db:seed`
3. `shotgun -p 3000 -o 0.0.0.0`
4. Visit `http://localhost:3000/` in your browser

## See a live version of this app:
https://thinkific-frontend-challenge.herokuapp.com/ 
