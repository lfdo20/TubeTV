'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.static('dist'));

app.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../dist/index.html'));
});

var port = 3000;
app.listen(port, function () {
  console.log('Server started on port ' + port);
});
