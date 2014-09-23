/////////////////////////////////////////////////
/////////////////////////////////////////////////
// RELATED API Library for a REST RLAB System
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function getLabName(lab){
	var command = 'getSystemName'
	var baseUrl = createMainUrl(lab);
	var url = baseUrl + command;
	var name = getFromUrlDirect(url);
	// Decode 
	// Simple string
	//var name = loadSingleStringFunction(url);
	
	return name;
}


///////////////////////////////////////////////////////////
//
// MODULES API
// 
//////////////////////////////////////////////////////////
function getModulesNames(lab){
	var command = 'getModulesNames'
	var baseUrl = createMainUrl(lab);
	var url = baseUrl + command;
	var xml = getFromUrlDirect(url);
	// Decode to an array !!!
	var modules_names = new Array();
	var names = $(xml).find('rlabString');
	$(names).each(function(index, element) {
        var module_name = $(this).text();
		modules_names.push(module_name);
    });
	return modules_names;
}

function getModulesDescriptions(lab){
	var command = 'getModulesDescriptions'
	var baseUrl = createMainUrl(lab);
	var url = baseUrl + command;
	var xml = getFromUrlDirect(url);
	// Decode to an array !!!
	var modules_names = new Array();
	var names = $(xml).find('rlabString');
	$(names).each(function(index, element) {
        var module_name = $(this).text();
		modules_names.push(module_name);
    });
	return modules_names;
}

function getLocalModulesNames(lab,experiment){
	var command = 'getLocalModulesNames'
	var baseUrl = createMainUrl(lab);
	var arguments = experiment;
	var url = encodeURI(baseUrl + command + '/' + arguments);
	var xml = getFromUrlDirect(url);
	// Decode to an array !!!
	var modules_names = new Array();
	var names = $(xml).find('rlabString');
	$(names).each(function(index, element) {
        var module_name = $(this).text();
		modules_names.push(module_name);
    });
	return modules_names;
}

function getRemoteModulesNames(lab,experiment){
	var command = 'getRemoteModulesNames'
	var baseUrl = createMainUrl(lab);
	var arguments = experiment;
	var url = encodeURI(baseUrl + command + '/' + arguments);
	var xml = getFromUrlDirect(url);
	// Decode to an array !!!
	var modules_names = new Array();
	var names = $(xml).find('rlabString');
	$(names).each(function(index, element) {
        var module_name = $(this).text();
		modules_names.push(module_name);
    });
	return modules_names;
}

// XML based
// Also is simple to get the JSON representation
function getRemoteModulesSystemsNames(lab,experiment){
	var command = 'getRemoteModulesSystemsNames'
	var baseUrl = createMainUrl(lab);
	var arguments = experiment;
	var url = encodeURI(baseUrl + command + '/' + arguments);
	var xml = getFromUrlDirect(url);
	// Decode to an array !!!
	var systems_names = new Array();
	var names = $(xml).find('rlabString');
	$(names).each(function(index, element) {
        var system_name = $(this).text();
		systems_names.push(system_name);
    });
	return systems_names;
}

///////////////////////////////////////////////////////////
//
// EXPERIMENT API
// 
//////////////////////////////////////////////////////////

function getExperimentsNames(lab){
	var command = 'getExperimentsNames'
	var baseUrl = createMainUrl(lab);
	var url = baseUrl + command;
	var xml = getFromUrlDirect(url);
	// Decode to an array !!!
	var experiment_names = new Array();
	var names = $(xml).find('rlabString');
	$(names).each(function(index, element) {
        var experiment_name = $(this).text();
		experiment_names.push(experiment_name);
    });
	return experiment_names;
}

function getExperimentsDescriptions(lab){
	var command = 'getExperimentsDescriptions'
	var baseUrl = createMainUrl(lab);
	var url = baseUrl + command;
	var xml = getFromUrlDirect(url);
	// Decode to an array !!!
	var experiment_descs = new Array();
	var names = $(xml).find('rlabString');
	$(names).each(function(index, element) {
        var experiment_desc = $(this).text();
		experiment_descs.push(experiment_desc);
    });
	return experiment_descs;
}

