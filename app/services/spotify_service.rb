class SpotifyService

  attr_reader :session, :user

  def initialize(user, session)
    @session = session
    @user = find_user
  end

  def find_user
    RSpotify::User.new(session[:auth_info])
  end

  def find_users_playlists
    @user.playlists
  end

  def create_playlist!(name)
    @user.create_playlist!(name)
  end

  def find_playlist(params)
    RSpotify::Playlist.find(@user.id, params[:id])
  end

  private

    def parse(response)
      JSON.parse(response.body, symbolize_names: true)
    end
end
