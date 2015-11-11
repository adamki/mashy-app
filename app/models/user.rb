class User < ActiveRecord::Base
  def self.from_omniauth(auth_info)
    where(uid: auth_info[:uid]).first_or_create do |new_user|
      new_user.uid                = auth_info.uid
      new_user.provider           = auth_info.provider
      new_user.spotify_id         = auth_info.info.id
      new_user.email              = auth_info.info.email
      new_user.name               = auth_info.info.display_name


      new_user.oauth_token        = auth_info.credentials.token
      new_user.refresh_token      = auth_info.credentials.refresh_token
    end
  end
end
