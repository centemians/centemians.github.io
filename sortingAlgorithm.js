function getMergeSortAnimations(array) {
    const animations = new Array();
    if (array.length <= 1) return array;
    //const auxiliaryArray = array.slice();
    let auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    console.log(animations);
    console.log(auxiliaryArray);
    return animations;
}
  
function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    //if (startIdx === endIdx) return;
    if(startIdx < endIdx){
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    // mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    // mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    // doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
    mergeSortHelper(mainArray, startIdx, middleIdx, auxiliaryArray, animations);
    mergeSortHelper(mainArray, middleIdx + 1, endIdx, auxiliaryArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
    }
}
  
function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    //let k = startIdx;
    let k = 0;
    let i = startIdx;
    let j = middleIdx + 1;
    let merge = new Array();
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
        animations.push([i, auxiliaryArray[i]]);
        //mainArray[k++] = auxiliaryArray[i++];
        merge[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([j, auxiliaryArray[j]]);
        //mainArray[k++] = auxiliaryArray[j++];
        merge[k++] = auxiliaryArray[j++];
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
      animations.push([i, auxiliaryArray[i]]);
      //mainArray[k++] = auxiliaryArray[i++];
      merge[k++] = auxiliaryArray[i++];
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
      animations.push([j, auxiliaryArray[j]]);
      //mainArray[k++] = auxiliaryArray[j++];
      merge[k++] = auxiliaryArray[j++];
    }
    k = 0;
    for(i=startIdx;i<=endIdx;i++){
        animations.push([i,i]);
        animations.push([i,i]);
        auxiliaryArray[i] = merge[k++];
        animations.push([i,auxiliaryArray[i]]);
    }
}

function getBubbleSortAnimations(array){
    const animations = [];
    if(array.length <= 1) return array;

    const auxiliaryArray = array.slice();
    for(let i=0;i<auxiliaryArray.length;i++){
        for(let j=0;j<auxiliaryArray.length-i-1;j++){
            animations.push([j,j+1]);
            animations.push([j,j+1]);

            if(auxiliaryArray[j] > auxiliaryArray[j+1]){
                animations.push([j+1,auxiliaryArray[j]]);
                animations.push([j,auxiliaryArray[j+1]]);
                let temp = auxiliaryArray[j];
                auxiliaryArray[j] = auxiliaryArray[j+1];
                auxiliaryArray[j+1] = temp;
            }
            else{
                animations.push([j+1,auxiliaryArray[j+1]]);
                animations.push([j,auxiliaryArray[j]]);
            }
        }
    }
    return animations;
}

function getQuickSortAnimations(array){
    const animations = new Array();
    if(array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    quickSortHelper(array,0,array.length-1,auxiliaryArray,animations);
    console.log(animations);
    console.log(auxiliaryArray);
    return animations;
}

function quickSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations
) {
    if(startIdx < endIdx){
    let partition = quickSort(mainArray,startIdx,endIdx,auxiliaryArray,animations);
    quickSortHelper(mainArray,startIdx,partition-1,auxiliaryArray,animations);
    quickSortHelper(mainArray,partition+1,endIdx,auxiliaryArray,animations);
    }
}

function quickSort(mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations){
    const pivot = auxiliaryArray[endIdx];
    let k = startIdx - 1;
    for(let i=startIdx;i<endIdx;i++){
        if(auxiliaryArray[i] < pivot){
            k ++;
            animations.push([k,i]);
            animations.push([k,i]);
            //swap(auxiliaryArray[i],auxiliaryArray[k]);
            const temp = auxiliaryArray[i];
            auxiliaryArray[i] = auxiliaryArray[k];
            auxiliaryArray[k] = temp;

            animations.push([k,auxiliaryArray[k]]);
            animations.push([i,auxiliaryArray[i]]);
        }
    }
    //animations.push([auxiliaryArray[k+1],auxiliaryArray[endIdx]]);
    animations.push([k+1,endIdx]);
    animations.push([k+1,endIdx]);
    const temp = auxiliaryArray[k+1];
    auxiliaryArray[k+1] = auxiliaryArray[endIdx];
    auxiliaryArray[endIdx] = temp;
    animations.push([k+1,auxiliaryArray[k+1]]);
    animations.push([endIdx,auxiliaryArray[endIdx]]);

    return k+1;
}
