  
import * as d3 from 'd3';
import numeral from 'numeral';

export default function draw(edfJSON, pool_hash_id, svgRef, width, height, epoch_no, history) {
  let ticker_limit = 5000
  // console.log(edfJSON )

  const delegation_color = '#69db8f';
  const filtered_pools_color = 'rgba(150,150,150,0.3)';

  //positioning and proportions START
  // let width = svg.clientWidth;
  // let height = svg.clientHeight;
  let svg = d3.select(svgRef)
  let minimum_dimension = Math.min(width, height);
  let textRatio = 10 / 180;

  let zoom = 0.65;
  if (width < 700) {
    zoom = 0.90
  }
  let inner_rad = parseInt(((minimum_dimension*zoom)/2.9))
  inner_rad = inner_rad < 200 ? 200 : inner_rad

  let ticker_size = `${parseInt(textRatio*inner_rad)}px`
  let outer_rad = inner_rad + (inner_rad / 10)
  const max_outer_rad_addition = (outer_rad - inner_rad) * 0.5;
  let max_rad = outer_rad + max_outer_rad_addition


  let top_rad = (ph_id) => {
    const biggest_pool_guess = 80000000;
    const rad_addition = (filtered_edfJSON[ph_id].size / biggest_pool_guess) * max_outer_rad_addition;
    return outer_rad + rad_addition
  }
  
  let center_translation_h = width/2;
  let center_translation_v = (height/2);
  //positioning and proportions END

  if (!edfJSON[pool_hash_id]) {
    d3.selectAll(".chart > *").remove()
    svg.append("text")
      .attr("x", center_translation_h - (inner_rad/1.9) )
      .attr("y", center_translation_v - (inner_rad/6) - 35)
      .attr("dy", ".35em")
      .style("fill", "rgba(0,123,255,1)")
      .text(`No new delegations for this Pool`)

    svg.append("text")
      .attr("x", center_translation_h - (inner_rad/1.2) )
      .attr("y", center_translation_v + ((inner_rad/6)) - 25)
      .attr("dy", ".35em")
      .style("fill", "rgba(0,123,255,1)")
      .style("font-size", '1.5em')
      .text(`Press the 'Plot Any Pool' Button`)

    svg.append("circle").attr("cx",center_translation_h).attr("cy",center_translation_v).attr("r",inner_rad)
    .style("fill", "rgba(255,255,255,0.3)");

    svg.append("circle").attr("cx",center_translation_h).attr("cy",center_translation_v).attr("r",inner_rad)
    .style("stroke", "rgba(255,30,30,0.7)")
    .style("fill", "rgba(255,30,30,0.0)");

    return null
  }
  let filtered_edfJSON = {...edfJSON}
  filtered_edfJSON = filterPools(edfJSON, pool_hash_id)

  const arc = d3.arc();
  const ribbon = d3.ribbonArrow();
  const sum_sizes = make_angular(filtered_edfJSON);
  let edfARR = Object.keys(filtered_edfJSON)

  const pool_opacity = 0.8;
  const pool_stroke_width = 0.5;
  const pool_stroke_opacity = 0.8;
  const ribbon_opacity = 0.8;
  const ribbon_stroke_width = 0.6;
  const ribbon_stroke_opacity = 0.8;

  d3.selectAll(".chart > *").remove()
  svg.append("circle").attr("cx",center_translation_h).attr("cy",center_translation_v).attr("r",inner_rad)
  .style("fill", "rgba(255,255,255,0.6)");

  //https://github.com/d3/d3-scale-chromatic
  //https://bl.ocks.org/EfratVil/2bcc4bf35e28ae789de238926ee1ef05
  var color = d3.scaleOrdinal().domain(edfARR)
    .range(d3.schemeTableau10);

  let g = svg.append('g')
    .attr("transform", `translate(${center_translation_h}, ${center_translation_v})`);

  draw_chord()
  edfARR.forEach(ph_id => draw_ribbon(ph_id, filtered_edfJSON[ph_id].from))
  add_listeners()

  function draw_chord() {
    g.selectAll("path .chord")
    .data(edfARR)
    .enter()
    .append("path")
    .style("fill", function(d, i) {
      if (d === 'excluded') {
        filtered_edfJSON[d].color = filtered_pools_color
        return filtered_pools_color; 
      } else {
        filtered_edfJSON[d].color = color(i);
        return color(i); 
      }
    })
    .style("cursor", 'pointer')
    .style("opacity", pool_opacity)
    .attr("d", function(d, i){
      const obj = filtered_edfJSON[d]
      if (obj.size > ticker_limit || Object.keys(filtered_edfJSON).length < 140) {
        let colortick = d === 'excluded' ? 'black' : filtered_edfJSON[d].color
        draw_ticker_text(obj, 'chart_ticker', colortick);
      }
      let outerRadius = top_rad(d)
      if (d === 'excluded') {outerRadius = inner_rad}
      return arc({
        outerRadius: outerRadius,
        innerRadius: inner_rad,
        startAngle: obj.arc.start,
        endAngle: obj.arc.end,
        padAngle: 0,
        padRadius: 0,
        cornerRadius: 1})
    })
    .style('stroke', 'black')
    .style("stroke-width", pool_stroke_width)
    .style("stroke-opacity", pool_stroke_opacity)
    .attr("tick", d => filtered_edfJSON[d].ticker)
    .attr("ph_id", d => d)
    .attr("class", "chord")
    .attr("color", function(d, i) {
      return filtered_edfJSON[d].color
    })
  }

  function draw_ticker_text(obj, class_type, color) {
    const rotation = rad_to_deg(arc_middle(obj.arc))
    if (rotation < 180) {
      g.append('text')
      .attr("x", max_rad + 13)
      .attr("y", 2.2)
      .attr('class', class_type)
      .attr('ticker', obj.ticker)
      // .attr('ph_id', id)
      // .attr('color', color)
      .style('fill', color)
      .style('font-size', ticker_size)
      .text(obj.ticker)
      .attr('transform', `rotate(${rotation-90} 0 0)`)
    } else {
      g.append('text')
      .attr("x", -(max_rad + 13))
      .attr("y", 2.2)
      .attr('class', class_type)
      .attr('ticker', obj.ticker)
      .style('font-size', ticker_size)
      // .attr('ph_id', id)
      // .attr('color', color)
      .style('fill', color)
      .text(obj.ticker)
      .attr('transform', `rotate(${rotation+90} 0 0)`)
      .attr("text-anchor", "end")
    }
  }

  function draw_ribbon(to, from) {
    g.selectAll("path .ribbon")
      .data(Object.keys(from))
      .enter()
      .append("path")
      .attr("fill", function(d, i) { 
        if (d === 'new_delegation') {
          return delegation_color;
        }
        return filtered_edfJSON[d] ? filtered_edfJSON[d].color : filtered_pools_color; 
      })
      .style("opacity", ribbon_opacity)
      .attr("d", function(from_id) {
        const target = filtered_edfJSON[to];
        const t_middle = arc_middle(target.arc);
        const dele_size = from[from_id]
        const arc_size = (dele_size / sum_sizes) * (Math.PI * 2);
        if (dele_size === 0) {return null}
        if (!(from_id === 'new_delegation')) {
          if (!filtered_edfJSON[from_id]) { 
            from_id = 'excluded'
          }
          let source = filtered_edfJSON[from_id];
          const s_middle = arc_middle(source.arc);
          const source_arc = deploy_space(source, s_middle, arc_size)
          const target_arc = deploy_space(target, t_middle, arc_size)
          return ribbon({
            source: {startAngle: source_arc.start, endAngle: source_arc.end, radius: inner_rad},
            target: {startAngle: target_arc.start, endAngle: target_arc.end, radius: inner_rad}
          })
        } else {
          // if it is a "new_delegation"
          const top_rad_ = top_rad(to)
          return arc({
            outerRadius: top_rad_ + 8,
            innerRadius: top_rad_ + 3,
            startAngle: t_middle-(arc_size/2),
            endAngle: t_middle+(arc_size/2),
            padAngle: 0,
            padRadius: 0,
            cornerRadius: 1})
        }
      })
      .style('stroke', function(d, i) { 
        if (d === 'new_delegation') {
          return delegation_color;
        }
        return filtered_edfJSON[d] ? filtered_edfJSON[d].color : filtered_pools_color; 
      })
      .style("stroke-width", ribbon_stroke_width)
      .style("stroke-opacity", ribbon_stroke_opacity)
      // .attr('info', function(from) {if (from != 'new_delegation') {return `${from} ${edfJSON[from].ticker}`}})
      .attr("class", "ribbon")
      .attr("from", from => from)
      .attr("to", to)
  } 

  function add_listeners() {
    d3.selectAll(".chord")
    .on("mouseover", function(){
      d3.select(this)
        .style("fill", 'red')

      // const ticker = d3.select(this).attr("ticker")
      const id = d3.select(this).attr("ph_id")

      draw_ticker_text(filtered_edfJSON[id], 'chart_ticker_select', 'red')

      d3.selectAll(".ribbon")
        .style("opacity", 0)
        .style("stroke-opacity", 0)

      d3.selectAll(`path[from="${id}"]`)
        .style("fill", 'red')
        .style("stroke", 'red')
        .style("opacity", 1)
        .style("stroke-width", 1)
        .style("stroke-opacity", 0.5)

      d3.selectAll(`path[to="${id}"]`)
        .style("fill", 'blue')
        .style("stroke", 'blue')
        .style("opacity", 1)
        .style("stroke-width", 1)
        .style("stroke-opacity", 0.5)
    })
    .on("mouseout", function(){
      const color = d3.select(this).attr("color")

      d3.select(this)
        .style("fill", color)

      // const ticker = d3.select(this).attr("ticker")
      const id = d3.select(this).attr("ph_id")

      d3.selectAll('.chart_ticker_select').remove()

      d3.selectAll(".ribbon")
        .style("opacity", ribbon_opacity)
        .style("stroke-opacity", ribbon_stroke_opacity)
        .style("stroke-width", ribbon_stroke_width)
      
      d3.selectAll(`path[from="${id}"]`)
        .style("fill", color)
        .style("stroke", color)
      let paths = document.querySelectorAll(`path[to='${id}']`);
      paths.forEach((path)=>{
        let col = path.getAttribute('fill')
        path.style.fill = col
        path.style.stroke = col
      })
    })
    .on("click", function(){
      const ticker = d3.select(this).attr("tick")
      history.push(`/delegation-flows/epochs/${epoch_no}/pools/${ticker}`)
    }); 
  }
}


