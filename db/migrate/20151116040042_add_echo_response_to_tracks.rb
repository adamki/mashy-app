class AddEchoResponseToTracks < ActiveRecord::Migration
  def change
    add_column :tracks, :echo_response, :hstore, default: {}, null: true 
  end
end
