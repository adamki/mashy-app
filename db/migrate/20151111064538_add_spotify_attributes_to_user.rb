class AddSpotifyAttributesToUser < ActiveRecord::Migration
  def change
    add_column :users, :spotify_id, :string
    add_column :users, :provider, :string
    add_column :users, :refresh_token, :string


    remove_column :users, :screen_name
  end
end
