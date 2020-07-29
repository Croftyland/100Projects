/* ---- First Task  ---- */

// function time () {
//  console.log('TIMED OUT!');
// }
//
// setTimeout(time, 300);


// Another solution
// 'use strict'
//  setTimeout(function () {
// 	 'TIMED OUT!'
//  },300);


/* ---- Second Task  ---- */

// 'use strict'
// let promise = new Promise(function (fulfill, reject) {
// 	setTimeout(function () {
// 		fulfill( "FULFILLED!" )
// 	}, 300);
// });
//
// promise.then(console.log);


/* ---- Third Task  ---- */

// 'use strict'
// let promise = new Promise(function (fulfill, reject) {
// 	setTimeout(function () {
// 		reject(new Error( 'REJECTED!' ))
// 	}, 300);
// });
//
// function rejected(error) {
// 	console.log(error.message)
// }
//
//
// promise.then(null,rejected);

/* ---- Forth Task  ---- */

// 'use strict'
//
// let promise = new Promise(function(fulfill,reject) {
// 	fulfill('I FIRED');
// 	reject(new Error('I DID NOT FIRE'));
// });
//
// function rejected(error) {
// 	console.log(error.message);
// }
// promise.then(console.log, rejected);


/* ---- Fifth Task  ---- */

// 'use strict'
//
// let promise = new Promise(function(fulfill,reject) {
// 	fulfill('PROMISE VALUE')
// });
//
// promise.then(console.log);
//
// console.log('MAIN PROGRAM');


/* ---- Sixth Task  ---- */

// 'use strict'
//
// let promise = Promise.resolve('Success');
//
// let reject = promise.catch(function (reason) {
//
// 	console.error("catch promise");
// 	console.error(reason);
// });

/* ---- Seventh Task  ---- */


// 'use strict'
//
// var firstPromise = first();
//
// var secondPromise = firstPromise.then(function (val) {
// 	return second(val);
// });
//
// secondPromise.then(console.log);

/* ---- Eighth Task  ---- */


'use strict'

var firstPromise = first();

var secondPromise = firstPromise.then(function (val) {
	return second(val);
});

secondPromise.then(console.log);
