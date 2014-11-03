"use strict";

( function ( window ) {

	var Slider = window.Slider,

		ColorPicker;

	ColorPicker = function ( element ) {

		this.element = element;
		this._callback = null;

		this.inflate();

	};

	ColorPicker.prototype = {

		inflate: function () {

			var element, wrapper;

			this.element.classList.add( 'color-picker' );

			wrapper = document.createElement( 'div' );
			wrapper.classList.add( 'wrapper' );
			this.element.appendChild( wrapper );

			element = document.createElement( 'div' );
			element.classList.add( 'slider-red' );
			wrapper.appendChild( element );
			this.rPicker = new Slider( element, 0, 255, 1 );
			this.rPicker.on( 'change', this.update.bind( this ) );

			element = document.createElement( 'div' );
			element.classList.add( 'slider-green' );
			wrapper.appendChild( element );
			this.gPicker = new Slider( element, 0, 255, 1 );
			this.gPicker.on( 'change', this.update.bind( this ) );

			element = document.createElement( 'div' );
			element.classList.add( 'slider-blue' );
			wrapper.appendChild( element );
			this.bPicker = new Slider( element, 0, 255, 1 );
			this.bPicker.on( 'change', this.update.bind( this ) );

		},

		getColor: function () {

			return '#' +
				ColorPicker.intToHex( this.rPicker.getValue() ) +
				ColorPicker.intToHex( this.gPicker.getValue() ) +
				ColorPicker.intToHex( this.bPicker.getValue() );

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

		update: function () {

			if ( this._callback )
			{
				this._callback( this.getColor() );
			}

		}

	};

	ColorPicker.intToHex = function (i) {

		var hex = i.toString(16);
		return hex.length === 1 ? '0' + hex : hex; 

	};

	window.ColorPicker = ColorPicker;

} )( window );