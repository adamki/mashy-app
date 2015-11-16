class Track < ActiveRecord::Base
  belongs_to :playlist

  def self.save(track_data, playlist)
    track = find_or_create_by(spotify_id: track_data.id)
    echo_results = analyze(track_data.name, track_data.artists.first.name).first
    track.update_attributes(
      artist: track_data.artists.first.name,
      name: track_data.name,
      spotify_id: track_data.id,
      url: track_data.external_urls["spotify"],
      href: track_data.href,
      external_image: track_data.album.images.first["url"],
      echo_response: echo_results
    )
    playlist = Playlist.find_by(spotify_id: playlist.id)
    playlist.tracks << track
    track
  end

  def self.analyze(song_name, song_title)
    song_connection = EchonestService.new
    song_connection.get_song_analysis(song_name, song_title)
  end

end
