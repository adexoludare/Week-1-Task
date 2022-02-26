function noOfElements(x, y, z) {
    let count = 0;
    for(let i=0; i< x.length; i++) {
      const p = x[i];
      if(p >= y && p<= z) {
        count++
      }
    }
    return count
  }
   
  console.log(noOfElements([4,6,2,6,7,7], 0, 7))

  