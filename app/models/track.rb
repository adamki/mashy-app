class Track < ActiveRecord::Base
  belongs_to :playlist

  def self.save(track_data, playlist)

    track = find_or_create_by(spotify_id: track_data.id)
    echo_results = analyze(track.name, track.artist).first
    track.update_attributes(
      artist: track_data.artists.first.name,
      name: track_data.name,
      spotify_id: track_data.id,
      url: track_data.external_urls["spotify"],
      href: track_data.href,
      external_image: track_data.album.images.first["url"],

      energy: echo_results[:energy],
      liveness: echo_results[:liveness],
      tempo: echo_results[:tempo],
      speechiness: echo_results[:speechiness],
      acousticness: echo_results[:acousticness],
      instrumentalness: echo_results[:instrumentalness],
      mode: echo_results[:mode],
      time_signature: echo_results[:time_signature],
      duration: echo_results[:duration],
      loudness: echo_results[:loudness],
      audio_md5: echo_results[:audio_md5],
      valence: echo_results[:valence],
      danceability: echo_results[:danceability]
    )
    playlist = Playlist.find_by(spotify_id: playlist.id)
    playlist.tracks << track
    byebug
    track
  end

  def self.analyze(song_name, song_title)
    song_connection = EchonestService.new
    song_connection.get_song_analysis(song_name, song_title)
  end

end
