class Api::V1::PlaylistsController < ApplicationController
  respond_to :json

  def index
    respond_with current_user.playlists
  end

  def user
    respond_with current_user.playlists
  end

  def show
    respond_with Playlist.find_by(spotify_id: params[:id])
  end
end
