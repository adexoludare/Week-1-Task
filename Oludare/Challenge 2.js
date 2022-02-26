function divisible(x) {
    let count = 0;
    for(let i=0; i< x.length; i++) {
      const p = x[i];
      if(p >= 15 && p % 2 == 0) {
        count++
      }
    }
    return count
  }
   
  console.log(divisible([2,3,12,18,42,24]))
  