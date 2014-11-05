# Draw [![Build Status](https://travis-ci.org/pointvirgule/draw.png?branch=master)](https://travis-ci.org/pointvirgule/draw)

# Draggable Object

## Constructor

To make an `DOMElement` draggable, you can call the `DraggableObject` constructor.

```js

new DraggableObject( document.getElementById( 'my-draggable-object' ), false );

```
A `draggable` class will automatically be set on the specified element.

## Behaviour

You will be able to drag around your object. You need to take care about how you position your object in the dom. You can set boundaries the dragging object by setting a `container` class to one of its parents. 

```html

<div class="container">

	<div id="my-draggable-object">

</div>

```

It doesn't need to be its direct parent but keep in mind that the draggable object is positionned in an absolute manner, so don't put  `relative` positionned object nested between your `draggable and your `container`.

## Nested draggable objects

You can create nested draggable objects, remember that the boundaries will be set by the closest `container` parent.

```html

<div id="my-top-container" class="container">

	<div id="my-draggable-object">

		<div id="my-child-container" class="container">

			<div id="my-child-draggable-object"></div>			

		</div>

	</div>

</div>

```

## Tweakable

The `DraggableObject` contructor takes an extra `boolean` parameter. Setting this parameter to `true` will add a slider to the object when selected. This slider enables the user to adjust the `border-radius` of the object.

```js

new DraggableObject( document.getElementById( 'my-draggable-object' ), true );

```


# Slider

## Use

Make sure you include the `polyfills.js` content somewhere in your web app.

### Constructor

You can create a new instance of the slider via the constructor `Slider`.

```js
var element = document.createElement( 'div' ),

	minValue = 0,

	maxValue = 100,

	step = 5,

	slider = new Slider( element, minValue, maxValue, step );
```

### Listen to changes

You can listen to user interactions by listening the `change` event.

```js
slider.on( 'change', function ( value ) {
	
	/*
	*	On a change event your callback function
	*	will provide you with the new slider value.
	*/

} );
```

### Make changes 

You can also set and get the value of the slider by the following methods.

```js
// Sets the value of the slider.
slider.setValue( 70 );

// Returns the current value of the slider.
slider.getValue(); 
```

You can also set and get the percentage of the range of you slider

```js
// Sets the percentage of the slider.
slider.setPercentage( 70 );

// Returns the current percentage of the slider.
slider.getPercentage(); 
```

## Style

You can change the appearance of the slider by tweaking some variables defined in the `styles/slider.less`.

Just import the stylesheet and override some variables

```less
@import (less) 'slider.less';

@slider_color: #333;
@slider_cursor_size: 10px;
@slider_cursor_border_size: 3px;
@slider_cursor_border_color: #FFF;
@slider_line_height: 2px;

```

## Extend

To extend the slider, install the dev environment runnning
```bash
npm install
```

Then run the grunt `watch` task that will compile your `less` and check your js files.
```bash
grunt watch
```

To run the unit tests, just run 
```bash
npm test
``` 

