class SpotifyService

  attr_reader :connection, :user

  def initialize(user, session)
    @user = RSpotify::User.new(session[:auth_info])
    # @connection = Hurley::Client.new("https://api.spotify.com/v1/users/#{user.spotify_id}")
    # connection.header[:authorization] = "Bearer #{user.oauth_token}"
    # connection.header[:content_type]  = "application/json"
  end

  def find_user
    parse(connection.get(""))
  end

  def find_playlists
    @user.playlists
  end

  def create_playlist!(name)
    @user.create_playlist!(name)
  end

  private

  def parse(response)
    JSON.parse(response.body, symbolize_names: true)
  end
end
