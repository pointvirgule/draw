'use strict';

( function ( window ) {
	
	var DraggableObject = window.DraggableObject,
		body = window.document.getElementsByTagName( 'body' )[0];

	new DraggableObject( window.document.getElementById( 'parent-rect' ), true );
	new DraggableObject( window.document.getElementById( 'child-rect' ), true );

	/*
	*	Prevent overscroll on iOS 
	*/
	window.document.addEventListener( 'touchmove', function (e) {

		e.preventDefault();

	} );

} )( window );