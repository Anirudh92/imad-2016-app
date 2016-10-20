//counter - code

var button = document.getElementById('counter');

button.onclick = function(){
    //create a request
    var request = new XMLHttpRequest();
    // capture the response and store it in a variable
    request.onreadystatechange = function(){
      if(request.readyState === XMLHttpRequest.DONE)  {
          //take some action
          if(request.status === 200)
          {
            var counter= request.responseText;
            var span = document.getElementById('count');
            span.innerHTML = counter.toString();
          }
      }
        //not done yet
    };
    request.open('GET','http://anirudh92.imad.hasura-app.io/counter',true);
    request.send(null);
    
   
};
// Submit name
var nameInput = document.getElementById("name");
var name = nameInput.value;
var submit = document.getElementById("sub_btn");
submit.onclick = function(){
    // make a request to the server
    var request = new XMLHttpRequest();
    // capture the response and store it in a variable
    request.onreadystatechange = function(){
      if(request.readyState === XMLHttpRequest.DONE)  {
          //take some action
          if(request.status === 200)
          {
            //capture a list of name and render it as a list
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for(var i=0; i< names.length; i++){
                    list = '<li>' +names[i]+ '</li>';
                }
                var ul = getElementById('namelist');
                ul.innerHTML = list;
          }
      }
        //not done yet
    };
    request.open('GET','http://anirudh92.imad.hasura-app.io/submit-name?name=' + name,true);
    request.send(null);
    
    
};