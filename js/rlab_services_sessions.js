// JavaScript Document
var statusOk = false;
var getOpenSessionsForSystem_response = false;
	
function callback_ok_getOpenSessionsForSystem(soapResponse){
	statusOk = true;
	object = soapResponse.toJSON().Body.getOpenSessionsForSystemResponse.return;
	if (object.ID != null){
		getOpenSessionsForSystem_response = object;
	} else {
		getOpenSessionsForSystem_response = null;
	}
}

function callback_notok_getOpenSessionsForSystem(soapResponse){
	statusOk = false;
}

function getOpenSessionsForSystem(id){
	getOpenSessionsForSystem_response = false;
	$.soap({
    	url: 'http://lab.scc.uned.es:8080/axis2/services/SessionsWS_v2/',
		method: 'getOpenSessionsForSystem',
		appendMethodToURL: true, 
	
		params: {
			systemID: id
		},
		namespaceQualifier: 'sessions',                     
		namespaceURL: 'http://sessions.ws.web.related.scc.uned.es',
		success: callback_ok_getOpenSessionsForSystem,
		error: callback_notok_getOpenSessionsForSystem,
		async: false,
		enableLogging: true   
	});
	
	return getOpenSessionsForSystem_response;
}
