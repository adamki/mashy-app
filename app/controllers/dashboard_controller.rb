class DashboardController < ApplicationController
  def index
      @spotify_service ||= SpotifyService.new(current_user) if current_user
  end
end
