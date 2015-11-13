class PlaylistsController < ApplicationController

  def new

  end

  def index
    @spotify_service ||= SpotifyService.new(current_user, session) if current_user
  end

  def show
    @spotify_service ||= SpotifyService.new(current_user, session)
    playlist = params[:id]
    @pl = @spotify_service.find_playlist(playlist)
  end

  def create
    spotify_service = SpotifyService.new(current_user, session)
    spotify_service.create_playlist!(params[:playlist][:name])
    redirect_to root_path
  end

end
