'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.static('dist'));

app.use((0, _cors2.default)({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.options('*', (0, _cors2.default)());

app.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../dist/index.html'));
});

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  var host = server.address().address || 'localhost';
  var por = server.address().port;

  console.log('Web server started at http://' + host + ':' + por);
});

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });
