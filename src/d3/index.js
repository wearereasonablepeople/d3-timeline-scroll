'use strict';

function d3ScrollableTimeline(element, options, d3 = window.d3) {
  const _d3 = d3;

  function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function () {
      var context = scope || this;

      var now = +new Date,
          args = arguments;
      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  }

  //default options
  const _default = {
    autoresize: true,
    startdate: new Date(),
    events: [],
    lineheight: 60,
    onscroll: () => {}
  };
  //svg vars
  let x, svg, axis, ticks, group, zoom, center;
  const self = this;
  this.options = Object.assign(_default, options);

  const getWidth = () => element.parentNode.offsetWidth;

  const generateLineTicks = function(startDate, endDate) {

    const ticksLines = [];
    const iterate = new Date(startDate);
    while (iterate.getTime() < endDate.getTime()) {
      const tD = new Date(iterate);
      const tick = new Date(tD.getFullYear(), tD.getMonth(), 1);
      tick.setDate(tick.getDate() + 15);
      ticksLines.push(tick);
      iterate.setMonth(iterate.getMonth() + 1);
    }
    return ticksLines;
  };

  const onZoom = throttle(() => {

    svg.select('.axis').call(axis);
    svg.select('.ticks').call(ticks);
    svg.selectAll('.indicator').attr({
      x1: d => x(d.start),
      x2: d => x(d.end),
    });
    const startDate = new Date(x.domain()[0]);

    const d = new Date(startDate.setMonth(startDate.getMonth() + 6));
    self.options.onscroll(d);
  }, 50);

  //init timeline with defaut values
  const initTimeline = (startCounter = new Date()) => {

    //init
    const width = 500, height = 200;

    const startDate = new Date(startCounter);
    const endDate = new Date(startCounter);
    startDate.setMonth(startDate.getMonth() - 4);
    endDate.setMonth(endDate.getMonth() + 4);
    

    var svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgEl.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
    element.appendChild(svgEl);
    svg = _d3.select(svgEl);

    //setup scale
    x = _d3.time.scale()
      .domain([startDate, endDate])
      .range([0, width]);

    zoom = _d3.behavior.zoom()
      .x(x)
      .scaleExtent([1, 1])
      .on('zoom', onZoom);

    //our main group
    group = svg.attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(0, 70)');

    //axis + ticks
    axis = _d3.svg.axis()
      .scale(x)
      .ticks(_d3.time.months, 1)
      .tickFormat(_d3.time.format('%b'))
      .tickPadding(10)
      .tickSize(8, 0)
      .orient('top');

    ticks = _d3.svg.axis()
      .scale(x)
      .ticks(generateLineTicks)
      .tickSize(25, 0)
      .orient('top');

    center = group.append('line')
      .attr('x1', width / 2)
      .attr('x2', width / 2)
      .attr('y1', -60)
      .attr('y2', height + 20)
      .attr('class', 'center');

    group.append('g')
      .attr('class', 'ticks')
      .call(ticks);

    group.append('g')
      .attr('class', 'axis')
      .call(axis);

    svg.call(zoom);

    //remove wheel listener
    svg.on('DOMMouseScroll.zoom', null)
      .on('wheel.zoom', null)
      .on('mousewheel.zoom', null);
  };

  const rescale = () => {
    const w = getWidth();
    //make scale responsive
    let divider = 6;

    //phone
    if (w <= 320) {
      divider = 2;
    }
    //tablets
    if (w > 320 && w <= 768) {
      divider = 3;
    }
    //smaller screens
    if (w > 768 && w <= 1024) {
      divider = 4;
    }

    //rescale domain
    const startDate = self.options.startdate ? new Date(self.options.startdate) : new Date();
    const endDate = self.options.startdate ? new Date(self.options.startdate) : new Date();
    startDate.setMonth(startDate.getMonth() - divider);
    endDate.setMonth(endDate.getMonth() + divider);
    x.domain([startDate, endDate]).range([0, w]);

    svg.attr('width', w);
    zoom.x(x);
    center
      .attr('x1', w / 2)
      .attr('x2', w / 2);

    //rescale elements
    svg.select('.axis').transition().call(axis);
    svg.select('.ticks').transition().call(ticks);
    svg.selectAll('.line').attr('x2', w);
    svg.selectAll('.indicator').transition()
      .attr('x1', d => x(d.start))
      .attr('x2', d => x(d.end));
  };

  // remove listeners and instance
  const destroy = () => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    if(self.options.autoresize) {
      window.removeEventListener('resize', rescale);
    }
  };

  // re-draw with new events
  const update = data => {
    if (!group) {
      return;
    }
    const width = getWidth();
    const category = group.selectAll('.category')
      .data(data)
      
    category.enter()
      .append('g')
      .attr('class', 'category');

    category.exit().remove();

    const height = data.length * self.options.lineheight;
    svg.attr('height', height + 100);
    center.transition()
      .attr('y2', height + 20);

    category.each(function (category, index) {
      const parent = _d3.select(this);

      const line = parent.selectAll('.line').data([category])
      //lines
      line.enter().append('line');
      line.transition().attr('x1', 0)
        .attr('y1', (index * self.options.lineheight) + 30)
        .attr('x2', width)
        .attr('y2', (index * self.options.lineheight) + 30)
        .attr('class', 'line');

      line.exit()
        .transition()
        .attr('x2', 0)
        .remove();

      //label
      const label = parent.selectAll('.label').data([category]);
      
      label.enter().append('text');
      label.transition().attr('class', 'label')
        .attr('x', 30)
        .attr('y', (index * self.options.lineheight) + 60)
        .text(category.label);

      label.exit().remove();

      if (category.items) {
        const ind = parent.selectAll('.indicator').data(category.items)
        ind.enter().append('line')

        ind.transition().attr('class', 'indicator')
          .attr('x1', d => x(d.start))
          .attr('x2', d => x(d.end))
          .attr('y1', (index * self.options.lineheight) + 30)
          .attr('y2', (index * self.options.lineheight) + 30);
        
        ind.exit().remove();
      }
    });
  };

  //start
  initTimeline(this.options.startdate || new Date());
  rescale();
  update(this.options.events);

  if(this.options.autoresize) {
    window.addEventListener('resize', rescale, true);
  }

  return {
    destroy,
    update
  }
}
if(window){
  window.d3ScrollableTimeline = d3ScrollableTimeline;
}
export default d3ScrollableTimeline;