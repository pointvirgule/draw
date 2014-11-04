"use strict";

( function ( window ) {

	var Slider = window.Slider,
		Selectable = window.SelectableObject,
		DraggableObject;

	DraggableObject = function ( element, tweakable ) {

		Selectable.call(this, element);

		this.element = element;
		this.element.classList.add( 'draggable' );
		this.attachEventListeners();

		this.tweakable = tweakable || false;

		if (this.tweakable)
		{
			this.radius = 0;
			this.initTweaker();
		}

	};

	DraggableObject.prototype = new Selectable();

	/*
	*	Attach listeners for touch and mouse events
	*/
	DraggableObject.prototype.attachEventListeners = function () {

		var boundOnStart = this.onStart.bind( this );

		this.element.addEventListener( 'mousedown', boundOnStart );
		this.element.addEventListener( 'touchstart', boundOnStart );

		this.element.addEventListener( 'dragstart', this.onDrag );
		
	};

	DraggableObject.prototype.getRelativeCoordinates = function (clientX, clientY) {

		this.bounds = this.element.getBoundingClientRect();

		return { 

			x: clientX - this.bounds.left,
			y: clientY - this.bounds.top

		};

	};


	DraggableObject.prototype.onStart = function (e) {

		this.onMoveListener = this.onMoveListener || this.onMove.bind( this );
		window.addEventListener( 'mousemove', this.onMoveListener );
		window.addEventListener( 'touchmove', this.onMoveListener );

		this.onReleaseListener = this.onReleaseListener || this.onRelease.bind( this );
		window.addEventListener( 'mouseup', this.onReleaseListener );
		window.addEventListener( 'touchend', this.onReleaseListener );
		window.addEventListener( 'touchcancel', this.onReleaseListener );

		this.onMove.call( this, e );

		e.stopPropagation();

	};

		/*
		*	Prevent drag
		*/
	DraggableObject.prototype.onDrag = function (e) {

		e.preventDefault();
		e.stopPropagation();

	};

	DraggableObject.prototype.onMove = function (e) {

		var moveX = 0,
			moveY = 0;

		if ( Object.prototype.toString.call(e) === '[object TouchEvent]' )
		{
			if ( e.touches.length === 1 )
			{
				moveX = e.touches[0].clientX;
				moveY = e.touches[0].clientY;
			}
			else
			{
				// We will see another time for multiple touches !
				return;
			}
		}
		else
		{
			moveX = e.clientX;
			moveY = e.clientY;
		}

		/*
		*	Store our relative coordinates until next move
		*/
		this.rCoords = this.rCoords || this.getRelativeCoordinates( moveX, moveY );

		this.setAbsolutePosition( moveX, moveY );

		e.stopPropagation();

	};

	DraggableObject.prototype.onRelease = function (e) {

		this.bounds = null;
		this.rCoords = null;
		this.container = null;
		this.containerBounds = null;

		window.removeEventListener( 'mousemove', this.onMoveListener );
		window.removeEventListener( 'touchmove', this.onMoveListener );

		window.removeEventListener( 'mouseup', this.onReleaseListener );
		window.removeEventListener( 'touchend', this.onReleaseListener );
		window.removeEventListener( 'touchcancel', this.onReleaseListener );

	};

	/*
	*	Set the object position from a set of 
	*	absolute coordinates, call from our event 
	*	listeners.
	*/
	DraggableObject.prototype.setAbsolutePosition = function ( x, y ) {

		var relX, relY;
		/*
		*	Get bounds for our objects only once
		*/
		this.bounds = this.bounds || this.element.getBoundingClientRect();


		this.container = this.container || DraggableObject.findContainer( this.element );

		if ( this.container === null )
		{
			this.container = window.document.getElementsByTagName( 'body' )[0];
		}

		/*
		*	We can store as well our containers bounds
		*	as it should not change during the current move
		*/
		this.containerBounds = this.containerBounds || this.container.getBoundingClientRect();

		relX = this.rCoords ? this.rCoords.x : 0;
		relY = this.rCoords ? this.rCoords.y : 0;

		this.position = {

			x: Math.min( Math.max( x - ( relX || 0 ) - this.containerBounds.left, 0 ), this.containerBounds.width - this.bounds.width ),
			y: Math.min( Math.max( y - ( relY || 0 ) - this.containerBounds.top, 0 ), this.containerBounds.height - this.bounds.height )

		};

		this.update();

	};

	DraggableObject.prototype.update = function () {

		if ( this._callback )
		{
			this._callback();
		}
		this.onAnimationFrame = this.onAnimationFrame || this.render.bind( this );

		if ( !this.renderId )
		{
			this.renderId = window.requestAnimationFrame( this.onAnimationFrame );
		}

	};

	DraggableObject.prototype.initTweaker = function() {

		var el = document.createElement( 'div' ),
			self = this,
			dimension,
			tweaker;

		el.classList.add( 'radius-controller' );
		this.element.appendChild( el );

		this.bounds = this.bounds || this.element.getBoundingClientRect();
		dimension = Math.round( Math.min( this.bounds.width, this.bounds.height ) * 0.5 );
		el.setAttribute( 'style', 'width:' + dimension + 'px;' );

		tweaker = new Slider( el, 0, dimension, 1 );
		tweaker.setValue(100);
		tweaker.on( 'change', function ( value ) {

			self.radius = dimension - value + 'px';
			self.update();

		} );

	};

	DraggableObject.prototype.render = function() {

		var style = DraggableObject.getTranslate3dStyle( this.position.x, this.position.y ) +
			( this.tweakable ? DraggableObject.getBorderRadiusStyle( this.radius ) : "" );

		this.element.setAttribute( 'style', style );
		this.renderId = null;

	};

	/*
	*	Static methods
	*/
	DraggableObject.findContainer = function ( element ) {

		if ( element.classList.contains( 'container' ) )
		{
			return element;
		}
		else
		{
			if ( element.parentElement !== null )
			{
				return DraggableObject.findContainer( element.parentElement );
			}
			else 
			{
				return null;
			}
		}

	};

	DraggableObject.getTranslate3dStyle = function ( x, y, z ) {

		var coords = (x ? x + 'px' : 0) + ',' + (y ? y + 'px' : 0) + ',' + (z ? z + 'px' : 0);
		
		return "transform: translate3d(" + coords + ");" +
			"-o-transform: translate3d(" + coords + ");" +
    		"-ms-transform: translate3d(" + coords + ");" +
    		"-moz-transform: translate3d(" + coords + ");" +
    		"-webkit-transform: translate3d(" + coords + ");";

	};

	DraggableObject.getBorderRadiusStyle = function ( value ) {

		return "border-radius: " + value + ";" +
			"-moz-border-radius: " + value + ";" +
			"-webkit-border-radius: " + value + ";";

	};

	window.DraggableObject = DraggableObject;

} )( window );