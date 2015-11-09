class TwitterService
  attr_reader :connection

  def initialize
    @connection ||= Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV["API_KEY"]
      config.consumer_secret     = ENV["API_SECRET"]
      config.access_token        = oauth_token
      config.access_token_secret = oauth_token_secret
    end
  end

end