function getExperimentTime(lab,experiment){
	var command = 'getTime'
	var baseUrl = createMainUrl(lab);
	var arguments = experiment;
	var url = encodeURI(baseUrl + command + '/' + arguments);
	var xml = getFromUrlDirect(url);
	
	return parseInt(xml);
}

function getVars(lab,module){
	var command = 'getVars'; 
	var baseUrl = createMainUrl(lab);
	var arguments = encodeURIComponent(module);
	var url = baseUrl + command + "/" + arguments;
	var xml = getFromUrlDirect(url);
	var vars = new Array();
	var array_vars = $(xml).find('rlabVar');
	$(array_vars).each(function(index, element) {
        var simple_var = $(this);
		vars.push(buildVar(simple_var));
    });
	return vars; 
}

function getVarsFromExperiment(lab,experiment){
	var command = 'getVarsFromExperiment'; 
	var baseUrl = createMainUrl(lab);
	var arguments = encodeURIComponent(experiment);
	var url = baseUrl + command + "/" + arguments;
	format = "json";
	var response = getFromUrlDirect(url,format);
	var vars = new Array();
	if( format == 'json'){
		vars = JSON.parse(response);
	}
	else if (format=="xml") {
		var array_vars = $(response).find('rlabVar');
		$(array_vars).each(function(index, element) {
        	var simple_var = $(this);
			vars.push(buildVar(simple_var));
    	});
	}
	return vars; 
}

function getParams(lab){
	var command = 'getParams'; 
	var baseUrl = createMainUrl(lab);
	//var arguments = encodeURIComponent(experiment);
	var url = baseUrl + command; // + "/" + arguments;
	format = "json";
	var response = getFromUrlDirect(url,format);
	var params = new Array();
	if( format == 'json'){
		// No params
		if (response != ""){
			params = JSON.parse(response);
			params = params.rlabParams.rlabParam;
		}
	}
	else if (format=="xml") {
		var array_params = $(response).find('rlabParam');
		$(array_params).each(function(index, element) {
        	var simple_param = $(this);
			params.push(buildParam(simple_param));
    	});
	}
	return params; 
}


function getVarByName(lab,name,module){
	var command = 'getVarByName';
	var baseUrl = createMainUrl(lab);
	var argument1 = encodeURIComponent(name);
	var argument2 = encodeURIComponent(module);
	var url = baseUrl + command + "/" + argument1 + "/" + argument2;
	format = "json";
	var response = getFromUrlDirect(url,format);
	var myVar = null;
	if (format == 'json'){
		json_object = JSON.parse(response);
		myVar = json_object.rlabVar;
	} else {
		var simple_var = $(response).find("rlabVar");
		myVar = buildVar($(simple_var)); 
	}
	return myVar; 
}

function getRemoteVarByName(name,module,system){
	var command = 'getVarByName';
	remote_lab = getRemoteLab(system);
	var baseUrl = createMainUrl(remote_lab);
	var argument1 = encodeURIComponent(name);
	var argument2 = encodeURIComponent(module);
	var url = baseUrl + command + "/" + argument1;
	format = "json";
	var response = getFromUrlDirect(url,format);
	var myVar = null;
	if (format == 'json'){
		json_object = JSON.parse(response);
		myVar = json_object.rlabVar;
	} else {
		var simple_var = $(response).find("rlabVar");
		myVar = buildVar($(simple_var)); 
	}
	return myVar; 
}

function setVarByName(lab,variable,module){
	var command = 'setVarByName';
	var baseUrl = createMainUrl(lab);
	var argument1 = encodeURIComponent(variable.name);
	var argument2 = encodeURIComponent(module);
	var url = baseUrl + command + "/" + argument1 + "/" + argument2;
	// Add the post to value !!!
	// data = '{ "rlabVar":' + JSON.stringify(variable) + "}";
	data = JSON.stringify(variable);
	// POST the value !!!
	format = "json";
	var returned = postToUrlDirect(url, data, format);
	console.log(returned);
}

