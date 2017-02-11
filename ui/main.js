console.log('Loaded!');

//change text od dib main-text
var elem = document.getElementById('main-text');

elem.innerHTML = "This is a new value - modified by JS";

//move madi
var img = document.getElementById('madi');

img.onclick = function(){
    img.style.marginLeft = 100;
}