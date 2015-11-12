class DashboardController < ApplicationController
  def index
    @spotify_service ||= SpotifyService.new(current_user, session) if current_user
  end
end
