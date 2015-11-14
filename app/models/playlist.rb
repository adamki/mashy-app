class Playlist < ActiveRecord::Base
  belongs_to :user
  has_many :tracks

  def self.save(tester)
    playlist = find_or_create_by(spotify_id: tester.id)
    playlist.update_attributes(
      name: tester.name,
      spotify_id: tester.id,
      owner: tester.owner.id,
    )
    playlist
  end
end
