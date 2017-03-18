//importing packages
var express = require('express'); //library used to create the webserver, (how to listen to ports, handling http connections) 
var morgan = require('morgan'); //to help us output log sof our server, so that we know what requests are coming to server & how we're responding
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'khan900',
    database:'khan900',
    host: 'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
};


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
                ${date.toDateString()}
            </div>
            <div>
                ${content}
            </div>
            <hr>
            <h2>Comments</h2>
            <textarea rows="5"  style="resize:none;width:60%"  id="comment"></textarea><br>
            <input type="submit" value="Comment" style="margin-left:48%;" id="comment-submit">
            <hr/>
            <div id="comments-display">
                
            </div>
            
            
        </div>
        <script >
            //comments display
            var comm_submit = document.getElementById('comment-submit');
            comm_submit.onclick = function(){
                var commentBox = document.getElementById('comment');
                var comment = commentBox.value;
                
                var request = new XMLHttpRequest();
                request.onreadystatechange = function(){
                    if(request.readyState === XMLHttpRequest.DONE)
                    {
                        if(request.status === 200)
                        {
                            var comments = request.responseText;
                            comments = JSON.parse(comments);
                            var section = '';
                            for(var i = 0; i<comments.length; i++){
                                section = section + '<div>' + comments[i] + '</div><hr>';
                            }
                            div = document.getElementById('comments-display');
                            div.innerHTML = section;
                        }
                    }
                    
                };
                
                request.open('GET', 'http://khan900.imad.hasura-app.io/submit-comment?comment='+comment,true);
                request.send(null);
                
                
                
                
            };    
        </script>
    </body>
</html>
    `;
    return htmlTemplate;
}


//handling specific URLs
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);

app.get('/test-db',function(req, res) {
   //make a select request
   //return response with  result
   pool.query('SELECT * FROM test',function(err,result){
       if(err){
           err.status(500).send(err.toString());
       }
       else{
           res.send(JSON.stringify(result.rows));
       }
       
   });
});


var counter = 0;
app.get('/counter', function (req, res) {
  counter = counter + 1;
  res.send(counter.toString());
});

var comments = [];
app.get('/submit-comment/',function(req,res){
    var comment = req.query.comment;
    comments.push(comment);
    res.send(JSON.stringify(comments));
});

var names=[];
//oneway of getting data as part of URL & sending info back as JSON 
app.get('/submit-name/', function(req,res){//URL  : /submit-name?name=xyz
    
             // another-way:/submit-name/:name - part of URL
    //get the name from request & store it
    var name = req.query.name;
    names.push(name);
    
    //sendthe stored information back
    //JSON - way of converting JS object into string
    res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function (req,res){
    //articleName = article-one
    //articles[articleName] -> {} content object for article one
    //express framework provision
    
    
    pool.query("SELECT * from article WHERE title = '" + req.params.articleName + "'",function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows.length === 0){
                res.status(400).send('Article Not Found');
            }
            else{
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }    
    });
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});






var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
