class SessionsController < ApplicationController
  def create
    if user = User.from_omniauth(request.env["omniauth.auth"])
      session[:user_id] = user.id
      session[:auth_info] = request.env["omniauth.auth"]

      spotify_service = SpotifyService.new(current_user, session)
      playlists = spotify_service.find_users_playlists
      playlists.each do |playlist|
        current_user.playlists << Playlist.save(playlist)
      end
    end
    redirect_to playlists_path
  end

  def destroy
    session.destroy
    redirect_to root_path
  end
end
