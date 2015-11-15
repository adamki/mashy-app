var PlaylistCollection = React.createClass({
  getInitialState: function() {
    return {playlists: [] };
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
  render: function(){
    return(
      <div className="playlistsBox">
        <h1>Playlists</h1>
        <PlaylistsBox playlists={this.state.playlists} />
      </div>
    )
  }
});

var PlaylistsBox = React.createClass({
  displayMore: function(event){
    console.log("fdsafdsa");
  },
  render: function(){
    var playlistNodes = this.props.playlists.map(function(playlist){
      return(
        <li>
          <a onClick={this.displayMore} >
            {playlist.name}
          </a>
        </li>
      );
    }.bind(this));
    return(
      <div className="playlistBox">
        {playlistNodes}
      </div>
    );
  }
});
