var PlaylistCollection = React.createClass({
  getInitialState: function() {
    return { playlists: [],
                tracks: [],
              playlist: {},
          showPlaylist: false,
            showtracks: false,
       showEchoResults: false,
          echoResponse: false};
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
    var spotify_id = playlist.spotify_id;
    $.ajax({
      url: '/api/v1/playlists/' + spotify_id,
      type: 'GET',
      success: function(response){
        this.setState({ playlist: response });
        this.setState({ tracks: response.tracks });
        this.setState({ showPlaylist: !this.state.showPlaylist });
      }.bind(this)
    });
  },
  getEchoHandler: function(playlist){
    var track_ids = [];
    playlist.tracks.map(function(track){
      track_ids.push(track.spotify_id);
    });

    var that = this;
    var response = track_ids.map(function(id){
      $.ajax({
        url: '/api/v1/tracks/' + id,
        type: 'GET',
        success: function(response){
          that.setState({echoResponse: response});
        }.bind(this)
      });
    });
    // this.setState.echoResponse={response}
  },
  render: function(){
    return(
      <div className="playlistsBox">
        <h1>Playlists</h1>
        <AllPlaylists playlists={this.state.playlists} getPlaylist={this.showPlaylistHandler}/>
        {this.state.showEchoResults ? < ResultsDisplay echoResponse={this.state.echoResponse}
                                    /> : null}
        {this.state.showPlaylist ? <SinglePlaylistBox
                                        getEchoResults={this.getEchoHandler}
                                              playlist={this.state.playlist}
                                              tracks={this.state.tracks}
                                              scores={this.state.scores}
                                    /> : null}
      </div>
    );
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
  handleClick: function() {
    this.props.getEchoResults(this.props);
    return(
      console.log(this.props.tracks)
    );
  },
  render: function(){
    var track_list = this.props.tracks.map(function(track, index){
      return(
        <li key={track.id} className="collection-item">
          {track.name} by: <strong>{track.artist}</strong>
        </li>
      );
    }.bind(this));
    return(
      <div className="playlist-details">
        <h3>{this.props.playlist.name} by: {this.props.playlist.owner}</h3>
        <button onClick={this.handleClick}>Analize this Playlist</button>
        <ul className="collection with-header" data-collapsible="accordion">
          {track_list}
        </ul>
      </div>
    );
  }
});
