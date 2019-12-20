const URL = require('url');
const fetch = require('node-fetch');
const {allureStep, attachData} = require('./allure');

async function requestRetry(requestCallback, retries = 3, timeout = 5 * 1000) {
  let response;
  let count = 0;
  do {
    count++;
    response = await allureStep(`Request number #${count}`, requestCallback).catch((requestError) => ({requestError}));

    if(response.requestError && count < retries) {
      await sleep(timeout);
    }
  } while(count < retries && response.requestError);

  if(response.requestError) {
    throw response.requestError;
  }

  return response;
}

async function _fetchy(method, host, {path, body, headers = {'Cotent-Type': 'application/json'}}) {

  const requestHost = URL.resolve(host, path)

  async function executeRequest() {
    const result = await fetch(requestHost, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : body
    })
    return result.headers.get('Content-Type').includes('application/json') ? result.json() : result.text()
  }

  return allureStep(`URL: ${requestHost}, method: ${method}`, () => requestRetry(executeRequest), arguments[2])
}

function fetchy(host) {
  return {
    patch: _fetchy.bind(_fetchy, 'PATCH', host),
    get: _fetchy.bind(_fetchy, 'GET', host),
    put: _fetchy.bind(_fetchy, 'PUT', host),
    post: _fetchy.bind(_fetchy, 'POST', host),
    del: _fetchy.bind(_fetchy, 'DELETE', host)
  };
}

module.exports = {
  fetchy
}