function setRemoteVarByName(variable,module,system){
	var command = 'setVarByName';
	remote_lab = getRemoteLab(system);
	var baseUrl = createMainUrl(remote_lab);
	var argument1 = encodeURIComponent(variable.name);
	var argument2 = encodeURIComponent(module);
	var url = baseUrl + command + "/" + argument1 + "/" + argument2;
	// Add the post to value !!!
	// data = '{ "rlabVar":' + JSON.stringify(variable) + "}";
	data = JSON.stringify(variable);
	// POST the value !!!
	format = "json";
	var returned = postToUrlDirect(url, data, format);
	console.log(returned);
}

function setVarByName(lab,variable){
	var command = 'setVarByName';
	var baseUrl = createMainUrl(lab);
	var argument1 = encodeURIComponent(variable.name);
	var url = baseUrl + command + "/" + argument1;
	// Add the post to value !!!
	// data = '{ "rlabVar":' + JSON.stringify(variable) + "}";
	data = JSON.stringify(variable);
	// POST the value !!!
	format = "json";
	var returned = postToUrlDirect(url, data, format);
	console.log(returned);
}

/*************************************************************
* FUNCTIONS TO MANAGE A PRACTICAL EXPERIENCE
**************************************************************/
function initExperiment(lab, experiment){
	var command = 'initExperiment'
	var baseUrl = createMainUrl(lab);
	var arguments = experiment;
	var url = encodeURI(baseUrl + command + '/' + arguments);
	var initiatedStr = getFromUrlDirect(url);
	var ok = (initiatedStr=='true');
	return ok;
}

function startExperiment(lab, experiment){
	var command = 'startExperiment'
	var baseUrl = createMainUrl(lab);
	var arguments = experiment;
	var url = encodeURI(baseUrl + command + '/' + arguments);
	var startedStr = getFromUrlDirect(url);
	var ok = (startedStr=='true');
	return ok;
}

function stopExperiment(lab,experiment){
	var command = 'stopExperiment'
	var baseUrl = createMainUrl(lab);
	var arguments = experiment;
	var url = encodeURI(baseUrl + command + '/' + arguments);
	var stoppedStr = getFromUrlDirect(url);
	var ok = (stoppedStr=='true');
	return ok;
}

function setUserNameRunningExperiment(lab,experiment,username){
	
	var command = 'setUserNameRunningExperiment';
	var baseUrl = createMainUrl(lab);
	var arguments = username + "/" + experiment;
	var url = encodeURI( baseUrl + command + "/" + arguments);
	// POST
	format = "json";
	var returned = postToUrlDirect(url, null, format);
	console.log(returned);
}

/*********************************************************
/* FUNCTIONS TO GET PAINT INFO
/**********************************************************/

function getGraphsInfo(lab,experiment){
	var command = 'showGraphs';
	var arguments = experiment;
	var baseUrl = createMainUrl(lab);
	var url = encodeURI(baseUrl + command + '/' + arguments);
	format = 'json'; // 'xml' or 'json'
	// XML 
	// var graphs_info = getFromUrlDirect(url);
	// JSON
	var graphs_info = getFromUrlDirect(url,format);
	if (graphs_info !=null){
		if (format == 'xml'){
			graphs = buildGraphsInfoFromXML(graphs_info);	
		} else if (format=='json'){
			graphs = buildGraphsInfoFromJSON(graphs_info);
		}
		//console.log(graphs);
		return graphs;
	} 
	// No trend graphics!!!!
	return null;
}

