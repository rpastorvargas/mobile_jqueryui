// JavaScript Document
var statusOk = false;
var getSystemInfo_response = null;
var getExperiments_response = null;
var getExperimentInfo_response = null;

// Global configuration
var soap_config_systemsWS = {
    	url: 'https://lab.scc.uned.es:8443/axis2/services/ManageSystemsWS/',
		method: '',
		appendMethodToURL: true, 
	
		params: {
		},
		namespaceQualifier: 'systems',                     
		namespaceURL: 'http://systems.ws.related.scc.uned.es',
		success: null,
		error: null,
		async: false,
		wss: {
        	username: 'related_developer',
        	password: 'L+Fy/dOUQ4pLP5JTY92qEw=='
   	 	}, 
		enableLogging: true   
}
	
// -----------------------------------------------------------------
// GETSystemInfo
// -----------------------------------------------------------------
function callback_ok_getSystemInfo(soapResponse){
	statusOk = true;
	getSystemInfo_response = soapResponse.toJSON().Body.getSystemInfoResponse.return;
}

function callback_notok_getSystemInfo(soapResponse){
	statusOk = false;
	getSystemInfo_response = null;
}

function getSystemInfo(id){
	if (id !=null){
		soap_config_systemsWS.method = 'getSystemInfo';
		soap_config_systemsWS.params = {
										 id: id
									   };
		soap_config_systemsWS.success = callback_ok_getSystemInfo;
		soap_config_systemsWS.error = callback_notok_getSystemInfo;
		statusOk = false;
		$.soap(soap_config_systemsWS);
			
		return getSystemInfo_response;
	} else {
		return null;
	}
}

// -----------------------------------------------------------------
// GETExperimentInfo
// -----------------------------------------------------------------
function callback_ok_getExperimentInfo(soapResponse){
	statusOk = true;
	getSystemInfo_response = soapResponse.toJSON().Body.getExperimentInfoResponse.return;
}

function callback_notok_getExperimentInfo(soapResponse){
	statusOk = false;
	getExperimentInfo_response = null;
}

function getExperimentInfo(id, exp_id){
	soap_config_systemsWS.method = 'getExperimentInfo';
	soap_config_systemsWS.params = {
									 system_id: id,
									 experiment_id: exp_id
								   };
	soap_config_systemsWS.success = callback_ok_getExperimentInfo;
	soap_config_systemsWS.error = callback_notok_getgetExperimentInfo;
	statusOk = false;
	$.soap(soap_config_systemsWS);
	return getExperimentInfo_response;
}

// -----------------------------------------------------------------
// GETExperiments
// -----------------------------------------------------------------

function callback_ok_getExperiments(soapResponse){
	statusOk = true;
	getExperiments_response = soapResponse.toJSON().Body.getExperimentsResponse.return;
}

function callback_notok_getExperiments(soapResponse){
	statusOk = false;
}

function getExperiments(id){
	soap_config_systemsWS.method = 'getExperiments';
	soap_config_systemsWS.params = {
									 systemID: id
								   };
	soap_config_systemsWS.success = callback_ok_getExperiments;
	soap_config_systemsWS.error = callback_notok_getExperiments;
	statusOk = false;
	$.soap(soap_config_systemsWS);
	
	return getExperiments_response;

}

function getExperimentInfo(lab_id,experiment_id){
	experiment_info = null;
	experiments = getExperiments(lab_id);
	// Find the experiment in list
	if (experiments != null){
		// Check for one or array
		if (isArray(experiments)){
			// Find the experiment_name in array
			var l = experiments.length;
			for (i=0;i<l;i++){
				if (experiments[i].id == experiment_id){
					experiment_info = experiments[i];
					break;
				}
			}
		} else {
			// only one experiment !!!
			experiment_info = experiments;
		}
		
	}
	return experiment_info;
}

// Utilities
function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}
