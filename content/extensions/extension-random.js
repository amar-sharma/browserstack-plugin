var runWithAutomate = function(){
 this.options=SeleniumIDE.Preferences.load();
 this.options['executeUsingWebDriver']=true;
 desired_cap = {'browser': 'Chrome', 'browser_version': '43.0', 'os': 'Windows', 'os_version': '8.1', 'resolution': '1024x768'};
 this.options['webDriverBrowserString']=desired_cap;
 SeleniumIDE.Preferences.save(this.options);
 this.options=SeleniumIDE.Preferences.load();
}

WebdriverBackedSelenium.prototype.startNewWebdriverSession = function(browserName) {
  var self = this;
  return new Deferred(function(deferred) {
    alert('Lel')
    LOG.debug('Connecting to Selenium Fucker');
    HTTP.post('http://localhost:4444/wd/hub/session',
      JSON.stringify({
        'desiredCapabilities': browserName}),
      {'Accept': 'application/json; charset=utf-8'},
      function(response, success) {
        if (success && response) {
          self.webdriverResponse = JSON.parse(response.replace(/\0/g, ''));
          self.webdriverSID = self.webdriverResponse.sessionId;
          deferred.resolve(self.webdriverSID);
        } else {
          deferred.reject({message: {t: 'RemoteConnectError', m: 'Could not connect to Selenium Server. Have you started the Selenium Server yet?'}});
        }
      }
    );
  });
};
