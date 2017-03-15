
var settings = {
	 mode: "protan"
	,protanIntensity: 1
	,deutanIntensity: 1
	,tritanIntensity: 1
	,monoIntensity: 1
	,tool: "highlight"
	,highlightColor: 0
}

var controls = new Controls(settings);

function Controls(presets){

	var inputs = {
		 mode: {
			elements: [
				 document.getElementById("c-simulateMode")
				,document.getElementById("c-supportMode")
			]
			,value: presets.mode
			,update: function(e){
				this.value = e.target.value;
				switchSimulationSettings(e);
				apply();
			}
		}
		,protanIntensity: {
			elements: [
				 document.getElementById("c-protanIntensity")
			]
			,value: presets.protanIntensity
			,update: function(e){
				this.value = e.target.value;
				apply();
			}
		}
		,deutanIntensity: {
			elements: [
				 document.getElementById("c-deutanIntensity")
			]
			,value: presets.deutanIntensity
			,update: function(e){
				this.value = e.target.value;
				apply();
			}
		}
		,tritanIntensity: {
			elements: [
				 document.getElementById("c-tritanIntensity")
			]
			,value: presets.tritanIntensity
			,update: function(e){
				this.value = e.target.value;
				apply();
			}
		}
		,monoIntensity: {
			elements: [
				 document.getElementById("c-coneMonochromacyIntensity")
			]
			,value: presets.monoIntensity
			,update: function(e){
				this.value = e.target.value;
				apply();
			}
		}
		
		,tool: {
			elements: [
				 document.getElementById("c-toolSelect")
			]
			,value: presets.tool
			,update: function(e){
				this.value = e.target.value;
				switchTool(e);
				apply();
			}
		}
	}
	
	function init(){
		var input;
		for(var i in inputs){
			if(inputs.hasOwnProperty(i)){
				input = inputs[i];
				
				for(var e in input.elements){
					if(input.elements[e]){
						input.elements[e].value = input.value;
						input.elements[e].checked = input.value;
						input.elements[e].oninput = input.update.bind(input);
						//input.elements[e].onclick = input.update.bind(input);
					}
				}
			}
		}
	}
	
	init();
	
	function apply(){
		var newConfig = {};
		for(var i in inputs){
			if(inputs.hasOwnProperty(i)){
				newConfig[i] = inputs[i].value;
			}
		}
		settings = newConfig;
		renderer.render(newConfig);
	}
}


function switchSimulationSettings(e){
	var settingsContainers = document.getElementById("simTabContent").getElementsByClassName("settingsBox");
	for(var i in settingsContainers){
		if(settingsContainers.hasOwnProperty(i)){
			settingsContainers[i].style.display = "none";
		}
	}

	var showElement = document.getElementById(e.target.value + "Settings");
	if(showElement){
		showElement.style.display = "inline-block";
	}
}

function switchTool(e){
	var settingsContainers = document.getElementById("supportTabContent").getElementsByClassName("settingsBox");
	for(var i in settingsContainers){
		if(settingsContainers.hasOwnProperty(i)){
			settingsContainers[i].style.display = "none";
		}
	}

	var showElement = document.getElementById(e.target.value + "Settings");
	if(showElement){
		showElement.style.display = "inline-block";
	}
}



