// JavaScript Document
var statusOk = false;
var hash_response = null;
	
function callback_ok_getHashPassword(soapResponse){
	statusOk = true;
	hash_response = soapResponse.toJSON().Body.getHashedPasswordResponse.return;
}

function callback_notok_getHashPassword(soapResponse){
	statusOk = false;
}

function getHashedPassword(password){
	$.soap({
    	url: 'https://lab.scc.uned.es:8443/axis2/services/HashPasswordsWS/',
		method: 'getHashedPassword',
		appendMethodToURL: true, 
	
		params: {
			pass: password
		},
		namespaceQualifier: 'passwords',                     
		namespaceURL: 'http://passwords.ws.related.scc.uned.es',
		success: callback_ok_getHashPassword,
		error: callback_notok_getHashPassword,
		async: false,
		enableLogging: true   
	});
	
	return hash_response;
}
