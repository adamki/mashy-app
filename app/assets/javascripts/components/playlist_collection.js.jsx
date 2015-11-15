var PlaylistCollection = React.createClass({
  getInitialState: function() {
    return { playlists: [],
          showPlaylist: false,
              playlist: {},
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
    var spotify_id = playlist.spotify_id;
    $.ajax({
      url: '/api/v1/playlists/' + spotify_id,
      type: 'GET',
      success: function(response){
        this.setState({playlist: response});
      }.bind(this)
    });
    this.setState({
      showPlaylist: !this.state.showPlaylist
    });
  },
  getTrackHandler: function(playlist){
    console.log({ playlist });
  },
  render: function(){
    return(
      <div className="playlistsBox">
        <h1>Playlists</h1>
        <AllPlaylists playlists={this.state.playlists} getPlaylist={this.showPlaylistHandler}/>
        {this.state.showPlaylist ? <SinglePlaylistBox
                                              playlist={this.state.playlist}
                                              getTrack={this.getTrackHandler}
                                    /> : null}
      </div>
    );
  }
});

var AllPlaylists = React.createClass({
  render: function(){
    var playlistName = this.props.playlists.map(function(playlist, index){
      return(
        <li key={playlist.id} className="collection-item">
          <a onClick={this.props.getPlaylist.bind(null, playlist)} value={playlist.id}>
            {playlist.name}
          </a>
        </li>
      );
    }.bind(this));
    return(
      <div className="playlistBox">
        <ul className="collection">
          {playlistName}
        </ul>;
      </div>
    );
  }
});

var SinglePlaylistBox = React.createClass({
  render: function(){
    return(
      <div className="playlist-details">
        <h3>{this.props.playlist.name}</h3>
        <h5>{this.props.playlist.owner}</h5>
        <button onClick={this.props.getTrack.bind(null, this.props)}>Analize this Playlist</button>
      </div>
    );
  }
});
