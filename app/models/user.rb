class User < ActiveRecord::Base
  def self.from_omniauth(auth_info)
    user = find_or_create_by(spotify_id: auth_info[:info][:id])
    user.update_attributes(
      provider:           auth_info.provider,
      spotify_id:         auth_info.info.id,
      email:              auth_info.info.email,
      name:               auth_info.info.display_name,

      oauth_token:        auth_info.credentials.token,
      refresh_token:      auth_info.credentials.refresh_token,
    )
    user
  end
end
