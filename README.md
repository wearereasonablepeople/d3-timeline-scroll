# D3 timeline scroll

A useful infinite scroll timeline built using D3. 

---

## Table of Contents

- [Installation](#installation)
  - [Using NPM](#using-npm)
- [Usage](#usage)
  - [General Usage](#general-usage)
  - [Using with Angular](#using-with-angular)
  - [Using with React](#using-with-react)
  
---


## Installation
#### Using NPM

In the same directory where your `package.json` is:

- Run `npm install d3-timeline-scroll --save`


---


## Usage
### General Usage

```javascript
const el = document.getElementById('#graph');

const instace = d3Timeline(el, {
  onScroll: function(e){
    console.log(e); //current selected date
  }
});
```

### Using with Angular
```javascript
 //TODO:
```

### Using with React
```javascript
 //TODO:
```

---

