var fragmentShader = `

precision mediump float;

uniform sampler2D u_image;
varying vec2 texCoord;

uniform int mode;
uniform float intensity;

uniform mat3 colorTransform;

mat3 srgb_to_cie = mat3(
	0.4124564,  0.3575761,  0.1804375,
	0.2126729,  0.7151522,  0.0721750,
	0.0193339,  0.1191920,  0.9503041
);

mat3 cie_to_srgb = mat3(
	 3.2404542, -1.5371385, -0.4985314,
	-0.9692660,  1.8760108,  0.0415560,
	 0.0556434, -0.2040259,  1.0572252
);

mat3 cie_to_lms = mat3(
	 0.7328, 0.4296, -0.1624,
	-0.7036, 1.6975,  0.0061,
	 0.0030, 0.0136,  0.9834
);

mat3 lms_to_cie = mat3(
	1.09612, -0.278869, 0.182745,
	0.454369, 0.473533, 0.0720978,
	-0.00962761, -0.00569803, 1.01533
);

mat3 direct_protan = mat3(
	0.152286,	1.052583,	-0.204868,
	0.114503,	0.786281,	0.099216,
	-0.003882,	-0.048116,	1.051998
);

mat3 direct_deutan = mat3(
	0.367322,	0.860646,	-0.227968,
	0.280085,	0.672501,	0.047413,
	-0.011820,	0.042940,	0.968881
);


mat3 rgb_to_lms = mat3(
	17.8824, 43.5161, 4.11935,
	3.45565, 27.1554, 3.86714,
	0.0299566, 0.184309, 1.46709
);

mat3 lms_to_rgb = mat3(
	0.080944, -0.130504, 0.116721,
	-0.0102485, 0.0540194, -0.113615,
	-0.000365294, -0.00412163, 0.693513
);

mat3 protanope = mat3(
	0.0, 2.02344, -2.52581,
	0.0, 1.0, 0.0,
	0.0, 0.0, 1.0
);

/*mat3 protanope = mat3(
	0.0, 43.5161, 4.11935,
	0.0, 1.0, 0.0,
	0.0, 0.0, 1.0
);*/

mat3 deuteranope = mat3(
	1.0, 0.0, 0.0,
	0.494207, 0.0, 1.24827,
	0.0, 0.0, 1.0
);

void main(void){

	vec3 rgb = texture2D(u_image, texCoord).rgb;
	float a = texture2D(u_image, texCoord).a;

	rgb = pow(rgb, vec3(2.2, 2.2, 2.2));
	rgb = rgb * colorTransform;
	rgb = pow(rgb, vec3(1.0/2.2, 1.0/2.2, 1.0/2.2));
	
	gl_FragColor = vec4(rgb, a);
	
	
	//gl_FragColor = texture2D(u_image, texCoord).rgba - vec4(0.5, 0.5, 0.5, 0.0);
}

`;








































