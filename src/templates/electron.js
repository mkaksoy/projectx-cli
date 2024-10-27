export default {
  index:
    '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8">\n    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->\n    <meta http-equiv="Content-Security-Policy" content="default-src \'self\'; script-src \'self\'">\n    <title>Hello World!</title>\n  </head>\n  <body>\n    <h1>Hello World!</h1>\n    We are using Node.js <span id="node-version"></span>,\n    Chromium <span id="chrome-version"></span>,\n    and Electron <span id="electron-version"></span>.\n  </body>\n</html>',
};
