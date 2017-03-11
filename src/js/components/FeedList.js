const React = require('react');
const _ = require('lodash');

const FeedItem = require('./FeedItem');
const Loading = require('./Loading');

const FeedList = React.createClass({
  render: function() {
    const feedItems = _
      .sortBy(this.props.items, 'title')
      .map(item => 
        <FeedItem
          key={item.id}
          id={item.id}
          title={item.title}
          url={item.url}
          votes={item.votes}
          onVote={this.props.onVote}
        />
      );

    const loading = this.props.isLoading ? <Loading /> : false;
    return (
      <div className="container text-center">
        {loading}
        <ul className="list-group" style={styles.feedListContainer}>
          {feedItems}
        </ul>
      </div>
    );
  }
});

const styles = {
  feedListContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}

module.exports = FeedList;
