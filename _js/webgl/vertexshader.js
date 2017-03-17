
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


var vertexShader = `

attribute vec2 coordinates;

varying vec2 texCoord;

void main(void){
	
	texCoord = (coordinates/2.0 + 0.5);
	texCoord.y = 1.0 - texCoord.y;
	
	gl_Position = vec4(coordinates, 1.0, 1.0);

}

`;
