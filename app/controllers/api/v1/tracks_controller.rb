class Api::V1::TracksController < ApplicationController
  respond_to :json

  def index
    track = Track.all
    respond_with track
  end

  def show
    respond_with Track.find_by(spotify_id: params[:id])
  end
end
