"use strict";

( function ( window ) {

	var SelectableObject;

	SelectableObject = function ( element ) {

		if (element)
		{
			this.element = element;
			this.selected = false;

			this.boundOnSelect = this.onSelect.bind( this );
			this.boundOnUnselect = this.onUnselect.bind( this );
			this.element.addEventListener( 'mousedown', this.boundOnSelect );
			this.element.addEventListener( 'touchstart', this.boundOnSelect );
			window.addEventListener( 'select', this.boundOnUnselect, true );
		}	

	};

	SelectableObject.prototype = {


		onSelect: function (e) {

			if ( ! this.selected )
			{
				window.addEventListener( 'mousedown', this.boundOnUnselect );
				window.addEventListener( 'touchstart', this.boundOnUnselect );
				this.selected = true;
				this.updateSelection();

				/*
				*	Dispatch selected event
				*/
				var event = new CustomEvent( 'select', { bubbles: true });
				this.element.dispatchEvent(event);
			}
			e.stopPropagation();

			/*
			*	Prevent mouse events to fire on chrome for android...
			*/
			e.preventDefault();

		},

		onUnselect: function (e) {

			if ( ( e.srcElement || e.originalTarget ) === this.element )
			{
				return;
			}
			window.removeEventListener( 'mousedown', this.boundOnUnselect );
			window.removeEventListener( 'touchstart', this.boundOnUnselect );
			this.selected = false;
			this.updateSelection();

		},

		updateSelection: function () {

			if ( this._callback )
			{
				this._callback();
			}
			this.onBoundRender = this.onBoundRender || this.renderSelection.bind( this );

			if ( !this.renderId )
			{
				this.renderId = window.requestAnimationFrame( this.onBoundRender );
			}

		},

		renderSelection: function() {

			var test = ( this.selected ? 
			this.element.classList.add( 'selected' ) :
			this.element.classList.remove( 'selected' ) );
			this.renderId = null;

		}

	};

	window.SelectableObject = SelectableObject;

} )( window );