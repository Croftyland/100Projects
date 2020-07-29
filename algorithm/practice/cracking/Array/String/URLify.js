function URLify(str,len) {
    const convertString = str.trim().split('');
   
    for (let char in convertString) {
        if(convertString[char] ===' ') {
            convertString[char] += "%20";
        }
     }
     return convertString.join('');
   }


//urlify('Mr John Smith    ', 13), 'Mr%20John%20Smith'