function deployFromTo(obj, type, edfJSON) {
  Object.keys(obj).forEach((key)=>{
    function appendString(string) {
      var div = document.createElement('div');
      div.innerHTML = string.trim();
      document.getElementById(type)
        .getElementsByTagName('span')[0]
        .appendChild(div.firstChild); 
    }
    if (key === 'new_delegation') {
      appendString(`<div class="pool_ticker" style='color:green'>New Delegats</div>`)
    } else {
      // appendString(`<div class="pool_ticker" style="color:${edfJSON[key].color}">${edfJSON[key].ticker}</div>`)
      // console.log(key)
      appendString(`<div class="pool_ticker" style="color:grey">${edfJSON[key].ticker}</div>`)
    }
    appendString(`<div class="tab_value">${numeral(obj[key]).format('0,0')} ₳</div>`)
  })
}


function calculate_balance(id, edfJSON, tos) {
  let sum_to = 0
  let sum_from = 0

  Object.keys(edfJSON[id].from).forEach((from_key)=>{
    sum_from += edfJSON[id].from[from_key]
  })

  Object.keys(edfJSON).forEach((key) => {
    Object.keys(edfJSON[key].from).forEach((from_key)=>{
      if (from_key === id) {
        sum_to += edfJSON[key].from[from_key]
        tos[key] = edfJSON[key].from[from_key]
      }
    })
  })
  return sum_from - sum_to
}

