class Playlist
  include ActiveModel::Conversion
  extend  ActiveModel::Naming

  attr_reader :name

  def initialize(name = nil)
    @name = name
  end

  def persisted?
    false
  end
end
