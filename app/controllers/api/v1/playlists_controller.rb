class Api::V1::PlaylistsController < ApplicationController
  respond_to :json
  
  def index
    playlist = Playlist.all
    respond_with playlist
  end

  def show
    respond_with Playlist.find_by(spotify_id: params[:id])
  end
end
