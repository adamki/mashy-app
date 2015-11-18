var AllPlaylists = React.createClass({
  render: function(){
    var playlistName = this.props.playlists.map(function(playlist, index){
      return(
        <li key={playlist.id}>
          <a onClick={this.props.getPlaylist.bind(null,  playlist)} value={playlist.id}>
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
