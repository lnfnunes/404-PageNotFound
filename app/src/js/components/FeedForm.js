

var React = require('react');

var FeedForm = React.createClass({

  handleForm: function(e) {
    e.preventDefault();

    var newItem = {
      title: this.refs.title.value,
      url: this.refs.url.value,
      voteCount: 0
    };

    this.refs.feedForm.reset();

    this.props.onNewItem(newItem);

  },

  render: function() {
    var display = this.props.displayed ? 'block' : 'none';
    var styles = {
      display: display
    };
    return (
      <form ref="feedForm" style={styles} id="feedForm" className="container" onSubmit={this.handleForm}>

        <div className="form-group">

          <input ref="title" type="text" className="form-control" placeholder="Title" />
          <input ref="url" type="url" className="form-control" placeholder="Link" />

          <button type="submit" className="btn btn-primary btn-block">Add</button>
        </div>

      </form>
    );
  }

});

module.exports = FeedForm;
