require 'json'
require 'sinatra/content_for'

get '/' do
  erb :index
end

get '/api/v1/music' do
  @song = Song.first 
  content_type :json
  @song.to_json   
  #implement me
end
