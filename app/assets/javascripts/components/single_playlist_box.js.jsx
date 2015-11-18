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
