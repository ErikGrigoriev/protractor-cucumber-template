/** Class representing a set of mail utils. */
const MailUtils = function () {

  /**
   * This method is returning the whole mail object.
   * It contains all the information about the single mail.
   */
  this.getLastEmailObject = async () => {
    console.log("Waiting for email...");
    return new Promise((resolve, reject) => {
      let count = 0;
      mailListener.on("mail", function (mail) {
        let i = ++count;
        if (i > 2) {
          mailListener.stop();
          return;
        }
        resolve(mail);
        if (mail === null) reject();
      });
    });
  };

  /**
   * This method is used specifically for the subject of the mail.
   */
  this.getEmailSubject = () => {
    return new Promise((resolve, reject) => {
      let count = 0;
      mailListener.on("mail", function (email) {
        let i = ++count;
        if (i > 2) {
          mailListener.stop(); // start listening
          return;
        }
        resolve(email.subject);
        if (email == null) reject();
      });
    });
  };

  /**
   * This method can be used to manipulate every element of the headers of the mail.
   */
  this.getEmailHeaders = () => {
    return new Promise((resolve, reject) => {
      let count = 0;
      mailListener.on("mail", function (email) {
        let i = ++count;
        if (i > 2) {
          mailListener.stop(); // start listening
          return;
        }
        resolve(email.headers);
        if (email === null) reject();
      });
    });
  };

  /**
   * Login to the administration tool
   *
   * @param {object}    world     This parameter can be used in this function using "this" keyword
   * @param {string}    market    Market abbreviation
   *
   */
  this.loginToAdminTool = async (world, market) => {
    const marketOption = market.toLowerCase();
    const loginToAdminHeaders = {
      'Content-Type': 'application/json',
      'applicationName': 'DCP'
    };
    const loginToAdminBody = {
      'username': 'testuser1',
      'password': 'testuser'
    };
    try {
      const loginToAdminToolResponse = await superagent.post(`${browser.baseUrl}/monitor-marketOption/properties/login`)
        .set(loginToAdminHeaders)
        .send(loginToAdminBody);
      const linkBody = await loginToAdminToolResponse.body;
      browser.adminToolJwt = linkBody.jwt;
    } catch (err) {
      const errorStatus = err.response.status;
      world.attach(Buffer.from('Login to admin tool response:').toString('base64'), 'text/plain');
      const errorResponseString = JSON.stringify(err.response, undefined, 4);
      world.attach(Buffer.from(errorResponseString).toString('base64'), 'text/plain');
      world.attach(Buffer.from('Login to admin tool Request headers:').toString('base64'), 'text/plain');
      const loginToAdminToolRequestHeaders = JSON.stringify(loginToAdminHeaders, undefined, 4);
      world.attach(Buffer.from(loginToAdminToolRequestHeaders).toString('base64'), 'text/plain');
      world.attach(Buffer.from('Login to admin tool request body:').toString('base64'), 'text/plain');
      const requestJsonString = JSON.stringify(loginToAdminBody, undefined, 4);
      world.attach(Buffer.from(requestJsonString).toString('base64'), 'text/plain');
      assert.fail('Login to admin tool request failed with following message: ' + errorStatus + ' - ' + err.message);
    }
  };

  /**
   * Creates Email templates and activates it
   *
   * @param {object}   world  This parameter can be used in this function using "this" keyword
   * @param {string}    market    Market abbreviation
   *
   */
  this.createEmailTemplate = async (world, market) => {
    const marketOption = market.toLowerCase();
    browser.marketOption=marketOption;
    browser.emailSubject = "Test confirmation";
    browser.mailFrom = "confirmation-test@evia.de";
    const emailTemplateHeaders = {
      'Content-Type': 'application/json',
      'jwt': browser.adminToolJwt
    };
    const emailTemplateBody = {
      "activated": true,
      "channel": "EMAIL",
      "root": true,
      "name": utils.generateRandomString(10),
      "step": "OCA_CONFIRMATION",
      "lang": "de",
      "subject": browser.emailSubject,
      "mailFrom": browser.mailFrom,
      "attachmentId": "",
      "content": null,
      "fileName": "Confirmation Email",
      "snippets": null,
      "templateType": "EXTERNAL"
    };
    try {
      const emailTemplateResponse = await superagent.post(`${browser.baseUrl}/notification-marketOption/templates`)
        .set(emailTemplateHeaders)
        .send(emailTemplateBody);
      const responseBody = await emailTemplateResponse.body;
      browser.templateId = responseBody.id;
    } catch (err) {
      const errorStatus = err.response.status;
      world.attach(Buffer.from('Get link Request response:').toString('base64'), 'text/plain');
      const errorResponseString = JSON.stringify(err.response, undefined, 4);
      world.attach(Buffer.from(errorResponseString).toString('base64'), 'text/plain');
      world.attach(Buffer.from('Link Request headers:').toString('base64'), 'text/plain');
      const getLinkRequestHeadersString = JSON.stringify(getLinkRequestHeaders, undefined, 4);
      world.attach(Buffer.from(getLinkRequestHeadersString).toString('base64'), 'text/plain');
      world.attach(Buffer.from('Link Request body:').toString('base64'), 'text/plain');
      const requestJsonString = JSON.stringify(requestJson, undefined, 4);
      world.attach(Buffer.from(requestJsonString).toString('base64'), 'text/plain');
      assert.fail('Get link Request failed with following message: ' + errorStatus + ' - ' + err.message);
    }
  }
};
module.exports = new MailUtils();