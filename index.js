const fetch = require('isomorphic-fetch');

class RPCClient {
  constructor(options = {}) {
    this.serverUrl = options.serverUrl || 'http://localhost';
  }

  listMethods() {
    return this.call('methods');
  }

  call(name, args) {
    return fetch(this.serverUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        args: JSON.stringify(args),
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(json => json.result);
  }
}

module.exports = RPCClient;