function getInIds(id, edfJSON) {
  let arr = []
  Object.keys(edfJSON).forEach((key) => {
    Object.keys(edfJSON[key].from).forEach((from_key)=>{
      if (from_key === id) {
        arr.push(key)
      }
    })
  })
  return arr
}


function deploy_space(obj, middle, new_size) {
  let start;
  let end;
  let taken_anticlock;
  let taken_clock;
  let half_pool_arc = (obj.arc.end - obj.arc.start)/2;
  if (!obj.taken_space || obj.taken_space.anticlock === 0 || !obj.taken_space.anticlock || new_size >= half_pool_arc) {
    // if this is the first ribbon placed on this pool's arc
    const half = new_size/2;
    start = middle - half;
    end = middle + half;
    taken_anticlock = half;
    taken_clock = half;
  } else {
    if (obj.taken_space.anticlock <= obj.taken_space.clock) {
      // if there is more space available on the anticlock side of the pool's arc
      end = middle - obj.taken_space.anticlock;
      start = end - new_size;
      taken_anticlock = obj.taken_space.anticlock + new_size;
      taken_clock = obj.taken_space.clock
    } else {
      // if there is more space available on the clock side of the pool's arc
      start = middle + obj.taken_space.clock;
      end = start + new_size;
      taken_clock = obj.taken_space.clock + new_size;
      taken_anticlock = obj.taken_space.anticlock
    }
  };
  obj.taken_space = {anticlock: taken_anticlock, clock: taken_clock}
  return {start: start, end: end}
}