/***********************************************************
/* WEBVIEWS !!!
/*********************************************************/
function getWebViewsUrlsFromExperiment(lab,experiment){
	var command = 'getWebViewsUrlsFromExperiment';
	var arguments = experiment;
	var baseUrl = createMainUrl(lab);
	var url = encodeURI(baseUrl + command + '/' + arguments);
	format = 'xml'; // 'xml' or 'json'
	var urls_response = getFromUrlDirect(url,format);
	if (urls_response !=null){
		if (format == 'xml'){
			var xml = urls_response;
			// Decode to an array !!!
			var urls_webviews = new Array();
			var urls_string = $(xml).find('rlabString');
			$(urls_string).each(function(index, element) {
        		var oneUrl = $(this).text();
				urls_webviews.push(oneUrl);
    		});	
		} else if (format=='json'){
			// TO DO !!!
			// CREATE THE ARRAY OF URLS FROM JSON RESPONSE !!!
			urls_webviews = JSON.parse(urls_response).rlabStrings;
		}
		// Must return an array !!!!
		return urls_webviews;
	} 
	// No web views!!!
	return null;
	
}

function getWebViewsFromExperiment(lab,experiment){
	var command = 'getWebViewsFromExperiment';
	var arguments = experiment;
	var baseUrl = createMainUrl(lab);
	var url = encodeURI(baseUrl + command + '/' + arguments);
	format = 'xml'; // 'xml' or 'json'
	var response = getFromUrlDirect(url,format);
	if (response !=null){
		if (format == 'xml'){
			var xml = response;
			// Decode to an array !!!
			var names = new Array();
			var strings = $(xml).find('rlabString');
			$(strings).each(function(index, element) {
        		var name = $(this).text();
				names.push(name);
    		});	
		} else if (format=='json'){
			// TO DO !!!
			// CREATE THE ARRAY OF URLS FROM JSON RESPONSE !!!
			names = JSON.parse(response).rlabStrings;
		}
		// Must return an array !!!!
		return names;
	} 
	// No web views!!!
	return null;
	
}

function getWebViewsDescriptionsFromExperiment(lab,experiment){
	var command = 'getWebViewsDescriptionsFromExperiment';
	var arguments = experiment;
	var baseUrl = createMainUrl(lab);
	var url = encodeURI(baseUrl + command + '/' + arguments);
	format = 'xml'; // 'xml' or 'json'
	var response = getFromUrlDirect(url,format);
	if (response !=null){
		if (format == 'xml'){
			var xml = response;
			// Decode to an array !!!
			var descriptions = new Array();
			var strings = $(xml).find('rlabString');
			$(strings).each(function(index, element) {
        		var desc = $(this).text();
				descriptions.push(desc);
    		});	
		} else if (format=='json'){
			// TO DO !!!
			// CREATE THE ARRAY OF URLS FROM JSON RESPONSE !!!
			descriptions = JSON.parse(response).rlabStrings;
		}
		// Must return an array !!!!
		return descriptions;
	} 
	// No web views!!!
	return null;
	
}



/***********************************************************
/* INTERACTIVE VARIABLES !!!
/*********************************************************/
function getLocalInteractiveVariables(lab,experiment,module){
	var command = 'getShowInteractiveVars';
	var arguments = experiment + "/" + module + "/";
	var baseUrl = createMainUrl(lab);
	var url = encodeURI(baseUrl + command + '/' + arguments);
	var vars_names_xml = getFromUrlDirect(url);
	// Decode to an array !!!
	var vars_names = new Array();
	var names = $(vars_names_xml).find('rlabString');
	$(names).each(function(index, element) {
        var var_name = $(this).text();
		vars_names.push(var_name);
    });
	return vars_names;
}

function getRemoteInteractiveVariables(lab,experiment,module,remote_system){
	var command = 'getShowInteractiveVars';
	remote_system_uri = encodeURIComponent(remote_system);
	var arguments = experiment + "/" + module + "/" + remote_system_uri + "/";
	var baseUrl = createMainUrl(lab);
	var url = encodeURI(baseUrl + command + '/' + arguments);
	var vars_names_xml = getFromUrlDirect(url);
	// Decode to an array !!!
	var vars_names = new Array();
	var names = $(vars_names_xml).find('rlabString');
	$(names).each(function(index, element) {
        var var_name = $(this).text();
		vars_names.push(var_name);
    });
	return vars_names;
}



