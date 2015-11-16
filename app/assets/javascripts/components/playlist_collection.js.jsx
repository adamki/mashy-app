var PlaylistCollection = React.createClass({
  getInitialState: function() {
    return { playlists: [],
                tracks: [],
              playlist: {},
          showPlaylist: false,
            showtracks: false };
  },
  componentDidMount: function() {
    $.ajax({
      url: '/api/v1/playlists.json',
      type: 'GET',
      success: function(response) {
        this.setState({playlists: response});
      }.bind(this)
    });
  },
  showPlaylistHandler: function(playlist, event){
    var spotify_id = playlist.spotify_id
    $.ajax({
      url: '/api/v1/playlists/' + spotify_id,
      type: 'GET',
      success: function(response){
        this.setState({ playlist: response })
        this.setState({ tracks: response.tracks })
        this.setState({ showPlaylist: !this.state.showPlaylist })
      }.bind(this)
    });
  },
  getTrackHandler: function(playlist){
  },
  render: function(){
    return(
      <div className="playlistsBox">
        <h1>Playlists</h1>
        <AllPlaylists playlists={this.state.playlists} getPlaylist={this.showPlaylistHandler}/>
        {this.state.showPlaylist ? <SinglePlaylistBox
                                              playlist={this.state.playlist}
                                                tracks={this.state.tracks}
                                                scores={this.state.scores}
                                              getTrack={this.getTrackHandler}
                                    /> : null}
      </div>
    )
  }
});

var AllPlaylists = React.createClass({
  render: function(){
    var playlistName = this.props.playlists.map(function(playlist, index){
      return(
        <li key={playlist.id}>
          <a onClick={this.props.getPlaylist.bind(null, playlist)} value={playlist.id}>
            {playlist.name}
          </a>
        </li>
      );
    }.bind(this));
    return(
      <div className="playlistBox">
        <ul>
          {playlistName}
        </ul>
      </div>
    );
  }
});

var SinglePlaylistBox = React.createClass({
  render: function(){
    var track_list = this.props.tracks.map(function(track, index){
      return(
        <li key={track.id}>
          {track.name} by: {track.artist}
        </li>
      );
    }.bind(this));
      return(
        <div className="playlist-details">
          <h3>{this.props.playlist.name}</h3>
          <h5>{this.props.playlist.owner}</h5>
          <ul>
            {track_list}
          </ul>
          <button onClick={this.props.getTrack.bind(null, this.props)}>Analize this Playlist</button>
        </div>
    );
  }
});
