"use strict";

( function ( window ) {

	var Slider;

	Slider = function ( element, minValue, maxValue, step ) {

		this.element = element;
		this.minValue = minValue;
		this.maxValue = maxValue;

		if ( ( maxValue - minValue ) % step !== 0 )
		{
			throw new Error( 'Range should be divisible by step' );
		}
		this.step = step;

		this.value = minValue;

		this._callback = null;
		this.inflate();

		this.attachEventListeners();		

	};

	Slider.prototype = {

		/*
		*	Attach listeners for touch and mouse events
		*/
		attachEventListeners: function () {

			var boundOnStart = this.onStart.bind( this );

			this.element.addEventListener( 'mousedown', boundOnStart );
			this.element.addEventListener( 'touchstart', boundOnStart );

			this.element.addEventListener( 'dragstart', this.onDrag );
			
		},

		setPercentage: function ( pct ) {

			pct = Math.max( Math.min( pct, 1 ), 0 );			
			this.setValue( ( this.maxValue - this.minValue ) * pct );

		},

		getPercentage: function () {

			return this.pct;

		},

		setValue: function ( value ) {

			value = Math.max( Math.min( value, this.maxValue ), this.minValue );
			value = Math.round( value / this.step ) * this.step;
			this.value = value;
			this.pct = ( value - this.minValue ) / ( this.maxValue - this.minValue );
			this.update();

		},

		getValue: function () {

			return this.value;

		},

		on: function ( event, callback ) {

			var self = this;

			if ( event !== 'change' )
			{
				return;
			}

			this._callback = callback;

			return function () {

				self._callback = null;

			};

		},

		inflate: function () {

			this.element.classList.add( 'slider' );
			this.line = document.createElement( 'div' );
			this.line.classList.add( 'line' );
			this.element.appendChild( this.line );
			this.cursor = document.createElement( 'div' );
			this.cursor.classList.add( 'cursor' );
			this.element.appendChild( this.cursor );

		},

		onStart: function (e) {

			this.onMoveListener = this.onMoveListener || this.onMove.bind( this );
			window.addEventListener( 'mousemove', this.onMoveListener );
			window.addEventListener( 'touchmove', this.onMoveListener );

			this.onReleaseListener = this.onReleaseListener || this.onRelease.bind( this );
			window.addEventListener( 'mouseup', this.onReleaseListener );
			window.addEventListener( 'touchend', this.onReleaseListener );
			window.addEventListener( 'touchcancel', this.onReleaseListener );

			this.onMove.call( this, e );

		},

		/*
		*	Prevent drag
		*/
		onDrag: function (e) {

			e.preventDefault();
			e.stopPropagation();

		},

		onMove: function (e) {

			var bounds = this.element.getBoundingClientRect(),
				moveX = 0;

			if ( Object.prototype.toString.call(e) === '[object TouchEvent]' )
			{
				if ( e.touches.length === 1 )
				{
					moveX = e.touches[0].clientX;
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
			}

			this.setPercentage( ( moveX - bounds.left ) / bounds.width );

		},

		onRelease: function (e) {

			window.removeEventListener( 'mousemove', this.onMoveListener );
			window.removeEventListener( 'touchmove', this.onMoveListener );

			window.removeEventListener( 'mouseup', this.onReleaseListener );
			window.removeEventListener( 'touchend', this.onReleaseListener );
			window.removeEventListener( 'touchcancel', this.onReleaseListener );

		},

		update: function () {

			if ( this._callback )
			{
				this._callback( this.getValue() );
			}
			this.onAnimationFrame = this.onAnimationFrame || this.render.bind( this );

			if ( !this.renderId )
			{
				this.renderId = window.requestAnimationFrame( this.onAnimationFrame );
			}

		},

		render: function() {

			this.cursor.setAttribute( 'style', 'left:' + (this.pct * 100) + '%' );
			this.renderId = null;

		}

	};

	window.Slider = Slider;

} )( window );