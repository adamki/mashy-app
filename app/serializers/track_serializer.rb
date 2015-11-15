class TrackSerializer < ActiveModel::Serializer
  attributes :id, :spotify_id, :name, :artist, :url, :external_image, :created_at, :updated_at, :href, :owner, :playlist_id
end
