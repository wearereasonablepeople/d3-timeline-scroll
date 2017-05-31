# D3 timeline scroll

A useful infinite scrollable timeline built with D3.


## Table of Contents

- [Demo](#demo)
- [Installation](#installation)
  - [Using NPM](#using-npm)
- [Dependencies](#dependencies)
- [Usage](#usage)
  - [General Usage](#vanilla-javascript)
  - [Styling](#styling)
  - [Using with Angular](#using-with-angular)
  - [Using with React](#using-with-react)
  
---


## Demo
[Demo on JSbin](https://jsbin.com/xewobuz/1/edit?html,output)

## Installation
#### Using NPM

- Run `npm install d3-timeline-scroll --save`

---


## Dependencies
Library depends on [D3](https://d3js.org) in version **3**.

You can pass an instance of d3 as third argument to contructor (By default window.d3 is used)

## Usage
### Vanilla javascript

```javascript
const el = document.getElementById('#graph');

const instace = d3ScrollableTimeline(el, {
  events: [],
  startdate: new Date(),      // centers timeline at date [default: new Date()]
  autoresize: true,           // makes timeline responsive [default: true]
  lineheight: 60,             // height of one category
  onscroll: function(date){
    console.log(date);        // currently centered date
  }
}, d3Instance = window.d3);

//redraw timeline with new set of events;
instance.update([
  {
    label: 'XYZ',
    items: [
      {
        start: new Date('2017-03-16'),
        end: new Date('2017-03-24'),
      },
      {
        start: new Date('2017-07-22'),
        end: new Date('2017-08-18'),
      }
    ]
  }
]);

//destroy instance and remove all listeners
instance.destroy();

```

### Styling

Import css file and add **d3-scrollable-timeline** class
``` html
<link rel="stylesheet" media="all" href="node_modules/d3-scrollable-timeline/lib/style.css" />
<div class="d3-scrollable-timeline" id="timeline"></div>
```

or via

#### Sass
```scss
$d3-scrollable-color: rgba(0,0,0, 0.8); // define color of timeline
@import "node_modules/d3-scrollable-timeline/lib/style.scss"
```


### AngularJS
```javascript
 //TODO:
```

### Using with React
```javascript
 //TODO:
```

---

