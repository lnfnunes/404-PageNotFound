const admin = require('firebase-admin');
const axios = require('axios');

const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://404-pagenotfound.firebaseio.com',
});

const db = admin.database();
const ref = db.ref('feed');
let arrLinks;
ref
  .orderByChild('title')
  .once('value', function(snap) {
    const links = snap.val();
    try {
      arrLinks = Object.keys(links).map(key => links[key]);
    } catch (err) {
      arrLinks = [];
    }
    console.log('initial data:', arrLinks.length);

    fetchListLinks()
      .then(parseLinks)
      .then(syncAllLinks)
      .catch(err => console.error(err))
  }
);

const reMdLinks = /\[(.*)\]\((.*)\)/gmi;
function fetchListLinks() {
  return axios.get('https://raw.githubusercontent.com/lnfnunes/404-PageNotFound/master/LIST.md')
    .then(response => response.data)
    .catch(err => console.error('fetchListLinks ERROR:', err))
}

function parseLinks(str) {
  return Promise.resolve(
    str
      .match(reMdLinks)
      .map(strLinkToJsonAdapter)
  )
}
function strLinkToJsonAdapter(link) {
  return JSON.parse(
    link.replace(reMdLinks, JSON.stringify({
      title: '$1',
      url: '$2',
      voteCount: 0
    }))
  );
}

function syncAllLinks(arrListLinks) {
  // Reset DB
  ref.set({});

  syncPromise(arrListLinks, addLink);
}
function addLink(link) {
  console.log(`Adding ${link.title}...`);

  return new Promise((resolve, reject) => {
    ref.push().set(link, err =>
      err ? reject() : resolve()
    );
  });
}
function syncPromise(arr, fn) {
  arr.reduce((x, y) => x.then(() => fn(y)), Promise.resolve());
}
