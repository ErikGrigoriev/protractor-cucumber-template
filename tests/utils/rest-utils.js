/** Class representing a set of general utils. */
const RestUtils = function () {

  /**
   * Sends post request.
   *
   * @param {string}  url      Request url.
   * @param {object}  json     Request json.
   * @param {object}  headers  Request headers.
   * @param {this}    that     this of cucumber step, in order to get report in case of fail.
   *
   * @return {object} Response json.
   */
  this.postRequest = async (url, json, headers, that) => {
    try {
      console.log('ich bin da');
      return await superagent.post(url)
        .set(headers)
        .send(json);
    } catch (err) {
      const errorStatus = err.response.status;
      console.log(err.response.status);
      console.log(err.message);
      //console.log(err.response);
      /*that.attach(Buffer.from('response:').toString('base64'), 'text/plain');
      const errorResponseString = JSON.stringify(err.response, undefined, 4);
      that.attach(Buffer.from(errorResponseString).toString('base64'), 'text/plain');
      that.attach(Buffer.from('Request headers:').toString('base64'), 'text/plain');
      const getLinkRequestHeadersString = JSON.stringify(getLinkRequestHeaders, undefined, 4);
      that.attach(Buffer.from(getLinkRequestHeadersString).toString('base64'), 'text/plain');
      that.attach(Buffer.from('Request body:').toString('base64'), 'text/plain');
      const requestJsonString = JSON.stringify(requestJson, undefined, 4);
      that.attach(Buffer.from(requestJsonString).toString('base64'), 'text/plain');
      assert.fail('Request failed with following message: ' + errorStatus + ' - ' + err.message);*/

    }
  };

};
module.exports = new RestUtils();