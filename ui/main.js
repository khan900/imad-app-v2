console.log('Loaded!');

//change text od dib main-text
var elem = document.getElementById('main-text');

elem.innerHTML = "This is a new value - modified by JS";

//move madi
var img = document.getElementById('madi');

var marginLeft = 0
function moveRight()
{
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
}

img.onclick = function(){
    var interval = setInterval(moveRight,50);
};