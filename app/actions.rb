require 'json'
require 'sinatra/content_for'

get '/' do
  erb :index
end

get '/api/v1/music' do
  # id = 1 looks to be Three Little Birds
  json Song.find(1) # or Song.first
end