// HELPERS FUNCTIONS !!!
// Object representation for REST service
function Lab(ip, port,id){
	this.ip = ip;
	this.port = port;
	this.id = id;
}


function createMainUrl(lab){
	var url = 'http://' + lab.ip + ':' + lab.port + "/"+ lab.id + "/";
	return url;
}


/********************************************************************************
FUNCTION FOR CROSS DOMAIN AJAX REQUEST USING JQUERY 1.5+
********************************************************************************/  
/* function loadData(url, callback) {  
 
    //CONFIRM A URL WAS PROVIDED  
    if(url) {  
 
	    //SET URL FOR YAHOO YQL QUERY
	    var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + url + '"') + '&format=xml&callback=?';  
 
 		// Not async call
		$.ajaxSetup({ async: false }); 
		//MAKE YAHOO YQL QUERY  
	   	$.getJSON(yql,function(data) {
 
			//BUILD CALLBACK FUNCTION
			if(typeof callback === 'function') {  
			    callback(data.results[0]);  
			}  
 
		//WRITES ERROR TO LOG	
	    }).error(function(jqXHR, textStatus, errorThrown) { 
	    	console.log(errorThrown); }
	    );
 
  	//LOG ERROR IF NO URL WAS PASSED TO THE SCRIPT
  	} else {
  		 console.log('No site was passed to the script.'); 
  	}
 
}


function loadSingleStringFunction(myUrl) {  
 
    //CONFIRM A URL WAS PROVIDED  
    if(myUrl) {  
 
	    //SET URL FOR YAHOO YQL QUERY
	    var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + myUrl + '" and xpath="/html/body/p/text()"') + '&format=json';  
 
 		var data = $.ajax({
         		url: yql, 
         		async: false, 
         		dataType: 'json'
        		}
    		).responseText;
		
		if (data){
			var obj = $.parseJSON(data);
			// Only one result from values
			var result = obj.query.results;
		}
		
 
  	//LOG ERROR IF NO URL WAS PASSED TO THE SCRIPT
  	} else {
  		 console.log('No site was passed to the script.'); 
  	}
 	return result;
}

function getFromUrl(myUrl) {  
 
    //CONFIRM A URL WAS PROVIDED  
    if(myUrl) {  
 
	    //SET URL FOR YAHOO YQL QUERY
	    //var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + myUrl + '" and xpath="/html/body/p/text()"') + '&format=json';  
 
 		var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + myUrl + '"') + '&format=xml';
 
 		var data = $.ajax({
         		url: yql, 
         		async: false, 
         		dataType: 'xml'
        		}
    		).responseText;
		
		if (data){
			// Get results using response text (XML format)
			results = $(data).find('results');
		} 
		
 
  	//LOG ERROR IF NO URL WAS PASSED TO THE SCRIPT
  	} else {
  		 console.log('No site was passed to the script.'); 
  	}
 	return results;
}*/

/********************************************************************************
Added import org.apache.cxf.rs.security.cors.CrossOriginResourceSharingFilter;
to REST services in an RLAB system
********************************************************************************/  
function getFromUrlDirect(url_rest,data_type){
	if(typeof(data_type)==='undefined'){
		 data_type = 'xml';
	}
	// No async
	var data = $.ajax({
				type: "GET",
         		url: url_rest, 
				async: false, 
				contentType: "application/" + data_type,
         		dataType: data_type
        		}
    		);
	var content = data.responseText;
	return content;
}

function postToUrlDirect(url_rest, data, data_type){
	if(typeof(data_type)==='undefined'){
		 data_type = 'xml';
		 content_type = "application/xml";
	}
	// No async
	var post_data = $.ajax({
				type: "POST",
         		url: url_rest,
				data: data, 
         		async: false, 
				contentType: "application/" + data_type,
         		dataType: data_type
        		}
    		);
	var content = post_data.responseText;
	return content;
}

