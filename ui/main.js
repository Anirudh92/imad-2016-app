console.log('Loaded!');

var element = document.getElementById("main-text");
element.innerHTML = 'new Value';

// Move image

var image = document.getElementById("madi");
var marginLeft = 0;
var marginRight = 0;

function moveRight(){
    marginLeft = marginLeft + 1;
    if(marginLeft <=200)
    {
        image.style.marginLeft = marginLeft + 'px';
    }
    else if(marginRight>=0 && marginRight<=200)
    {
        var interval2 = setInterval(moveLeft,50);    
    }
    
    }

function moveLeft(){
    marginRight = marginLeft - 1;
    image.style.marginRight = marginRight + 'px';
}

image.onclick = function(){
    
    var interval = setInterval(moveRight,50);
    
    

};