"use strict";

describe( 'Slider', function () {

	var Slider = window.Slider;

	it( 'should be instanciable', function () {

		var slider = new Slider( document.createElement( 'div' ), 0, 100, 50 );

		expect(slider).not.toBeUndefined();

	} );

	it( 'value should be changed', function () {

		var slider = new Slider( document.createElement( 'div' ), 0, 100, 1 );

		slider.setValue( 70 );
		expect( slider.getValue() ).toEqual( 70 );
		expect( slider.getPercentage() ).toEqual( 0.70 );

	} );

	it( 'percentage should be changed', function () {

		var slider = new Slider( document.createElement( 'div' ), 0, 100, 1 );

		slider.setPercentage( 0.7 );
		expect( slider.getValue() ).toEqual( 70 );
		expect( slider.getPercentage() ).toEqual( 0.70 );

	} );

	it( 'values should be rouded to step', function () {

		var slider = new Slider( document.createElement( 'div' ), 0, 1.5, 0.5 );

		slider.setValue( 0.4 );
		expect( slider.getValue() ).toEqual( 0.5 );

		slider.setPercentage( 0.15 );
		expect( slider.getValue() ).toEqual( 0 );

	} );


	it( 'should emit events on value change', function () {

		var slider = new Slider( document.createElement( 'div' ), 0, 100, 1 ),
			changedValue = 0;

		slider.on( 'change', function (value) {

			changedValue = value;

		} );

		slider.setValue( 70 );
		expect( changedValue ).toEqual( 70 );

		slider.setPercentage( 0.3 );
		expect( changedValue ).toEqual( 30 );

	} );


	it( 'listener should be detachable', function () {

		var slider = new Slider( document.createElement( 'div' ), 0, 100, 1 ),
			changedValue = 0, 

			listener = slider.on( 'change', function (value) {

				changedValue = value;

			} );

		slider.setValue( 70 );
		expect( changedValue ).toEqual( 70 );

		listener();

		slider.setValue( 30 );
		expect( changedValue ).toEqual( 70 );

	} );

} );
