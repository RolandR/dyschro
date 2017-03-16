var settingsTabs = new Tabs("settingsTabs");

function Tabs(tabsContainerId){
	var container = document.getElementById(tabsContainerId);
	var radios = container.children[0].getElementsByTagName('input');
	var tabBodies = container.children[1].children;

	var activeTab = "";

	init();

	function update(){
		
		for(var i in radios){
			if(radios.hasOwnProperty(i)){
				if(radios[i].checked){
					activeTab = radios[i].value;
				}
			}
		}
		for(var i in tabBodies){
			if(tabBodies.hasOwnProperty(i)){
				if(tabBodies[i].id == activeTab+"TabContent"){
					tabBodies[i].style.display = "flex";
				} else {
					tabBodies[i].style.display = "none";
				}
			}
		}
	}

	function init(){
		for(var i in radios){
			if(radios.hasOwnProperty(i)){
				console.log(radios[i]);
				radios[i].addEventListener('click', update);
			}
		}
		update();
	}
}