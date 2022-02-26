function  isDivisbleByN(x,n) {
    let newArr = [];
    for(let i=0; i< x.length; i++) {
      const p = x[i];
      if(p % n == 0) {
        newArr.push(p)
      }
    }
    return newArr
  }
   
  console.log( isDivisbleByN([21,3,5,6,3,6,7,4], 7))
  