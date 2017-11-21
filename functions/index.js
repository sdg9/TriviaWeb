/* eslint-disable import/no-unresolved */
// Issue #4
const functions = require('firebase-functions');
/* eslint-enable import/no-unresolved */

const isMatch = require('./utils').isMatch;

exports.autoScore = functions.database.ref('/scores/{gameKey}/{playerKey}/{gameRound}/response')
.onWrite((event) => {
  const response = event.data.val();
  const { gameKey, gameRound } = event.params;

  event.data.ref.root.child('games').child(gameKey).child('questions').child(gameRound).once('value').then((snapshot) => {
    const question = snapshot.val();

    return event.data.ref.parent.update({
      originalQuestion: question,
      isCorrect: isMatch(response, question.answer),
    });
  });
});
