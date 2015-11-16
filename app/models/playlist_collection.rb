class PlaylistCollection
  attr_accessor :playlists, :service

  def initialize(user, auth_info)
    @service = set_service(user, auth_info)
  end

  def set_service(user, auth_info)
    SpotifyService.new(user, auth_info)
  end

  def retreive_data
    retreive_playlists
    retreive_tracks
  end

  def retreive_playlists
    @playlists = service.spotify_user.playlists
    @playlists.each {|playlist| Playlist.save(playlist) }
  end

  def retreive_tracks
    @playlists.each { |playlist| playlist.tracks }
    @playlists.each do  |list|
      list.tracks.each do |track|
        Track.save(track, list)
      end
    end
  end
end
