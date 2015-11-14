var PlaylistCollection = React.createClass({
  getInitialState: function() {
    return {value: 'Playlists'}
  },
  onButtonBoxClick: function() {
    this.setState({value: "You clicked a button, and here I am all of a sudden."});
  },
  render: function() {
    return (
      <div className='dashboard'>
        <h1>click here</h1>
        <ButtonBox onButtonClick={this.onButtonBoxClick} />
      </div>
    )
  }
})
