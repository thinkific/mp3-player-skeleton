require 'json'
require 'sinatra/content_for'

get '/' do
  erb :index
end

get '/api/v1/music' do
  songs = Song.all.each do |song|
    @songJson = {
    "id" => song.id,
    "title" => song.title,
    "url" => song.url,
    }
  end
  json songs
end
