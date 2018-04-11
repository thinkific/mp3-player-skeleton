require 'json'
require 'sinatra/content_for'

get '/' do
  erb :index
end

get '/api/v1/music' do
  Song.all.to_json
end
