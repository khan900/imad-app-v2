//importing packages
var express = require('express'); //library used to create the webserver, (how to listen to ports, handling http connections) 
var morgan = require('morgan'); //to help us output log sof our server, so that we know what requests are coming to server & how we're responding

var app = express();
app.use(morgan('combined'));


//handling specific URLs
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one', function (req,res){
   res.send('Article one is requested and will be served here') ;
});
app.get('/article-two', function (req,res){
   res.send('Article two is requested and will be served here') ;
});
app.get('/article-three', function (req,res){
   res.send('Article three is requested and will be served here') ;
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
