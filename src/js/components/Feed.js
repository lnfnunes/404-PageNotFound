const React    = require('react');
const Firebase = require('firebase');

const Header   = require('./Header');
const FeedList = require('./FeedList');

const FB_PATH = 'https://404-pagenotfound.firebaseio.com/';
const FB_REF = 'feed';

var Feed = React.createClass({
  componentWillMount: function() {
    this.setState({
      items: [],
      isLoading: false,
    });
  },

  componentDidMount: function() {
    this.setState({
      isLoading: true,
    }, this.loadData);
  },

  loadData: function() {
    var ref = new Firebase(`${FB_PATH}${FB_REF}`);
    ref.on('value', function(snap) {
      var items = [];

      snap.forEach(function(itemSnap) {
        var item = itemSnap.val();
        item.id = itemSnap.key();
        items.push(item);
      });

      this.setState({
        items: items,
        isLoading: false,
      });
    }.bind(this));
  },

  getInitialState: function() {
    return {
      items: [],
      formDisplayed: false
    }
  },

  onVote: function(item) {
    var ref = new Firebase(`${FB_PATH}${FB_REF}`).child(item.id);
    ref.update(item);
  },

  render: function() {
    return (
      <div>
        <Header />
        <FeedList
          items={this.state.items}
          onVote={this.onVote}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
});

module.exports = Feed;
