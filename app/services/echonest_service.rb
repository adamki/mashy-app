class EchonestService
  attr_accessor :song_connection

  def initialize
    api_key = ENV["echo_api_key"]
    @song_connection = Echonest::Song.new(api_key)
  end

  def get_song_analysis(song_name, song_artist)
    params = {
      title: song_name,
      artist: song_artist,
      bucket: "audio_summary",
      format: "json",
      results: "1"
    }
    @song_connection.search(params).as_json
  end

  private

  def parse(response)
    JSON.parse(response.body, symbolize_names: true)
  end
end
