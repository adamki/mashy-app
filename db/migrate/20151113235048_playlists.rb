class Playlists < ActiveRecord::Migration
  def change
    create_table :playlists do |t|
      t.string :user_id
      t.string :spotify_id
      t.string :name
      t.string :owner

      t.timestamps null: false
    end
  end
end
