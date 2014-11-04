'use strict';

( function ( window ) {
	
	var ColorPicker = window.ColorPicker,
		DraggableObject = window.DraggableObject,

		picker = new ColorPicker( window.document.getElementById( 'color-picker' ) ),
		body = window.document.getElementsByTagName( 'body' )[0];

	picker.on( 'change', function ( color ) {

		body.setAttribute( 'style', 'background:' + color + ';' );

	} );

	new DraggableObject( window.document.getElementById( 'parent-rect' ) );
	new DraggableObject( window.document.getElementById( 'child-rect' ) );

	/*
	*	Prevent overscroll on iOS 
	*/
	window.document.addEventListener( 'touchmove', function (e) {

		e.preventDefault();

	} );

} )( window );