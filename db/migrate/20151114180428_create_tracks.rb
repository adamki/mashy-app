class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :spotify_id
      t.string :name
      t.string :artist
      t.string :url
      t.string :external_image

      t.timestamps null: false
    end
  end
end
