class Playlist < ActiveRecord::Base
  belongs_to :user

  attr_reader :name


end
