class AddImageUrlAndHrefToPlaylist < ActiveRecord::Migration
  def change
    add_column :playlists, :external_url, :string
    add_column :playlists, :image_url, :string
  end
end
