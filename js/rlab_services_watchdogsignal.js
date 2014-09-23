// JavaScript Document
var statusOk = false;
var isAlive_response = false;
	
function callback_ok_isAlive(soapResponse){
	statusOk = true;
	txt = soapResponse.toJSON().Body.isAliveResponse.return;
	isAlive_response = (txt == "true");
}

function callback_notok_isAlive(soapResponse){
	statusOk = false;
}

function isAlive(id){
	isAlive_response = false;
	$.soap({
    	url: 'http://lab.scc.uned.es:8080/axis2/services/WatchDogSignalWS/',
		method: 'isAlive',
		appendMethodToURL: true, 
	
		params: {
			systemID: id
		},
		namespaceQualifier: 'watchdog',                     
		namespaceURL: 'http://watchdog.ws.web.related.scc.uned.es',
		success: callback_ok_isAlive,
		error: callback_notok_isAlive,
		async: false,
		enableLogging: true   
	});
	
	return isAlive_response;
}