function arc_middle(arc) {
  return arc.start + ((arc.end - arc.start)/2)
}

function rad_to_deg(radians) {
  var pi = Math.PI;
  return radians * (180/pi);
}

function filterPools(edfJSON, pool_hash_id) {
  let senders = {...edfJSON[pool_hash_id].from}
  let new_edfJSON = {[pool_hash_id]: edfJSON[pool_hash_id]}
  
  Object.keys(edfJSON).forEach((k) => {
    const this_k_receives_from_pool = receives_from_pool(edfJSON[k].from)

    if (k != pool_hash_id && this_k_receives_from_pool) {
      new_edfJSON[k] = {...edfJSON[k], from: {[pool_hash_id]: edfJSON[k].from[pool_hash_id]}}
    } 

    if (k != pool_hash_id && senders[k]) {
      const from_content = this_k_receives_from_pool ? {[pool_hash_id]: edfJSON[k].from[pool_hash_id]} : {}
      new_edfJSON[k] = {...edfJSON[k], from: from_content}
    }
  })

  function receives_from_pool(from) {
    let found = false
    Object.keys(from).forEach((k) => {
      if (k == pool_hash_id) {
        found = true
      }
    })
    return found
  }

  return new_edfJSON
}

function make_angular(edfJSON) {
  const sum = Object.keys(edfJSON).reduce((a, k) => a + edfJSON[k].size, 0);
  const t = Math.PI * 2;
  const angular = Object.keys(edfJSON).forEach((k) => {
    edfJSON[k].angular_size = (edfJSON[k].size / sum) * t
  });
  let previous = 0;
  Object.keys(edfJSON).forEach((k) => {
    const arc = {start: previous, end: previous + edfJSON[k].angular_size}
    previous += edfJSON[k].angular_size
    edfJSON[k].arc = arc
  })
  return sum
}