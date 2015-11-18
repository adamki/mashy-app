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
