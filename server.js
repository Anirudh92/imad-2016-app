var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
  //host: 'localhost',
  //user: 'foo',
  //password: 'bar',
  //database: 'my_db',
  
  host: 'db.imad.hasura-app.io',
  user: 'anirudh92',
  database: 'anirudh92',
  port:'5432',
  password: process.env.DB_PASSWORD
  
};
var app = express();
app.use(morgan('combined'));

var articles = {
    
 'article-one' : {
    
    title: 'Article One | Anirudh Anand',
    heading: 'Article One',
    date: '20th September 2016',
    content: `<p>
                The is Article One which presents the first content that can be used to read about something.The is Article One which presents the first content that can be used to read about something. The is Article One which presents the forst content that can be used to read about something. The is Article One which presents the forst content that can be used to read about something.
            </p>
            
            <p>    
                The is Article One which presents the first content that can be used to read about something.The is Article One which presents the first content that can be used to read about something. The is Article One which presents the forst content that can be used to read about something. The is Article One which presents the forst content that can be used to read about something.
            </p>
            
            <p>    
                The is Article One which presents the first content that can be used to read about something.The is Article One which presents the first content that can be used to read about something. The is Article One which presents the forst content that can be used to read about something. The is Article One which presents the forst content that can be used to read about something.
            </p>`
    
},

'article-two' :{
    
    title: 'Article Two | Anirudh Anand',
    heading: 'Article Two',
    date: '21th September 2016',
    content: `<p>
                The is Article Two which presents the second content that can be used to read about something.
            </p>
            
            `
    
},

'article-three': {
    
    title: 'Article Three | Anirudh Anand',
    heading: 'Article Three',
    date: '22th September 2016',
    content: `<p>
                The is Article Three which presents the third content that can be used to read about something.
              </p>
            
            `
    
}

    
}; 



function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;

var HtmlTemplate = `
    <html>
    <head>
    <title>
        ${title}    
    </title>
    <meta name="viewport" content="width-device-width, initial-scale=1"/>
   <link href="ui/style.css" rel="stylesheet"/>
    </head>
<body>
    <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        
        <hr/>
        
        <h3>
            ${heading}      
        </h3>
        
        <div>
            ${date.toDateString()}    
        </div>
        
        <div>
            
            ${content}
            
        </div>
    </div>
</body>
</html>`;
    return HtmlTemplate;
    
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);

app.get('/test-db',function(req,res){
    //make a select request
    
    //return a response
    pool.query('SELECT * FROM test',function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
        
    });    
});

var counter=0;
app.get('/counter',function(req,res){
    counter = counter + 1;
    res.send(counter.toString());
    
});
var names = [];
app.get('/submit-name',function(req,res){
    //get the name from the request object
    var name = req.query.name;
    
    names.push(name);
    //JSON
    res.send(JSON.stringify(names));
    
});
app.get('/article/:articleName',function(req,res){
    
   //$1 used for setting "\" in a query to protect it from SQL injection attacks, $1 displays the first element in the array
   
   pool.query("SELECT * FROM article WHERE title = $1",[req.params.articleName], function(err, result){
       if(err){
           res.status(500).send(err.toString());
       
           
       }
       else
       {
           if(result.rows.length === 0){
               res.status(404).send('Article Not Found');
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

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
