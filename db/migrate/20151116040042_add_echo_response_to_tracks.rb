class AddEchoResponseToTracks < ActiveRecord::Migration
  def change
    add_column :tracks, :echo_response, :json, default: {}, null: true 
  end
end
