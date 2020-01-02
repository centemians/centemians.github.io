//import {getMergeSortAnimations} from "sortingAlgorithm.js";
const svg = d3.select('.canvas')
    .append('svg')
        .attr('width',1400)
        .attr('height',600);

//Create margins and dimensions
const margin = {top:20, bottom:20, right:20, left:20};
const graphWidth = 1400 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const PRIMARY_COLOR = 'blue';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const ANIMATION_SPEED_MS = 2;

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
        .range([0,1350])
        .paddingInner(0.2)
        .paddingOuter(0.2);

    const rects = graph.selectAll('rect')
        .data(data)
    
    rects.attr('width',x.bandwidth)
        .attr('class','array-bar')
        .attr('id',(d,i) => "bar" + i)
        .attr('height', (d,i) => graphHeight - y(d))
        .attr('fill', 'blue')
        .attr('x', (d,i) => x(i))
        .attr('y', (d,i) => y(d));

    //append the enter selection
    rects.enter()
        .append('rect')
            .attr('class','array-bar')
            .attr('id',(d,i) => "bar" + i)
            .attr('width',x.bandwidth)
            .attr('height', (d,i) => graphHeight - y(d))
            .attr('fill', 'blue')
            .attr('x', (d,i) => x(i))
            .attr('y', (d,i) => y(d));
    
}

function mergeAlgo(){

  const y = d3.scaleLinear()
    .domain([0,750])
    .range([graphHeight,0]);

    const animations = getMergeSortAnimations(array);
    console.log(animations);
    console.log(array);
    for (let i = 0; i < animations.length; i++) {
      //const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOne = d3.select("#bar"+barOneIdx);
        const barTwo = d3.select("#bar"+barTwoIdx);
        //console.log(barOne);
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
            .attr('y', y(newHeight));
        },i*ANIMATION_SPEED_MS);
      }
    }
}
//Reset Array function
function resetArray() {
    const data = [];
    for (let i = 0; i < 500 ; i++) {
      data.push(randomIntFromInterval(5,750));
    }
    return data;
}

//Generating a random array onClick
let array = [];
function generateArray(){
    array = resetArray();
    update(array);
    //console.log(array);
    //const animations = getMergeSortAnimations(array);
    //console.log(array);
    //console.log(animations);
}

generateArray();

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
