class SpotifyService

  attr_reader :auth_info, :spotify_user

  def initialize(user=nil, auth_info=nil)
    @auth_info = auth_info
    @spotify_user = set_user
  end

  def set_user
    RSpotify::User.new(auth_info)
  end

  private

  def parse(response)
    JSON.parse(response.body, symbolize_names: true)
  end
end
