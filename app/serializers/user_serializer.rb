class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :created_at, :updated_at, :email, :spotify_id, :provider
end
