var PlaylistCollection = React.createClass({
  getInitialState: function() {
    return { playlists: [],
                tracks: [],
              playlist: {},
          showPlaylist: false,
            showtracks: false,
            echoPayload:[]
          };
  },
  componentDidMount: function() {
    console.log(this);
    $.ajax({
      url: '/api/v1/playlists/user.json',
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
    var collected_id = playlist.tracks.reduce(function(ary, track){
      ary.push(track.id);
      return ary;
    }, []);

    var echoAjax = function(id){
      $.ajax({
        url:'/api/v1/tracks/' + id,
        type: 'GET',
        success: function(response){
          this.setState({echoPayload: response});
        }
      });
    };

    var collected_responses = collected_id.reduce(function(ary, id){
      ary.push(echoAjax(id));
      return ary;
    }, []);
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
