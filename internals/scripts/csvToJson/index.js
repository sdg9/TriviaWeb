/**
 * eslint-disable no-ignore
*/
const csvFilePath = 'questions.csv';
const csv = require('csvtojson');

let index = 1;

const questionnaire = [];
const questions = {};

csv()
.fromFile(csvFilePath)
.on('json', (jsonObj) => {
  if (jsonObj.A === '') {
    const myIndex = `A${index}`;
    const question = {
      question: `[${jsonObj.Category}] ${jsonObj.Question}`,
      answer: jsonObj.Answer,
    };
    questions[myIndex] = question;
    questionnaire.push(myIndex);
  } else {
    // console.log('Obj: ', jsonObj);
    const myIndex = `A${index}`;
    const question = {
      question: `[${jsonObj.Category}] ${jsonObj.Question}`,
      answer: jsonObj.Answer,
      multipleChoice: {
        a: jsonObj.A,
        b: jsonObj.B,
        c: jsonObj.C,
        d: jsonObj.D,
      },
    };
    if (jsonObj.E) {
      question.multipleChoice.e = jsonObj.E;
    }
    questions[myIndex] = question;
    questionnaire.push(myIndex);
  }
  index += 1;
})
.on('done', () => {
  const output = {
    questionnaires: {
      discoverTrivia: questionnaire,
    },
    questions,
  };
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(output, null, 2));
});
