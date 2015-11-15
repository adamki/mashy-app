class AddRefernceToPlaylistTracks < ActiveRecord::Migration
  def change
    add_column :tracks, :playlist_id, :string
    add_column :playlists, :track_id, :string
  end
end
