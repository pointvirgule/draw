"use strict";

describe( 'Draggable:', function () {
	
	var Draggable = window.DraggableObject;

	it( 'A draggable object can be instanciable', function () {

		var draggable = new Draggable( document.createElement( 'div' ) );

		expect( draggable ).not.toBeUndefined();

	} );


	// it( 'A draggable can move inside its container', function () {

	// 	var body = window.document.getElementsByTagName( 'body' )[0],

	// 		container = document.createElement( 'div' ),

	// 		el = document.createElement( 'div' ),

	// 		draggable = new Draggable( el );

	// 	body.appendChild( container );
	// 	//container.classList.add( 'container' );
	// 	container.setAttribute( 'style', 'position: relative; height: 500px; width:1000px;' );
	// 	el.setAttribute( 'style', 'position: absolute; height: 250px; width:500px;' );
	// 	container.appendChild( el );

	// 	var bounds = draggable.element.getBoundingClientRect();

	// 	spyOn( draggable, 'setAbsolutePosition' );

	// 	var e = {
 //    bubbles: true,
 //    cancelable: true,
 //    view: window,
 //    detail: 0,
 //    screenX: 0, 
 //    screenY: 0,
 //    clientX: bounds.left, 
 //    clientY: bounds.top,
 //    ctrlKey: false,
 //    altKey: false,
 //    shiftKey: false,
 //    metaKey: false,
 //    button: 0,
 //    relatedTarget: undefined
 //  };
	// 	var event = document.createEvent("MouseEvents");

	// event.initMouseEvent('mousedown', 
 //      e.bubbles, e.cancelable, e.view, e.detail,
 //      e.screenX, e.screenY, e.clientX, e.clientY,
 //      e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
 //      e.button, document.body.parentNode);

	// 	el.dispatchEvent( event );

	// 	expect( draggable.setAbsolutePosition ).toHaveBeenCalled();
	// 	expect( draggable.position.x ).toEqual( 100 );
	// 	expect( draggable.position.y ).toEqual( 500 );


	// } );


} );