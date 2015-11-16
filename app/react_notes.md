
<button onClick={this.handleAnalyzePlaylistClick}>
  Analyze a Playlist!
</button>
<ul>
  {this.state.renderDropdown === true ? playListNames : ''}
</ul>

<PlaylistInformation  playlist={this.state.playlist} />
