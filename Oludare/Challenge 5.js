function  replaceDivisible(x,y) {
    const p = x.map(function(each){
      if(each % y == 0){
        each = 'isDivisible';
      }
      return each
    })
    return p
  }
   
  console.log( replaceDivisible([12,4,3,6,5], 2))
  