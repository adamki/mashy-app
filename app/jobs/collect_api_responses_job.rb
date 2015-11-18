class CollectApiResponsesJob < ActiveJob::Base
  queue_as :default

  def perform
    @collection.retreive_data
    @collection.playlists
end
