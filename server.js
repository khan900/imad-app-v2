//importing packages
var express = require('express'); //library used to create the webserver, (how to listen to ports, handling http connections) 
var morgan = require('morgan'); //to help us output log sof our server, so that we know what requests are coming to server & how we're responding
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
      'article-one' : {
      title : 'Article One | Shahbaz Khan',  
      heading: 'Article One',
      date :  'Feb 04, 2017',
      content : `
            <p>
                This is my first article. I am so excited ! This is my first article. I am so excited !This is my first article. I am so excited ! This is my first article. I am so excited ! This is my first article. I am so excited !
            </p>
            <p>
                This is my first article. I am so excited ! This is my first article. I am so excited !This is my first article. I am so excited ! This is my first article. I am so excited ! This is my first article. I am so excited !
            </p>
            <p>
                This is my first article. I am so excited ! This is my first article. I am so excited !This is my first article. I am so excited ! This is my first article. I am so excited ! This is my first article. I am so excited !
            </p>
      `
    
        },
      'article-two' : {
          title : 'Article Two | Shahbaz Khan',  
          heading: 'Article Two',
          date :  'Feb 05, 2017',
          content : `
                <p>
                    This is my second article. 
                </p>
          `
        
        },
      'article-three' : {
          title : 'Article Three | Shahbaz Khan',  
          heading: 'Article Three',
          date :  'Feb 7, 2017',
          content : `
                <p>
                    This is my third article. 
                </p>
          `
        
        },
};


function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var htmlTemplate = `
    <html>
    <head>
        <title>${title}</title>
        <meta name="viewport" content = "width = device-width" initial scale="1"/>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
            <div>
                <a href="/">Home</a>
                <hr>
            </div>
            <div>
                <h1>${heading}</h1>
            </div>
            <div>
                ${date}
            </div>
            <div>
                ${content}
            </div>
        </div>
    </body>
</html>
    `;
    return htmlTemplate;
}


//handling specific URLs
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req,res){
    //articleName = article-one
    //articles[articleName] -> {} content object for article one
    //express framework provision
    articleName = req.params.articleName;
   res.send(createTemplate(articles[articleName]));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
