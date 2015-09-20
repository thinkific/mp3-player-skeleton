class Song < ActiveRecord::Base
  validates :url, presence: true
end
