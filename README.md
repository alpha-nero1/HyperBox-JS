# HyperBox-JS 📦 🚀 ✅ ⚡️ ⚡️ ⚡️

HyperBox-JS is a simple alternative to Angular, React and Vue. They are the inspiration for this project.

Despite the name hyperbox is written in TypeScript!

You can easily get started by installing the CLI:
- `npm i -g hyperbox-js-cli`
Then using the CLI you can spin up your own HyperBox-JS project with:
- `hpx create <app name>`

&nbsp;

## Links
- Link to hyperbox-js-cli: https://www.npmjs.com/package/hyperbox-js-cli
- Link to code repository: https://github.com/alpha-nero1/HyperBox-JS

&nbsp;

# Box 📦

## Really, what is it?

So what is a Box? A box in JS is effectively a building block to your application. A box may render and manage a navbar or a special text input or a table or, anything, really.

They allow us to nicely bundle and package our application logic and markup into manageable little peices that are repeatable, maintainable and highly configurable. It is up to you how to leverage their full potential.

So, what does a box look like.

As of the current alpha version of HyperBox-JS, A simple box looks like this:

```
export class ExampleBox extends Box {

  static _BoxConfig = {
    name: 'example-box'
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
    <example-box>
      <!-- You will see markup you specified in display function end up here!  -->
    </example-box>
  </div>
```

The convention here is to suffix the names with `box` but you could always get away with not doing so (but why would you 😉))

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

Here is where configurability comes in to play. The `_BoxInterface` allows us to specify 3 key things:
1. The inputs of the box.
2. The vars inside the box where change detection is important.
3. The outputs of the box.


```

class ExampleBox extends Box {

  static _BoxConfig = {
    name: 'example-box',
    styleSheetPath: './app/example/example.box.css'
  }

  static _BoxInterface = {
    Inputs: {
      name: 'Default value...',
      boxClass: 'spin-clockwise'
    },  
    Vars: {
      isTurnedOn: false
    },
    Outputs: {
      onFirstSpin: null
    }
  }

  ...
}

```

For our three examples this is what HyperBoxCore does to a box that would specify such an interface:
1. Create getters and setters for the `Inputs`. e.g. `getName()`, `setName()`, `getBoxClass()`, `setBoxClass()`.
2. Create getters and setters for the `Vars`. e.g. `getIsTurnedOn()` and `setIsTurnedOn()`.
3. Create output dispatch  and listener functions on the box e.g. `dispatchOnFirstSpin()`, `addOnFirstSpinListener()` and `removeOnFirstSpinListener()`.
- NOTE: 
  - functions prefixed with `dispatch` will let parent boxes know of the event.
  - add and remove listener functions can be used if you get programmatic access to the box.


Example use of the declared box:
```
<example-box 
  name="Ashoka Tano" 
  boxClass="show-dual-weilding-sabers"
  [onFirstSpin]="exampleBoxOnFirstSpin()"
></example-box>
```

Those properties will then be available on the instance and the box can react accordingly.


## Navigation

To implement navigation inside HyperBox-JS use the NavigatorBox core box that comes stock with HyperBox-JS.
To use the navigator box and have easy navigation in your app here are the steps:
  1. Implement the markup.

  ```
    <navigator-box navigationController="${this._boxId}"></navigator-box>
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

# Box Clusters
What is a box cluster? A box cluster is a class that allows us to register the boxes we make so that they are available in the DOM. They provide us a way to group boxes together.

## So how can I use them?
Once you start up your project you will have a good example of how it is used.
You should see something of the like in your `src/index.js`:

&nbsp;

```
import { BoxCluster } from 'hyperbox-js';
import { HyperBoxCore } from 'hyperbox-js';
import { MainBox } from './main/main.box';

// Create your first cluster...
const cluster = new BoxCluster([
  MainBox
])
// Initialise the application...
HyperBoxCore.Init();
```

&nbsp;

As you can see, all you need to do is provide a BoxCluster that you create with an array of `Box` classes and you can start using those boxes in your applications markup! 🚀
