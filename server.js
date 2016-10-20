var express = require('express');
var morgan = require('morgan');
var path = require('path');

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
            ${date}    
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
app.get('/:articleName',function(req,res){
    
   var articleName = req.params.articleName;
   res.send(createTemplate(articles[articleName])); 

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
