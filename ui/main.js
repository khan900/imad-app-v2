//Counter code

var button = document.getElementById('counter');
var counter = 0
button.onclick = function()
{
    //Make a request to counter endpoint
    
    //capture the response & Store it in a variable
    
    //Render the variable in correct span
    var span = document.getElementBYId('count');
    counter = counter + 1
    span.innerHTML = counter.toString();
    
}