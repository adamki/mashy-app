class Track < ActiveRecord::Base
  belongs_to :playlist
  attr_reader :mock_response
  @mock_response = {"artist_id"=>"not found",
                   "artist_name"=>"not found",
                   "id"=>"not found",
                   "audio_summary"=>
                    {"key"=>0,
                     "analysis_url"=>
                     "not found",
                     "energy"=>0,
                     "liveness"=>0,
                     "tempo"=> 0,
                     "speechiness"=>0,
                     "acousticness"=>0,
                     "instrumentalness"=> 0,
                     "mode"=>0,
                     "time_signature"=>0,
                     "duration"=> 0,
                     "loudness"=> 0,
                     "audio_md5"=>"not found",
                     "valence"=>0,
                     "danceability"=>0},
                   "title"=>"not found"}

  def self.save(track_data, playlist)
    track = find_or_create_by(spotify_id: track_data.id)

    echo_results = analyze(track_data.name, track_data.artists.first.name).first
    if echo_results == nil
      echo_results = @mock_response
    end
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