/*****************************************************************************
XML FUNCTIONS FOR BUILD RLAB DATA FROM XML
*****************************************************************************/
/********************************************************************************
BUILD AN RLAB VARIABLE FROM XML
*********************************************************************************/
function buildVar(xml){
	value_v = xml.find("value").text();
	time_v = xml.find("time").text();
	description_v = xml.find("description").text();
	lastUpdateTime_v = xml.find("lastUpdateTime").text();
	logging_v = xml.find("logging").text();
	moduleName_v = xml.find("moduleName").text();
	name_v = xml.find("name").text();
	systemName_v = xml.find("SystemName").text();
	type_v = xml.find("type").text();
	maxRange_v = xml.find("maxRange").text();
	minRange_v = xml.find("minRange").text();
	units_v = xml.find("units").text();
	var str = xml.find("interactive").text();
	interactive_v = str.toLowerCase() == 'true';
	var variable = { name: name_v,
					 value: value_v,
					 description: description_v,
					 maxRange : maxRange_v,
					 minRange: minRange_v,
					 units: units_v,
					 time: time_v,
					 lastUpdateTime: lastUpdateTime_v,
					 type: type_v,
					 moduleName: moduleName_v,
					 systemName: systemName_v,
					 interactive: interactive_v};
	return variable;
}

function buildGraphsInfoFromXML(graphs_info_xml){
	var graphs_info = null;
	xmlDoc = $.parseXML( graphs_info_xml );
    $xml = $( xmlDoc );
    $graphs = $xml.find( "rlabGraphInfos" );
	
	if ($graphs!=null){
		graphs_info = new Array();
		// Iterate finding <rlabGraphInfo> tag
		infos = $graphs.find("rlabGraphInfo");
		for (var i = 0; i < infos.length; i++) {
    		var info = infos[i];
    		module = $(info).find("module").text();
			system = $(info).find("system").text();
			colors = $(info).find("colors");
			array_colors = new Array();
			$(colors).find("item").each(function(){
				array_colors.push( $(this).text() );
			});
			// names
			names = $(info).find("names");
			array_names = new Array();
			$(names).find("item").each(function(){
				array_names.push( $(this).text() );
			});
			// Create array for graph info
			info_array = new Array();
			info_array['module'] = module;
			info_array['system'] = system;
			info_array['names'] = array_names;
			info_array['colors'] = array_colors;
			// add to graphs_array
			graphs_info.push(info_array);
		}
	}
	
	return graphs_info;
}

function buildGraphsInfoFromJSON(graphs_info_json){
	var graphs_info = null;
	if (graphs_info_json == null){
		return graphs_info;
	}
	
	json_object = JSON.parse(graphs_info_json);
	infos = json_object.rlabGraphInfos.rlabGraphInfo;
	
	if (infos!=null){
		graphs_info = new Array();
		// Check if is not array
		if (!$.isArray(infos)){
			if (typeof infos == "object"){
				infos = [infos];
			} else if (typeof infos == "undefined"){
				return null;
			}
		}
		for (var i = 0; i < infos.length; i++) {
    		var info = infos[i];
    		module = info.module;
			system = info.system;
			colors = info.colors.item;
			// Check if has only one item
			if (!$.isArray(colors)){
				value = colors;
				colors = new Array();
				colors.push(value);
			}
			names = info.names.item;
			// Check if has only one item
			if (!$.isArray(names)){
				value = names;
				names = new Array();
				names.push(value);
			}
			// Create array for graph info
			info_array = new Array();
			info_array['module'] = module;
			info_array['system'] = system;
			info_array['names'] = names;
			info_array['colors'] = colors;
			// add to graphs_array
			graphs_info.push(info_array);
		}
	}
	
	return graphs_info;
}

function getRemoteLab(system_name){
	// System format //host:rmi_port/ID
	substrings = system_name.split("/");
	remote_id = substrings[substrings.length-1]; 
	remote_lab_info = getSystemInfo(remote_id);
	remote_lab = null;
	if (remote_lab_info!=null){
		remote_port = remote_lab_info.rest_port;
		remote_host = remote_lab_info.IP;
		remote_lab = new Lab(remote_host,remote_port,remote_id);
	}
	return remote_lab;
}