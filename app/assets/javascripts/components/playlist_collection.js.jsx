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
    // 1. get track ids in array
    // 2. send them to ajax function
    // 3. make one ajax call
    // 4. set the repsonse as state
    // 5. listen to tha tstate in SPB
    var collected_id = playlist.tracks.reduce(function(ary, track){
      ary.push(track.id);
      return ary;
    }, []);

    var echoAjax = function(id){
      $.ajax({
        url:'/api/v1/tracks/' + ids,
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

   // retrieve all the track ids ---> in getEchoHandler() --> retrieveTrackData(ids)
   // send them one by one to /api/tracks/:id ---> retrieveTrackData(ids) ---> make ajax call with promises (since multiple) --> Rails API endpoint accept a colllection of track IDs
     // --> response: parse and prepare the response objects, set the state r: response, pass down the updtated state to SinglePlaylistBox
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
  handleClick:function(){
    this.props.getEchoResults(this.props.playlist);
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
        <button onClick={this.handleClick}>Analize this Track</button>
        <ul className="collection with-header" data-collapsible="accordion">
          {track_list}
        </ul>
      </div>
    );
  }
});
