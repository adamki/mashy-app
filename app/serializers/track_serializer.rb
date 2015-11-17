class TrackSerializer < ActiveModel::Serializer
  attributes :id,
             :spotify_id,
             :name,
             :artist,
             :url,
             :external_image,
             :created_at,
             :updated_at,
             :href,
             :playlist_id,
             :echo_response
  # def audio_summary
  #   eval(
  #     object.echo_response["audio_summary"]
  #   )
  # end

end
