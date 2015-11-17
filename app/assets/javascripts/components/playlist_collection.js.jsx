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
  getInitialState: function() {
    return { echoVisible: false };
  },
  handleClick:function(){
    this.setState({ echoVisible: true });
  },
  render: function(){
    var track_list = this.props.tracks.map(function(track, index){
      return(
        <Track {...track} key={track.id}echoVisible={this.state.echoVisible} />
      );
    }.bind(this));
    return(
      <div className="playlist-details">
        <h3>{this.props.playlist.name} by: {this.props.playlist.owner}</h3>
        <button onClick={this.handleClick}>Analize this Track</button>
        <ul className="collection with-header" data-collapsible="accordion">
          {track_list}
        </ul>
      </div>
    );
  }
});

var Track = React.createClass({
  render: function(){
    return(
      <li key={this.props.id} className="collection-item">
        {this.props.name} by: <strong>{this.props.artist}</strong>
        {this.props.echoVisible ? <AudioSummary {...this.props.echo_response}/> : null}
      </li>
    );
  }
});

var AudioSummary = React.createClass({
  render: function(){
  var audio_summary = this.props.audio_summary;
    return(
      <div>
        <span>{this.props.audio_summary.energy}</span>
        <span>{this.props.audio_summary.tempo}</span>
        <span>{this.props.audio_summary.acousticness}</span>
        <span>{this.props.audio_summary.valence}</span>
      </div>
    );
  }
});
