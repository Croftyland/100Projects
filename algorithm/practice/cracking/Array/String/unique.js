function everyCharecterUnique (words) {
    let map = {};
   
    for (let i = 0; i < words.length; i++) {
        if (map[words[i]] === undefined) {
            map[words[i]] = 0;
        }
        map[words[i]]++;
    }
   
    for (const property in map) {
        if (map[property] && map[property] > 1) {
            return false;
        } else {
        map[property] = 1;
      }

  }

    return true
} 

// everyCharecterUnique('ab') --> true;
// everyCharecterUnique('abba') -->  false;

//Fill a Set with all characters and compare its size to the string's length:
function isUnique(str) {
    return new Set(str).size == str.length;
  }
  
//  console.log(isUnique('abc'));    // true
//  console.log(isUnique('abcabc')); // false