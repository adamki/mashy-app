class SessionsController < ApplicationController
  def create
    if user = User.from_omniauth(request.env["omniauth.auth"])
      session[:user_id] = user.id
      session[:auth_info] = request.env["omniauth.auth"]
      # Spotify::Service.instance = Spotify::Service.new(user, request.env["omniauth.auth"])
    end
    redirect_to playlists_path
  end

  def destroy
    session.destroy
    redirect_to root_path
  end
end
