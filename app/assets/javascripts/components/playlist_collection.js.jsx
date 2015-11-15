var PlaylistCollection = React.createClass({
  getInitialState: function() {
    return { playlists: [], showPlaylist: false, playlist: {} };
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
  showPlaylistDetails: function(playlist, event){
    var spotify_id = playlist.spotify_id
    console.log(spotify_id)
    $.ajax({
      url: '/api/v1/playlists/' + spotify_id,
      type: 'GET',
      success: function(response){
        this.setState({playlist: response})
      }.bind(this)
    });
    this.setState({
      showPlaylist: true
    })
  },
  render: function(){
    return(
      <div className="playlistsBox">
        <h1>Playlists</h1>
        <PlaylistsBox playlists={this.state.playlists} showPlaylist={this.showPlaylistDetails}/>
        {this.state.showPlaylist ? <PlaylistDetails playlist={this.state.playlist}/> : null}
      </div>
    )
  }
});

var PlaylistsBox = React.createClass({
  // handleClick: function(){
  //   this.props.showPlaylist.bind(null, this)
  // },
  render: function(){
    var playlistName = this.props.playlists.map(function(playlist, index){
      return(
        <li key={playlist.id}>
          <a onClick={this.props.showPlaylist.bind(null, playlist)} value={playlist.id}>
            {playlist.name}
          </a>
        </li>
      );
    }.bind(this));
    return(
      <div className="playlistBox">
        {playlistName}
      </div>
    );
  }
});

var PlaylistDetails = React.createClass({
  render: function(){
    return(
      <div className="playlist-details">
        <h3>{this.props.playlist.name}</h3>
        <h5>{this.props.playlist.owner}</h5>


      </div>
    );
  }
});
