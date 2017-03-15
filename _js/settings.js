
var settings = {
	 tab: "simulate"
	,mode: "protan"
	,protanIntensity: 1
	,deutanIntensity: 1
	,tritanIntensity: 1
	,monoIntensity: 1
	,tool: "highlight"
	,highlightColor: "red"
}

var controls = new Controls(settings);

function Controls(presets){

	var inputs = {
		 tab: {
			 type: "radio"
			,elements: [
				 document.getElementById("simTab")
				,document.getElementById("supportTab")
			]
			,value: presets.tab
			,update: function(e){
				for(var i in this.elements){
					if(this.elements.hasOwnProperty(i)){
						if(this.elements[i].checked){
							this.value = this.elements[i].value;
						}
					}
				}
				console.log(this.value);
				apply();
			}
		}
		,mode: {
			elements: [
				 document.getElementById("c-simulateMode")
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
		,highlightColor: {
			 type: "radio"
			,elements: [
				 document.getElementById("hlRed")
				,document.getElementById("hlGreen")
				,document.getElementById("hlBlue")
				,document.getElementById("hlYellow")
			]
			,value: presets.highlightColor
			,update: function(e){
				for(var i in this.elements){
					if(this.elements.hasOwnProperty(i)){
						if(this.elements[i].checked){
							this.value = this.elements[i].value;
						}
					}
				}
				console.log(this.value);
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
						if(input.type == "radio"){
							if(input.elements[e].value == input.value){
								input.elements[e].checked = true;
							} else {
								input.elements[e].checked = false;
							}
							input.elements[e].onclick = input.update.bind(input);
						} else {
							input.elements[e].value = input.value;
							input.elements[e].checked = input.value;
							input.elements[e].oninput = input.update.bind(input);
							//input.elements[e].onclick = input.update.bind(input);
						}
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



