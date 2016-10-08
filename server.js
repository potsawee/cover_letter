var express = require('express');
var morgan = require('morgan');
const PORT = 80;

var app = express();
app.use(morgan('dev'));
app.use(express.static(__dirname));

app.listen(PORT, function() {
	console.log("Listening on port: %s", PORT);
});