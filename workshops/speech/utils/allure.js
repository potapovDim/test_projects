const {rmdirSync, unlinkSync, writeFileSync, existsSync} = require('fs');
const {resolve} = require('path');
const {getSpecFilesArr} = require('process-rerun');

const allureResultsDefaultPath = process.env.ALLURE_PATH || resolve(__dirname, '../allure-results');

function allureCleanUp(allureResultsPath = allureResultsDefaultPath) {
  const reportFiles = getSpecFilesArr(allureResultsPath);

  reportFiles.forEach(function(file) {
    // test case result
    if(file.includes('-result.json')) {
      const executionResult = require(file);
      // in case if test case execution is success we should remove all attachments
      if(executionResult.status === 'passed') {
        executionResult.steps = [];
        // remove previous file result
        unlinkSync(file);
        // create new file with empty steps
        writeFileSync(file, JSON.stringify(executionResult));
      }
    }
  });
}

function clearAllureResults(allureResultsPath = allureResultsDefaultPath) {
  if(existsSync(allureResultsPath)) {
    try {
      getSpecFilesArr(allureResultsPath).forEach((item) => unlinkSync(item));
      rmdirSync(allureResultsPath);
    } catch(error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

function attachData(data) {
  if(typeof data === 'string') {
    global.allure.attachment('attachment', data, 'text/plain')
  } else {
    global.allure.attachment('attachment', JSON.stringify(data, null, '\t'), 'application/json')
  }
}

function allureStep(message, originalFunction, attachments) {
  if(!global.allure) {
    return originalFunction.apply(this);
  }

  const decorated = () => global.allure.step(message, async function() {
    if(attachments) {attachData(attachments)}
    const a = await originalFunction.apply(this);
    attachData(a)
    return a
  });
  return decorated();
}


module.exports = {
  allureCleanUp,
  clearAllureResults,
  allureStep,
  attachData
};
