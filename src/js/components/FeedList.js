var React = require('react'),
    FeedItem = require('./FeedItem');

var FeedList = React.createClass({

  render: function() {

    var feedItems = this.props.items.map(function(item) {
      return <FeedItem key={item.id}
                       id={item.id}
                       title={item.title}
                       url={item.url}
                       votes={item.votes}
                       onVote={this.props.onVote} />
    }.bind(this));

    return (
      <div className="container">
        <ul className="list-group">
          {feedItems}
        </ul>
      </div>
    );
  }

});

module.exports = FeedList;
