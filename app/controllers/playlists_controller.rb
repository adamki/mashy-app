class PlaylistsController < ApplicationController
  def new
    @playlist = Playlist.new
  end

  def create
    spotify_service = SpotifyService.new(current_user, session)
    spotify_service.create_playlist!(params[:playlist][:name])
    redirect_to root_path
  end
end
