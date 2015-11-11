class SpotifyService
  attr_reader :connection, :user

  def initialize(user)
    @user = user
    @connection = Hurley::Client.new("https://api.spotify.com/v1/users/#{user.spotify_id}")
    connection.header[:authorization] = "Bearer #{user.oauth_token}"
  end

  def find_user
    parse(connection.get(""))
  end

  def find_playlists
    parse(connection.get("playlists"))
  end

  private

  def parse(response)
    JSON.parse(response.body, symbolize_names: true)
  end

end
