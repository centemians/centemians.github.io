//import {getMergeSortAnimations} from "sortingAlgorithm.js";
const svg = d3.select('.canvas')
    .append('svg')
        .attr('width',1100)
        .attr('height',500);

//Create margins and dimensions
const margin = {top:20, bottom:20, right:20, left:20};
const graphWidth = 1100 - margin.left - margin.right;
const graphHeight = 500 - margin.top - margin.bottom;

const PRIMARY_COLOR = 'yellow';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'black';

//let ANIMATION_SPEED_MS = document.getElementById('speed').value;
//console.log(document.getElementById('speed').value);

const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform',`translate(${margin.left},${margin.top})`);

const update = (data) => {

    const y = d3.scaleLinear()
        .domain([0,750])
        .range([graphHeight,0]);
    
    const x = d3.scaleBand()
        .domain(data.map((d,i) => i))
        .range([0,1050])
        .paddingInner(0.2)
        .paddingOuter(0.2);

    const rects = graph.selectAll('rect')
        .data(data);

    rects.enter().remove();
    rects.exit().remove();

    rects.attr('width',x.bandwidth)
        .attr('class','array-bar')
        .attr('id',(d,i) => "bar" + i)
        .attr('height', (d,i) => graphHeight - y(d))
        .attr('fill', 'yellow')
        .attr('x', (d,i) => x(i))
        .attr('y', (d,i) => y(d));

    //append the enter selection
    rects.enter()
        .append('rect')
            .attr('class','array-bar')
            .attr('id',(d,i) => "bar" + i)
            .attr('width',x.bandwidth)
            .attr('height', (d,i) => graphHeight - y(d))
            .attr('fill', 'yellow')
            .attr('x', (d,i) => x(i))
            .attr('y', (d,i) => y(d));
    
}
function mergeAlgo(){
  const ANIMATION_SPEED_MS = document.getElementById('speed').value;
  const y = d3.scaleLinear()
    .domain([0,750])
    .range([graphHeight,0]);

    const animations = getMergeSortAnimations(array);
    //console.log(animations);
    //console.log(array);
    for (let i = 0; i < animations.length; i++) {
      //const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOne = d3.select("#bar"+barOneIdx);
        const barTwo = d3.select("#bar"+barTwoIdx);
        ////console.log(barOne);
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        window.timer = d3.timeout(function() {
          barOne.transition().duration(ANIMATION_SPEED_MS)
          .attr('fill',color);
        barTwo.transition().duration(ANIMATION_SPEED_MS)
          .attr('fill',color);
        //beep();
        },i*ANIMATION_SPEED_MS);
      }
      else{
        ////console.log(i);
        window.timer1 = d3.timeout(function(){
          const [barOneIdx, newHeight] = animations[i];
          const barOne = d3.select("#bar"+barOneIdx);
          barOne.transition().duration(ANIMATION_SPEED_MS)
            .attr('height',graphHeight - y(newHeight))
            .attr('y', y(newHeight))
            .attr('fill',PRIMARY_COLOR);
          //beep();
        },i*ANIMATION_SPEED_MS);
      }
    }
    let flag = 0;

    window.timer2 = d3.timeout(function(){
      for(let i=0;i<array.length;i++){
        d3.timeout(function(){
          const barOne = d3.select("#bar"+i);
          barOne.transition().duration(5)
          .attr('fill','white');
        },i*5);
        flag = 1;
      }
      enableButton(myBtn);
    },animations.length*ANIMATION_SPEED_MS);
}

function bubbleAlgo(){
  const ANIMATION_SPEED_MS = document.getElementById('speed').value;
  const y = d3.scaleLinear()
    .domain([0,750])
    .range([graphHeight,0]);

    const animations = getBubbleSortAnimations(array);
    //console.log(animations);
    //console.log(array);
    for (let i = 0; i < animations.length; i++) {
      //const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 4 < 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOne = d3.select("#bar"+barOneIdx);
        const barTwo = d3.select("#bar"+barTwoIdx);
        ////console.log(barOne);
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        d3.timeout(function() {
          barOne.transition().duration(ANIMATION_SPEED_MS)
          .attr('fill',color);
        barTwo.transition().duration(ANIMATION_SPEED_MS)
          .attr('fill',color);
        },i*ANIMATION_SPEED_MS);
      }
      else{
        d3.timeout(function(){
          const [barOneIdx, newHeight] = animations[i];
          const barOne = d3.select("#bar"+barOneIdx);
          barOne.transition().duration(ANIMATION_SPEED_MS)
            .attr('height',graphHeight - y(newHeight))
            .attr('y', y(newHeight))
            .attr('fill',PRIMARY_COLOR);
        },i*ANIMATION_SPEED_MS);
      }
    }
    d3.timeout(function(){
      for(let i=0;i<array.length;i++){
        d3.timeout(function(){
          const barOne = d3.select("#bar"+i);
          barOne.transition().duration(5)
          .attr('fill','white');
        },i*5);
      }
      enableButton(myBtn);
    },animations.length*ANIMATION_SPEED_MS);
}

