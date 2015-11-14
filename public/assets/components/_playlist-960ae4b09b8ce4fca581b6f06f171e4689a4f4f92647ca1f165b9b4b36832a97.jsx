var Playlist = React.createClass({
  getInitialState: function() {
    return {value: 'Come join us', rawIdeas: []}
  },
  onButtonBoxClick: function() {
    this.setState({value: "You clicked a button, and here I am all of a sudden."});
  },
  componentDidMount: function() {
    $.ajax({
      url: '/api/v1/ideas.json',
      type: 'GET',
      success: function(response) {
        this.setState({rawIdeas: response});
      }.bind(this)
    });
  },
  handleDeleteIdea: function(id) {
    var ideasToKeep = this.state.rawIdeas.filter(function(idea) {
      return idea.id != id;
    });

    $.ajax({
      url: '/api/v1/ideas/' + id,
      type: 'DELETE',
      success: function() {
        this.setState({rawIdeas: ideasToKeep})
      }.bind(this)
    });
  },
  handleSubmitIdea: function(title, description) {
    $.ajax({
      url: '/api/v1/ideas',
      type: 'POST',
      data: {idea: {title: title, body: description}},
      success: function(response) {
        this.renderAllIdeas(response);
      }.bind(this)
    });
  },
  renderAllIdeas: function(newIdea) {
    var newIdeas = this.state.rawIdeas.concat(newIdea);

    this.setState({rawIdeas: newIdeas});
  },

  render: function() {
    return (
      <div className='dashboard'>
        <h1>Preparation is key!!!!</h1>

        <ButtonBox onButtonClick={this.onButtonBoxClick} />
        <ContentBox text={this.state.value} />
        <CreateNewIdea submitNewIdea={this.handleSubmitIdea} />

        <IdeaBox ideas={this.state.rawIdeas} onDeleteIdea={this.handleDeleteIdea} />
      </div>
    )
  }
});

var CreateNewIdea = React.createClass({
  handleSubmit: function(event) {
    event.preventDefault();
    var title = (React.findDOMNode(this.refs.title).value.trim());
    var description = (React.findDOMNode(this.refs.description).value.trim());

    this.props.submitNewIdea(title, description);
  },
  render: function() {
    return (
      <div>
        <h1>Do you have another idea?</h1>
        <form>
          <div className="form-group dropdown-toggle">
            <input type="text" ref="title" placeholder="title" id="searchfield" />
            <input type="text" ref="description" placeholder="description" id="searchfield" />
            <button name="button" onClick={ this.handleSubmit } className="btn btn-primary">Search</button>
          </div>
        </form>
      </div>
    )
  }
});

var ButtonBox = React.createClass({
  handleClick: function() {
    this.props.onButtonClick()
  },
  render: function() {
    return (
      <div>
        <button onClick={this.handleClick} >
          Click me!
        </button>
      </div>
    )
  }
});

var ContentBox = React.createClass({
  render: function() {
    return (
      <div className='content-box'>
        <h1>{this.props.text}</h1>
      </div>
    )
  }
});

var IdeaBox = React.createClass({
  handleDeleteClick: function(event) {
    this.props.onDeleteIdea(event.target.value);
  },
  render: function() {
    var ideaElements = this.props.ideas.map(function(idea, index) {
      return (
        <div className='idea' key={index} >
          <h1>{idea.title}</h1>
          <h3>{idea.body}</h3>
          <p>Quality: {idea.quality}</p>

          <button className='btn btn-primary'
                  onClick={this.handleDeleteClick}
                  value={idea.id}
          >
            Delete!
          </button>

        </div>
      )
    }.bind(this));

    return (
      <div>
        {ideaElements}
      </div>
    )
  }
});
