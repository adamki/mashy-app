class AddColumnsToTrack < ActiveRecord::Migration
  def change
    add_column :tracks, :href, :string
  end
end
