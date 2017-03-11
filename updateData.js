const admin = require('firebase-admin');
const axios = require('axios');
const _ = require('lodash');

const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://404-pagenotfound.firebaseio.com',
});
const db = admin.database();
const ref = db.ref('feed');

const reParseMarkdownLinks = /\[(.*)\]\((.*)\)/gmi;

let arrFbLinks;
getFirebaseLinks(arrFbLinks)
  .then(data => {
    console.log('==============================');
    console.log('Firebase DB Links:', data.length);
    console.log('==============================\n');

    arrFbLinks = data;
    return data;
  })
  .then(getGhLinks);

function getFirebaseLinks() {
  return new Promise((resolve, reject) => {
    ref
      .orderByChild('title')
      .once('value', snap => {
        // Store Firebase DB links
        const fbLinks = snap.val();
        const arr =
          fbLinks
            ? Object.keys(fbLinks).map(key => fbLinks[key])
            : []
        resolve(arr);
      }
    );
  });
}

function getGhLinks() {
  fetchGhLinks()
    .then(parseLinks)
    .then(data => {
      console.log('==============================');
      console.log('GH markdown Links:', data.length);
      console.log('==============================\n');
      return data;
    })
    .then(setLinkVotesAdapter)
    .then(syncAllLinks)
    .catch(err => console.error('getGhLinks ERROR:', err))
}

function fetchGhLinks() {
  return axios.get('https://raw.githubusercontent.com/lnfnunes/404-PageNotFound/master/LIST.md')
    .then(response => response.data)
    .catch(err => console.error('fetchListLinks ERROR:', err))
}
function parseLinks(str) {
  return Promise.resolve(
    str
      .match(reParseMarkdownLinks)
      .map(strLinkToJsonAdapter)
  )
}
function strLinkToJsonAdapter(link) {
  return JSON.parse(
    link.replace(reParseMarkdownLinks, JSON.stringify({
      title: '$1',
      url: '$2',
    }))
  );
}
function setLinkVotesAdapter(arr) {
  return arr.map(link => {
    const linkOnDB = _.find(arrFbLinks, {title: link.title});
    const votes = linkOnDB ? linkOnDB.votes : [];

    return Object.assign(link, {
      votes: votes,
    });
  });
}

function syncAllLinks(arr) {
  // Reset DB
  ref.set({});
  syncPromise(arr, addLink);
}
function addLink(link) {
  console.log(`Adding ${link.title} [${link.votes}]...`);

  return new Promise((resolve, reject) => {
    ref.push().set(link, err =>
      err ? reject() : resolve()
    );
  });
}
function syncPromise(arr, fn) {
  arr.reduce((x, y) => x.then(() => fn(y)), Promise.resolve());
}
