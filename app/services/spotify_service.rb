class SpotifyService

  attr_reader :session, :user

  def initialize(user=nil, session=nil)
    @session = session
    @user = find_user
  end

  def find_user
    RSpotify::User.new(session[:auth_info])
  end

  def find_users_playlists
    
    playlists = @user.playlists

    # take all playlists,
    # if the playlist exists in the DB, move on
    # else, write it to the DB

    # Playlist ID's
    # Owner ID's
    # with the PL ID's, we can fetch the related songs
    # fetch songs dynamically in the view with AJAX

    # <% react_component "userPlaylist", {id: ....}, {prerender: true} %>
    #
    # app/assets/components/_user_playlist.js.jsx
    #
    # export default React.createCLass({
      # ajax magic and rendering

      # fetch all PL and songs
      # iterate over each object and display them nicely

      # });

    # ---> when a playlist changes (add song, remove song),
    # we need to reflect that change in the DB
    # Spotify API --> Sha changes? ID changes?

  end

  def create_playlist!(name)
    @user.create_playlist!(name)
  end

  def find_playlist(params)
    RSpotify::Playlist.find(@user.id, params[:id])
  end

  private

    def parse(response)
      JSON.parse(response.body, symbolize_names: true)
    end
end
