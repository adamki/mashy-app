class PlaylistSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name, :spotify_id, :owner, :image_url, :external_url
end
