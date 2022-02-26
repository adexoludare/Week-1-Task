function  highestSum(x,y) {
    let sum1 = x.reduce(function (total,x) {
       return total += x
    })
    
    let sum2 = y.reduce(function (total,x) {
       return total += x
    })
    
    let max = Math.max(sum1,sum2)
    return max
  }
   
  console.log( highestSum([30], [3,6,2,6]))
  