function quickAlgo(){
  const ANIMATION_SPEED_MS = document.getElementById('speed').value;
  const y = d3.scaleLinear()
    .domain([0,750])
    .range([graphHeight,0]);

    const animations = getQuickSortAnimations(array);
    //console.log(animations);
    //console.log(array);
    for (let i = 0; i < animations.length; i++) {
      //const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 4 < 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOne = d3.select("#bar"+barOneIdx);
        const barTwo = d3.select("#bar"+barTwoIdx);
        ////console.log(barOne);
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        d3.timeout(function() {
          barOne.transition().duration(ANIMATION_SPEED_MS)
          .attr('fill',color);
        barTwo.transition().duration(ANIMATION_SPEED_MS)
          .attr('fill',color);
        },i*ANIMATION_SPEED_MS);
      }
      else{
        d3.timeout(function(){
          const [barOneIdx, newHeight] = animations[i];
          const barOne = d3.select("#bar"+barOneIdx);
          barOne.transition().duration(ANIMATION_SPEED_MS)
            .attr('height',graphHeight - y(newHeight))
            .attr('y', y(newHeight))
            .attr('fill',PRIMARY_COLOR);
        },i*ANIMATION_SPEED_MS);
      }
    }
    d3.timeout(function(){
      for(let i=0;i<array.length;i++){
        d3.timeout(function(){
          const barOne = d3.select("#bar"+i);
          barOne.transition().duration(5)
          .attr('fill','white');
        },i*5);
      }
      enableButton(myBtn);
    },animations.length*ANIMATION_SPEED_MS);
}

function insertionAlgo(){
  const ANIMATION_SPEED_MS = document.getElementById('speed').value;
  const y = d3.scaleLinear()
    .domain([0,750])
    .range([graphHeight,0]);

    const animations = getInsertionSortAnimations(array);
    //console.log(animations);
    //console.log(array);
    let flag;
    for (let i = 0; i < animations.length; i++) {
      //const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOne = d3.select("#bar"+barOneIdx);
        const barTwo = d3.select("#bar"+barTwoIdx);
        ////console.log(barOne);
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        d3.timeout(function() {
          barOne.transition().duration(ANIMATION_SPEED_MS)
          .attr('fill',color);
        barTwo.transition().duration(ANIMATION_SPEED_MS)
          .attr('fill',color);
        },i*ANIMATION_SPEED_MS);
      }
      else{
        d3.timeout(function(){
          const [barOneIdx, newHeight] = animations[i];
          const barOne = d3.select("#bar"+barOneIdx);
          barOne.transition().duration(ANIMATION_SPEED_MS)
            .attr('height',graphHeight - y(newHeight))
            .attr('y', y(newHeight))
            .attr('fill',PRIMARY_COLOR);
        },i*ANIMATION_SPEED_MS);
      }
      flag = i;
    }
    d3.timeout(function(){
      for(let i=0;i<array.length;i++){
        d3.timeout(function(){
          const barOne = d3.select("#bar"+i);
          barOne.transition().duration(10)
          .attr('fill','white');
        },i*10);
      }
      enableButton(myBtn);
    },animations.length*ANIMATION_SPEED_MS);
}

//Reset Array function
function resetArray() {
    const data = [];
    var size = document.getElementById("array_size").value;
    for (let i = 0; i < size ; i++) {
      //data.push(size-i);
      data.push(randomIntFromInterval(5,750));
    }
    return data;
}

//Generating a random array onClick
let array = [];
function generateArray(){
    array = resetArray();
    update(array);
}

generateArray();

function stopAnimation() {
  console.log('clear timer', window.timer)
  clearTimeout(window.timer);
  clearTimeout(window.timer1);
  clearTimeout(window.timer2);
}

function disableButton(btn1,btn2,btn3,btn4,btn5){
  document.getElementById(btn1.id).disabled = true;
  document.getElementById(btn2.id).disabled = true;
  document.getElementById(btn3.id).disabled = true;
  document.getElementById(btn4.id).disabled = true;
  document.getElementById(btn5.id).disabled = true;
}

function enableButton(btn1){
  document.getElementById(btn1.id).disabled = false;
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
