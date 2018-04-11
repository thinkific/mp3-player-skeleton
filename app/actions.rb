require 'json'
require 'sinatra/content_for'

get '/' do
  erb :index
end

get '/api/v1/music' do
  #just grabbing The Little Birds for now
  Song.first.to_json
end
