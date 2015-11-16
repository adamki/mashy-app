class SessionsController < ApplicationController
  def create
    if user = User.from_omniauth(request.env["omniauth.auth"])
      session[:user_id] = user.id
      session[:auth_info] = request.env["omniauth.auth"]

      @collection = PlaylistCollection.new(current_user, session[:auth_info])
      @collection.retreive_data
      @collection.playlists
    end
    redirect_to playlists_path
  end

  def destroy
    session.destroy
    redirect_to root_path
  end
end
