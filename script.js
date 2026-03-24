// ==========================
// ✅ REGISTER USER
// ==========================
function registerUser(){

let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

if(!email || !password){
  alert("Fill all fields");
  return;
}

let users = JSON.parse(localStorage.getItem("users")) || [];

// جلوگیری duplicate user
let exist = users.find(u => u.email === email);
if(exist){
  alert("User already exists");
  return;
}

let newUser = {
  email: email,
  password: password,
  balance: 0,
  plan: null,
  percent: 0
};

users.push(newUser);

localStorage.setItem("users", JSON.stringify(users));

alert("Account created successfully");

window.location = "login.html";
}


// ==========================
// ✅ LOGIN USER
// ==========================
function loginUser(){

let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

let users = JSON.parse(localStorage.getItem("users")) || [];

let found = users.find(user => user.email === email && user.password === password);

if(found){

localStorage.setItem("loggedInUser", JSON.stringify(found));

window.location = "dashboard.html";

}else{
alert("Invalid login");
}

}


// ==========================
// ✅ LOAD DASHBOARD
// ==========================
function loadDashboard(){

let user = JSON.parse(localStorage.getItem("loggedInUser"));

if(!user){
  window.location = "login.html";
  return;
}

// balance
document.getElementById("balance").innerText = "$" + (user.balance || 0);

// plan
document.getElementById("plan").innerText =
user.plan || "No plan selected";

}
function startInvestment(){

let user = JSON.parse(localStorage.getItem("loggedInUser"));

if(!user) return;

// If no start date, create one
if(!user.startDate){
    user.startDate = Date.now();
    localStorage.setItem("loggedInUser", JSON.stringify(user));
}

// Start mining
setInterval(()=>{

    let profit = (user.balance * (user.percent || 5)) / 100;

    profit = profit / 120; // slow profit

    user.balance = Number(user.balance) + profit;

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    document.getElementById("balance").innerText =
    "$" + user.balance.toFixed(2);

},5000);

}

// ==========================
// ✅ PLAN SELECTION
// ==========================
function choosePlan(name,percent){

let user = JSON.parse(localStorage.getItem("loggedInUser"));

if(!user) return;

user.plan = name;
user.percent = percent;

localStorage.setItem("loggedInUser",JSON.stringify(user));

alert("Plan Activated: "+name);

}


// ==========================
// ✅ MINING / PROFIT SYSTEM
// ==========================
function startMining(){

let user = JSON.parse(localStorage.getItem("loggedInUser"));

if(!user || !user.percent) return;

setInterval(()=>{

let profit = (user.balance * user.percent) / 100;

// slow growth
profit = profit / 120;

user.balance = Number(user.balance) + profit;

// save
localStorage.setItem("loggedInUser", JSON.stringify(user));

// update UI
let balanceEl = document.getElementById("balance");
if(balanceEl){
balanceEl.innerText = "$" + user.balance.toFixed(2);
}

},5000);

}


// ==========================
// ✅ FAKE LIVE DATA
// ==========================
let names = [
"Michael","John","David","Sarah","Daniel",
"Emma","Chris","Robert","Sophia","James"
];

function randomAmount(){
return Math.floor(Math.random()*900)+100;
}


// ==========================
// ✅ LIVE DEPOSITS
// ==========================
function liveDeposits(){

let list = document.getElementById("deposits");
if(!list) return;

setInterval(()=>{

let name = names[Math.floor(Math.random()*names.length)];
let amount = randomAmount();

let li = document.createElement("li");

li.innerText = name+" deposited $"+amount;

list.prepend(li);

if(list.children.length>6){
list.removeChild(list.lastChild);
}

},4000);

}


// ==========================
// ✅ LIVE WITHDRAWALS
// ==========================
function liveWithdrawals(){

let list = document.getElementById("withdrawals");
if(!list) return;

setInterval(()=>{

let name = names[Math.floor(Math.random()*names.length)];
let amount = randomAmount();

let li = document.createElement("li");

li.innerText = name+" withdrew $"+amount;

list.prepend(li);

if(list.children.length>6){
list.removeChild(list.lastChild);
}

},6000);

}


// ==========================
// ✅ INVESTOR COUNTER
// ==========================
function investorsCounter(){

let count = 120;
let el = document.getElementById("investors");

if(!el) return;

setInterval(()=>{

count += Math.floor(Math.random()*3);
el.innerText = count;

},5000);

}


// ==========================
// ✅ START ALL ANIMATIONS
// ==========================
function startLive(){
liveDeposits();
liveWithdrawals();
investorsCounter();
}
