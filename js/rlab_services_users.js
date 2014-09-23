// JavaScript Document
var userOk = {
	ok: false,
	msg: "connecting..."
};
	
function callback_ok_checkUserByLogin(soapResponse){
	userOk.ok = eval(soapResponse.toJSON().Body.checkUserByLoginResponse.return.ok);
	userOk.msg = soapResponse.toJSON().Body.checkUserByLoginResponse.return.message;
}

function callback_notok_checkUserByLogin(soapResponse){
	userOk.ok = false;
	userOk.msg = soapResponse.toString();
}

function checkUserByLogin(user,pass){
	$.soap({
		url: 'https://lab.scc.uned.es:8443/axis2/services/ManageUsersWS/',
		method: 'checkUserByLogin',
		appendMethodToURL: true, 
		
		params: {
			login: user,
			hashPassword: pass
		},
		namespaceQualifier: 'users',                     
		namespaceURL: 'http://users.ws.related.scc.uned.es',
		success: callback_ok_checkUserByLogin,
		error: callback_notok_checkUserByLogin,
		async: false,
		enableLogging: true, 
		wss: {
        	username: 'related_developer',
        	password: 'L+Fy/dOUQ4pLP5JTY92qEw=='
   	 	}  
	});
	return userOk;
}