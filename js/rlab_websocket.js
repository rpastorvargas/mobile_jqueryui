// Websocket based Session Control

var session = null;
var alive_signal = 60000; // 1 minute
// Create a Singleton function
function getSession(host,port,userName,experimentName,slotTime,
				 onDataReceived,onOpenCallback,
				 onCloseCallback,onErrorCallback){
	if (session !=null ){
		return session;
	} else {
		session = new Session(host,port,userName,experimentName,slotTime,
				 onDataReceived,onOpenCallback,
				 onCloseCallback,onErrorCallback);
		return session;
	}
}



function Session(host,port,userName,experimentName,slotTime,
				 onDataReceived,onOpenCallback,
				 onCloseCallback,onErrorCallback) { 
		this.user = userName;
	    this.experiment_name= experimentName;
	    this.slot_time = slotTime;
		this.data_format = 1;
		this.data = null;
		this.openned = false;
		this.timerId = null;
		this.onDataReceived = [onDataReceived];
		this.onOpenCallback = [onOpenCallback];
		this.onCloseCallback = [onCloseCallback];
		this.onErrorCallback = [onErrorCallback];
		try {
			alert("Opening web socket..");
	    	this._ws = new WebSocket("ws://" + host + ":" + port +"/");
	    	this._ws.onopen = this._onopen;
        	this._ws.onmessage = this._onmessage;
        	this._ws.onclose = this._onclose;
        	this._ws.onerror = this._onerror;
			this._ws.websocket_openned = false;
			// Set the value for session
			this._ws.session = this;
		} catch (e){
			alert("Error connecting " + e);
		}
	}
	
	Session.prototype.registerOnOpenCallback = function(myCallback){
		this.onOpenCallback.push(myCallback);
	}
	
	Session.prototype.registerOnDataReceived = function(myCallback){
		this.onDataReceived.push(myCallback);
	}
	
	Session.prototype.registerOnCloseCallback = function(myCallback){
		this.onCloseCallback.push(myCallback);
	}
	
	Session.prototype.registerOnErrorCallback = function(myCallback){
		this.onErrorCallback.push(myCallback);
	}
	
	Session.prototype._onopen = function(){          
        if (this.readyState == 0){
			// CONNECTING
			alert("Connecting");
			this.websocket_openned = false;
			this.session.openned = false;
		} else if (this.readyState == 1){
			alert("Connected..");
			// Open the sesion (connection using Websocket!!!
			rlab_openSession(this.session);
			// Start alive timing
			this.timerId = setInterval(sendAliveSignal, alive_signal);
			// Session is open. ready to flow messages
			this.session.openned = true;
			this.websocket_openned = true;
		} else {
			// CLOSED
			// alert("Closed");
			this.websocket_openned = false;
			this.session.openned = false;
		}
		// Inform to clients !!!
		for (var i = 0; i < this.session.onOpenCallback.length; i++) {
    		this.session.onOpenCallback[i](this.readyState);
		};	
	};
 
    Session.prototype._onmessage = function(m) {
		// data is json format...
		var object = JSON.parse(m.data);
		for (var i = 0; i < this.session.onDataReceived.length; i++) {
    		this.session.onDataReceived[i](object);
		}
	};
 
    Session.prototype._onclose = function(m) {
		// Stop timer
		clearInterval(this.timerId);
		// Inform to clients
		for (var i = 0; i < this.session.onCloseCallback.length; i++) {
    		this.session.onCloseCallback[i](m);
		}
    };
 
    Session.prototype._onerror = function(e) {
        for (var i = 0; i < onErrorCallback.length; i++) {
    		this.session.onErrorCallback[i](e);
		}
    };
	
function sendAliveSignal(){
	// Send an alive message
	// Create json command
	var command = { command: "alive" };
	var json_data = JSON.stringify(command);	
	console.log("send alive..");			  
	session._ws.send(json_data);
}
	

function rlab_openSession(session){
	// Create json command
	var command = { command: "connect", user: session.user,
					  experiment: session.experiment_name,
					  slot_time: session.slot_time,
					  data_format: 1 };
	var json_data = JSON.stringify(command);				  
	session._ws.send(json_data);
	// Add to session storage !!
	storeInSessionStorage(session);
}

function rlab_closeSession(session){
	// Create json command
	var command = { command: "disconnect", user: session.user,
					  experiment: session.experiment_name,
					  slot_time: session.slot_time,
					  data_format: 1 };
	var json_data = JSON.stringify(command);				  
	session._ws.send(json_data);
	session._ws.close();
	// Remove from session storage
	removeFromSessionStorage(session);
}

function rlab_echo(){
	// Create json command
	var command = {command: "echo"};
	var json_data = JSON.stringify(command);				  
	session._ws.send(json_data);
}



function storeInSessionStorage(session){
	var json_string = JSON.stringify(session, function( key, value) {
  		if(key == '_ws') {
			return JSON.stringify(session._ws, function (key,value){
						if (key=='session'){
							return "self";
						} else {
							return value;
						}
					});
    		// return "self";
  		} else {
    		return value;
  		};
	}); 
	sessionStorage.setItem('session', json_string);
	//var sessionNew = getSessionInSessionStorage()
}

function removeFromSessionStorage(session){
	sessionStorage.removeItem('session');

}

function getSessionInSessionStorage(){
	json_string = sessionStorage.getItem('session');
	session = JSON.parse(json_string);
	// Create ws object
	var ws = JSON.parse(session._ws);
	session._ws = ws;
	session._ws.session = session;
}