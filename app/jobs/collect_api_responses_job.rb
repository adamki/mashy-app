class CollectApiResponsesJob < ActiveJob::Base
  queue_as :default

  def perform
    @collection = PlaylistCollection.new(current_user, session[:auth_info])
    @collection.retreive_data
    @collection.playlists
  end
end
