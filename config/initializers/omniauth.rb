require 'rspotify/oauth'

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :spotify, ENV['your_client_id'], ENV['your_client_secret'], scope: 'user-read-email playlist-modify-public user-library-read user-library-modify'
end

# Rails.application.config.middleware.use OmniAuth::Builder do
#   provider :twitter, ENV['API_KEY'], ENV['API_SECRET']
# end
