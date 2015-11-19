class Playlist < ActiveRecord::Base
  belongs_to :user
  has_many :tracks

  def self.save(playlist_data, user)
    playlist = find_or_create_by(spotify_id: playlist_data.id)
    playlist.update_attributes(
      name: playlist_data.name,
      spotify_id: playlist_data.id,
      owner: playlist_data.owner.id,
      image_url: playlist_data.images,
      external_url: playlist_data.href,
    )
    user.playlists << playlist  
    playlist
  end

  def create_playlist!(name)
    @user.create_playlist!(name)
  end

  def find_playlist(params)
    RSpotify::Playlist.find(@user.id, params[:id])
  end
end
