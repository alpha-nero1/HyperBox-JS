# HyperBox-JS 📦 🚀 ✅ ⚡️ ⚡️ ⚡️

HyperBox-JS is a simple alternative to Angular, React and Vue. They are the inspiration for this project.

Link to hyperbox-js-cli: https://www.npmjs.com/package/hyperbox-js-cli
Link to code repository: https://github.com/alpha-nero1/HyperBox-JS

# Box 📦

## Really, what is it?

So what is a Box? A box in JS is effectively a building block to your application. A box may render and manage a navbar or a special text input or a table or, anything, really.

They allow us to nicely bundle and package our application logic and markup into manageable little peices that are repeatable, maintainable and highly configurable. It is up to you how to leverage their full potential.

So, what does a box look like.

As of the current alpha version of HyperBox-JS, A simple box looks like this:

```
class ExampleBox extends Box {

  static _BoxConfig = {
    name: 'ExampleBox'
  }

  constructor() {
    super();
  }

  boxOnDisplayed = () => {
    // Execute logic here after the box has completed the first display.
  }

  display = (context) => {
    return `
      <div>
        <h1>Hello world!</h1>
      </div>
    `;
  }
}
```

&nbsp;

A box is simply a class that inherits from the `Box` superclass. Fundamentally the box requires two things; the `display` function that returns markup that it should render (if not included will not produce any inner HTML) and the static `_BoxConfig`.

&nbsp;

## The _BoxConfig

The _BoxConfig tells BoxCore how creation of the box should be configured. what you MUST provide is the `name` attribute, this lets you use the box in the DOM, so in our case we could then use

```
  <div>
    <ExampleBox>
      <!-- You will see markup you specified in display function end up here!  -->
    </ExampleBox>
  </div>
```

The convention here is to suffix the names with `Box` but you could always get away with not doing so (but why would you ;))

&nbsp;

Aditionally, we can also specify a `styleSheetPath` like:

```
  static _BoxConfig = {
    name: 'ExampleBox',
    styleSheetPath: './app/example/example.box.css'
  }
```

Which will load css that you would like to associate with that box.

&nbsp;

## The _BoxInterface

Here is where configurability comes in to play. If we would like to configure our ExampleBox to take and store a variable that we would like to then act upon, we could specify the `_BoxInterface` like so:

```

class ExampleBox extends Box {

  static _BoxConfig = {
    name: 'ExampleBox',
    styleSheetPath: './app/example/example.box.css'
  }

  static _BoxInterface = {
    Inputs: {
      name: 'Default value...',
      boxClass: 'spin-clockwise'
    },
    Outputs: {
      onFirstSpin: null
    }
  }

  ...
}

```

The _BoxInterface allows for several things, firstly when detected on a `Box`, `BoxCore` creates and builds corresponding setters and getters for those variables, so, on an instance of ExampleBox we now would have methods `getName()`, `setName()`, `getBoxClass()` and `setBoxClass()` available to us. This allows us to change values on the box (or get) and also run change detection meaning a value change for name from 'Perry' to 'Platipus' would be seen in the DOM.

Another thing the box interface enables is the **interface** of variables settable from the DOM. with our example interface we could then go into the markup of some box and specify an `<box-example>` like so:


```
<ExampleBox name="Ashoka Tano" boxClass="show-dual-weilding-sabers"></ExampleBox>
```

Those properties will then be available on the instance and the box can react accordingly.


## Navigation

To implement navigation inside HyperBox-JS use the NavigatorBox core box that comes stock with HyperBox-JS.
To use the navigator box and have easy navigation in your app here are the steps:
  1. Implement the markup.

  ```
    <NavigatorBox navigationController="${this._boxId}"></NavigatorBox>
  ```

  The box navigator requires that you specify the `navigationController` this is simply the current `_boxId` of the parent controller.

  2. Implement the `navigatorBoxOnReady` callback on your box. Save the instance in this callback and you must also set the routes using the `setRoutes` function.

  ```
  class MainBox extends Box {
    ...
    navigatorBoxOnReady = (navigator) => {
      this.boxNavigator = navigator;
      this.boxNavigator.setRoutes({
        '': { boxClassName: 'MainBox' },
        'animation': { boxClassName: 'AnimationBox' }
      })
    }
    ...
  }
  ```

  3. Use the `gotoRoute` API on the `NavigatorBox` to navigate to the different routes. The function can be called as such:

  ```
  goToSecondRoute() {
    this.boxNavigator.gotoRoute('animation', { name: 'Alessandro' })
  }
  ```

  @param route = the string that identifies the route to go to.
  @param opts = the properties (and by extension, values) that have setters on the box navigating to. Those setters are executed storing the value in the desired box.
