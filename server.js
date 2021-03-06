//require our websocket library 
var WebSocketServer = require('ws').Server; 

//creating a websocket server at port 9090 
var wss = new WebSocketServer({port: 9090});
  
//when a user connects to our sever 
wss.on('connection', function(connection) { 
   console.log("user connected"); 
	
   //when server gets a message from a connected user 
   connection.on('message', function(message) { 
      console.log("Got message from a user:", message); 
   }); 
	
   connection.send("Hello from server"); 
});
connection.on('message', function(message) { 
   var data; 
	
   //accepting only JSON messages 
   try { 
      data = JSON.parse(message); 
   } catch (e) { 
      console.log("Invalid JSON");
      data = {}; 
   } 
});
//require our websocket library 
var WebSocketServer = require('ws').Server; 

//creating a websocket server at port 9090 
var wss = new WebSocketServer({port: 9090}); 

//all connected to the server users 
var users = {};
connection.on('message', function(message) { 
   var data; 
	
   //accepting only JSON messages 
   try { 
      data = JSON.parse(message); 
   } catch (e) { 
      console.log("Invalid JSON"); 
      data = {}; 
   }
	
   //switching type of the user message 
   switch (data.type) { 
      //when a user tries to login 
      case "login": 
         console.log("User logged:", data.name); 
			
         //if anyone is logged in with this username then refuse 
         if(users[data.name]) { 
            sendTo(connection, { 
               type: "login", 
               success: false
            }); 
         } else { 
            //save user connection on the server 
            users[data.name] = connection; 
            connection.name = data.name; 
				
            sendTo(connection, { 
               type: "login", 
               success: true 
            }); 
         } 
			
         break;
			
      default: 
         sendTo(connection, { 
            type: "error", 
            message: "Command no found: " + data.type 
         }); 
			
         break;
   } 
});
function sendTo(connection, message) { 
   connection.send(JSON.stringify(message)); 
}
connection.on("close", function() { 
   if(connection.name) { 
      delete users[connection.name]; 
   } 
});
case "offer": 
   //for ex. UserA wants to call UserB 
   console.log("Sending offer to: ", data.name); 
	
   //if UserB exists then send him offer details 
   var conn = users[data.name]; 
	
   if(conn != null){ 
   //setting that UserA connected with UserB 
   connection.otherName = data.name; 
	
      sendTo(conn, { 
         type: "offer", 
         offer: data.offer, 
         name: connection.name 
      }); 
     
   break;
   