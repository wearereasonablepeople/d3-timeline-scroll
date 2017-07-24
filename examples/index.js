const d3 = require('d3');

import Timeline from '../src/index';

document.getElementById('root').innerHTML = `
<div>
  <button id="reset">Reset</button>
  <button id="destroy">Destroy</button>
  <button id="super-pop">Events for super pop</button>
  <button id="super-drop">Events for super drop</button>
</div>
<div class="d3-scrollable-timeline" id="app"></div>
`;

let timeline = null;
const el = document.getElementById('app');

const GangstaPanda = [
  {
    label: 'Gangsta panda',
    items: [
      {
        start: new Date('2016-01-12'),
        end: new Date('2016-02-24'),
      },
      {
        start: new Date('2016-06-05'),
        end: new Date('2016-07-19'),
      },
      {
        start: new Date('2016-08-12'),
        end: new Date('2016-08-11'),
      },
      {
        start: new Date('2016-09-11'),
        end: new Date('2016-09-15'),
      },
      {
        start: new Date('2016-10-11'),
        end: new Date('2016-10-15'),
      },
      {
        start: new Date('2017-01-07'),
        end: new Date('2017-01-19'),
      },
      {
        start: new Date('2017-02-01'),
        end: new Date('2017-02-10'),
      }
    ]
  },
  {
    label: 'Sexy turtle',
    items: [
      {
        start: new Date('2016-01-12'),
        end: new Date('2016-01-16'),
      },
      {
        start: new Date('2016-06-05'),
        end: new Date('2016-06-09'),
        tooltip: 'Dentist 08:30'
      },
      {
        start: new Date('2016-11-15'),
        end: new Date('2016-11-19'),
        tooltip: 'Dentist 14:00'
      },
      {
        start: new Date('2017-02-20'),
        end: new Date('2017-02-25'),
      },

      {
        start: new Date('2017-04-12'),
        end: new Date('2017-04-15'),
      }
    ]
  },
  {
    label: 'Killa gorilla',
    items: [
      {
        start: new Date('2015-12-12'),
        end: new Date('2016-04-01'),
      },
      {
        start: new Date('2016-05-22'),
        end: new Date('2016-06-29'),
      },
      {
        start: new Date('2017-02-07'),
        end: new Date('2017-02-09'),
      },
      {
        start: new Date('2017-03-12'),
        end: new Date('2017-03-15'),
      },
      {
        start: new Date('2017-04-07'),
        end: new Date('2017-04-11'),
      }
    ]
  },
  {
    label: 'So Humble',
    items: [
      {
        start: new Date('2016-03-12'),
        end: new Date('2016-04-24'),
      },
      {
        start: new Date('2016-05-22'),
        end: new Date('2016-06-18'),
      },
      {
        start: new Date('2016-10-06'),
        end: new Date('2016-10-22'),
      },
      {
        start: new Date('2017-02-20'),
        end: new Date('2017-03-01'),
      }
    ]
  },
  {
    label: 'Burning passion',
    items: [
      {
        start: new Date('2016-07-12'),
        end: new Date('2016-08-24'),
      },
      {
        start: new Date('2016-10-22'),
        end: new Date('2016-11-18'),
      },
      {
        start: new Date('2017-01-02'),
        end: new Date('2017-01-22'),
      }
    ]
  }
];

const dogs = [
  {
    label: 'I follow dogs instead of the rules',
    items: [
      {
        start: new Date('2015-07-12'),
        end: new Date('2016-08-24'),
      },
      {
        start: new Date('2017-03-22'),
        end: new Date('2017-08-18'),
      }
    ]
  },
  {
    label: 'Boomskies',
    items: [
      {
        start: new Date('2016-03-16'),
        end: new Date('2016-05-24'),
      },
      {
        start: new Date('2016-07-22'),
        end: new Date('2017-01-18'),
      }
    ]
  }
];

const Adriano = [
  {
    label: 'Adriano Celentano is the man',
    items: [
      {
        start: new Date('2016-02-11'),
        end: new Date('2016-03-16'),
      },
      {
        start: new Date('2015-11-22'),
        end: new Date('2016-02-18'),
      }
    ]
  },
  {
    label: 'You are the body parts of my life',
    items: [
      {
        start: new Date('2016-03-16'),
        end: new Date('2017-05-24'),
      },
      {
        start: new Date('2017-07-22'),
        end: new Date('2017-08-18'),
      }
    ]
  },
  {
    label: 'Damn boooyeee!',
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
];

const destroy = function(){
  if(timeline) {
    timeline.destroy();
    timeline = null;
  }
};

const reset = function(){
  destroy();

  timeline = new Timeline(el, {
    events: GangstaPanda,
    startdate: new Date('2016-06-01 00:00:00'),
    lineheight: 40,
    onscroll: function (e) {
      console.log(e);
    }
  }, d3);

}; reset();

const pop = function() {
  if(timeline) {
    timeline.update(dogs);
  }
};
const drop = function() {
  if(timeline) {
    timeline.update(Adriano);
  }
};

document.getElementById('destroy')
.addEventListener('click', destroy);

document.getElementById('reset')
.addEventListener('click', reset);

document.getElementById('super-pop')
.addEventListener('click', pop);

document.getElementById('super-drop')
.addEventListener('click', drop);
