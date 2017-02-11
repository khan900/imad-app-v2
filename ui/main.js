//Counter code

var button = document.getElementById('counter');

button.onclick = function()
{
    //Create a request object
    var request = new  XMLHTTPRequest();
    
    //capture the response & Store it in a variable
    request.onreadystatechange = function(){
        if(request.readystate === XMLHTTPRequest.DONE)
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