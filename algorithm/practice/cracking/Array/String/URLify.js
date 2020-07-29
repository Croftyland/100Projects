function URLify(str,len) {
 const convertString = str.trim().split('');

 for (let char in convertString) {
     if(char[i] ===' ') {
         char[i] += "%20";
     }
  }
  return convertString.join('');
}