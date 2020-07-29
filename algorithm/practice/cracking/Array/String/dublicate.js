function findRepeat(numbers) {

    // Find a number that appears more than once
    const repeat = {}
    
     numbers.forEach (item => {
        if(repeat.hasOwnProperty(item)) {
           repeat[item]++
         } else {
           repeat[item] = 1;
         }
     })
     
     let stringNum = Object.keys(repeat).filter((count) => repeat[count] > 1)
       
      return parseInt(stringNum) || 0;
  }
    
  // Tests
  // [4, 1, 4, 8, 3, 2, 7, 6, 5] --> 4
  // [1, 2, 5, 5, 5, 5]] --> 5