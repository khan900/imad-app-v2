//Counter code

var button = document.getElementById('counter');

button.onclick = function()
{
    //Create a request object
    var request = new  XMLHttpRequest();
    
    //capture the response & Store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE)
        {
            //take some action
            if(request.status===200)
            {
                var counter = request.responseText;
                
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
            //not done yet
    };
    
    //make  a request
   request.open("GET","http://khan900.imad.hasura-app.io/counter",true); //readystate changes
   request.send(null);
    
    
    
    
};

//submit
var submit = document.getElementById('btn-submit');
var inputName = document.getElementById('name');
var name = inputName.value;

submit.onclick = function(){
  //Make a request and send the name to the server
  
  //capture the received names and render it as list
  names = ['khan','Mumtaz','Maroof','Shahbaz'];
  var list = '';
  for(var i = 0; i < names.length; i++){
      list += "<li>" + names[i]  + "</li>";
  }
  ul = document.getElementById('namelist');
  ul.innerHTML = list;
  
};