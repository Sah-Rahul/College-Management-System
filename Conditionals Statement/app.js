// todo valid voter
let ans = Number(prompt("What is your age?"));

 if(isNaN(ans)){
    console.log("Please enter a valid age!");
 }else if (ans >= 18) {
    console.log("You can vote!");
} else {
    console.log("You can't vote!");
}

// todo shop discount

let amount = Number(prompt("Enter the final amount!"));
let discount = 0;

if (isNaN(amount) || amount <= 0) {
  console.log("Wrong input");
} else if (amount <= 5000) {
  discount = 0
} else if (amount <= 7000) {
  discount = 5;
} else if (amount <= 9000) {
  discount = 10;
}
console.log(amount - Math.floor((20 * amount) / 100));

// todo elctricity bill

let unit = Number(prompt('Enter your unit'));
let amount = 0;

if (unit > 400) {
    amount += (unit - 400) * 13;
    unit = 400;
}

if (unit > 200) {
    amount += (unit - 200) * 8;
    unit = 200;
}

if (unit > 100) {
    amount += (unit - 100) * 6;
    unit = 100;
}

amount += unit * 4;

console.log('Total Bill:', amount);

// todo NPR denomination

let amount = 100;

if(amount >=500){
    console.log('500 ka notes ' , Math.floor(amount/500));
    amount = amount % 500
}
if(amount >=200){
    console.log('200 ka notes ' ,Math.floor(amount/200));
    amount = amount % 200
}
if(amount >=100){
    console.log('100 ka notes ' , Math.floor(amount/100));
    amount = amount % 100
}
if(amount >=50){
    console.log('50 ka notes ' ,Math.floor(amount/50));
    amount = amount % 50
}
if(amount >=20){
    console.log('20 ka notes ' ,Math.floor(amount/20));
    amount = amount % 20
}
if(amount >=10){
    console.log('10 ka notes ' ,Math.floor(amount/10));
    amount = amount % 10
}

switch (true) {
  case 10 > 6:
    console.log("hello");
    break;
  case 10 > 6:
    console.log("hey");
    break;
}

 

// ✅ Question (in simple terms):
// "Given a number n, print whether it is Weird or Not Weird based on the following rules:"

// Rules:
// If n is odd, print "Weird"

// If n is even and in the range 6 to 20 (inclusive), print "Weird"

// Otherwise (even and not in 6–20), print "Not Weird"

function checkWeirdOrNot(n) {
  if (n % 2 !== 0) {
    console.log("Weird");
  } else if (n >= 6 && n <= 20) {
    console.log("Weird");
  } else {
    console.log("Not Weird");
  }
}

// Test
checkWeirdOrNot(3);   // Weird
checkWeirdOrNot(18);  // Weird
checkWeirdOrNot(24);  // Not Weird
checkWeirdOrNot(4);   // Not Weird
