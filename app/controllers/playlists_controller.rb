class PlaylistsController < ApplicationController
  def index

    # @collection = PlaylistCollection.new(current_user, session[:auth_info])
    # @collection.retreive_data
    # @collection.playlists
  end

  def show
    spotify_service ||= SpotifyService.new(current_user, session)
    @playlist = spotify_service.find_playlist(params)
  end

  def create
    spotify_service = SpotifyService.new(current_user, session)
    spotify_service.create_playlist!(params[:playlist][:name])
    redirect_to root_path
  end

end
