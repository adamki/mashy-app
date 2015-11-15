class Track < ActiveRecord::Base
  belongs_to :playlist

  def self.save(track_data, playlist)
    playlist = Playlist.find_by(spotify_id: playlist.id)

    track = find_or_create_by(spotify_id: track_data.id)
    track.update_attributes(
      artist: track_data.artists.first.name,
      name: track_data.name,
      spotify_id: track_data.id,
      url: track_data.external_urls["spotify"],
      href: track_data.href,
      external_image: track_data.album.images.first["url"],
    )
    playlist.tracks << track
    track
  end

end
