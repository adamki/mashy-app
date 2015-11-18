var AudioSummary = React.createClass({
  render: function(){
  var audio_summary = this.props.audio_summary;
    return(
      <div className="col m12 left">
        <ul>
          <li>Energy: {this.props.audio_summary.energy}</li>
          <li>Liveness: {this.props.audio_summary.liveness}</li>
          <li>Tempo: {this.props.audio_summary.tempo}</li>
          <li>Speech Level: {this.props.audio_summary.speechiness}</li>
          <li>Acoustic Level:{this.props.audio_summary.acousticness}</li>
          <li>Instrument Level: {this.props.audio_summary.instrumentalness}</li>
          <li>Mode: {this.props.audio_summary.mode}</li>
          <li>Time Signature: {this.props.audio_summary.time_signature}</li>
          <li>Duration:{this.props.audio_summary.duration}</li>
          <li>Loudness{this.props.audio_summary.loudness}</li>
          <li>audio_md5: {this.props.audio_summary.audio_md5}</li>
          <li>Valence: {this.props.audio_summary.valence}</li>
          <li>Danceability: {this.props.audio_summary.danceability}</li><br/>
        </ul>
      </div>
    );
  }
});
