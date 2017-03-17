
/*
	========================================================================

	Color Blindness Tools
	
	A collection of tools for simulating and providing assistance
	with various forms of color vision deficiency.
	
	Copyright (C) 2017 Roland Rytz <roland@draemm.li>
	Licensed under the GNU Affero General Public License Version 3

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as
	published by the Free Software Foundation, either version 3 of the
	License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

	For more information, see:
	https://draemm.li/various/colorVision/license.txt
	
	========================================================================
 */


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
				radios[i].addEventListener('click', update);
			}
		}
		update();
	}
}