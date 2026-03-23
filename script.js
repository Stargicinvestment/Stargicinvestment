// REGISTER USER
function registerUser(){

let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

let users = JSON.parse(localStorage.getItem("users")) || [];

let newUser = {
email: email,
password: password,
balance: 0
};

users.push(newUser);

localStorage.setItem("users", JSON.stringify(users));

alert("Account created successfully");

window.location = "login.html";

}


// LOGIN USER
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


// SHOW BALANCE
function loadDashboard(){document.getElementById("plan").innerText =
user.plan || "No plan selected";

let user = JSON.parse(localStorage.getItem("loggedInUser"));

if(user){

document.getElementById("balance").innerText = "$" + user.balance;

}

}
// FAKE NAMES
let names = [
"Michael","John","David","Sarah","Daniel",
"Emma","Chris","Robert","Sophia","James"
];

// RANDOM AMOUNTS
function randomAmount(){
return Math.floor(Math.random()*900)+100;
}

// LIVE DEPOSITS
function liveDeposits(){

let list = document.getElementById("deposits");

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


// LIVE WITHDRAWALS
function liveWithdrawals(){

let list = document.getElementById("withdrawals");

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


// ACTIVE INVESTORS COUNTER
function investorsCounter(){

let count = 120;

let el = document.getElementById("investors");

setInterval(()=>{

count += Math.floor(Math.random()*3);

el.innerText = count;

},5000);

}


// START ALL
function startLive(){

liveDeposits();

liveWithdrawals();

investorsCounter();

}
function choosePlan(name,percent){

let user = JSON.parse(localStorage.getItem("loggedInUser"));

user.plan = name;
user.percent = percent;

localStorage.setItem("loggedInUser",JSON.stringify(user));

alert("Plan Activated: "+name);

}
function startMining(){

let user = JSON.parse(localStorage.getItem("loggedInUser"));

if(!user || !user.percent) return;

setInterval(()=>{

let profit = (user.balance * user.percent) / 100;

profit = profit / 120; // slow growth

user.balance = Number(user.balance) + profit;

localStorage.setItem("loggedInUser", JSON.stringify(user));

document.getElementById("balance").innerText =
"$" + user.balance.toFixed(2);

},5000);

}
let balance = localStorage.getItem("balance") || 0;
let percent = localStorage.getItem("percent") || 0;

balance = parseFloat(balance);
percent = parseFloat(percent);

function updateProfit(){

let profit = (balance * percent) / 100;

balance = balance + profit/24;

localStorage.setItem("balance", balance);

document.getElementById("balance").innerHTML =
"$" + balance.toFixed(2);

}

setInterval(updateProfit, 5000);
<script>

const translations = {
  en: {
    title: "Secure Digital Investment Platform",
    hero: "Invest in cryptocurrency, global stocks, real estate and energy markets.",
    login: "Login",
    register: "Create Account",
    aboutTitle: "About Our Company",
    aboutText: "StargicInvestment is a global digital asset management platform.",
    marketsTitle: "Global Investment Markets",
    reviewsTitle: "Investor Testimonials",
    deposit: "Deposit",
    withdraw: "Withdraw",
    balance: "Your Balance",
    plans: "Investment Plans"
  },

  it: {
    title: "Piattaforma di Investimento Digitale Sicura",
    hero: "Investi in criptovalute, azioni globali, immobili ed energia.",
    login: "Accesso",
    register: "Crea Account",
    aboutTitle: "Chi Siamo",
    aboutText: "StargicInvestment è una piattaforma globale di gestione patrimoniale.",
    marketsTitle: "Mercati di Investimento Globali",
    reviewsTitle: "Testimonianze degli Investitori",
    deposit: "Deposito",
    withdraw: "Prelievo",
    balance: "Il tuo saldo",
    plans: "Piani di investimento"
  },

  de: {
    title: "Sichere Digitale Investmentplattform",
    hero: "Investieren Sie in Kryptowährungen, Aktien, Immobilien und Energie.",
    login: "Anmelden",
    register: "Konto erstellen",
    aboutTitle: "Über uns",
    aboutText: "StargicInvestment ist eine globale Vermögensplattform.",
    marketsTitle: "Globale Märkte",
    reviewsTitle: "Kundenbewertungen",
    deposit: "Einzahlen",
    withdraw: "Abheben",
    balance: "Ihr Guthaben",
    plans: "Investitionspläne"
  },

  fr: {
    title: "Plateforme d'Investissement Numérique Sécurisée",
    hero: "Investissez dans les crypto-monnaies, actions et immobilier.",
    login: "Connexion",
    register: "Créer un compte",
    aboutTitle: "À propos",
    aboutText: "StargicInvestment est une plateforme mondiale d'investissement.",
    marketsTitle: "Marchés mondiaux",
    reviewsTitle: "Avis des investisseurs",
    deposit: "Dépôt",
    withdraw: "Retrait",
    balance: "Votre solde",
    plans: "Plans d'investissement"
  }
};

// CHANGE LANGUAGE
function changeLanguage(lang){
  document.querySelectorAll("[data-key]").forEach(el=>{
    const key = el.getAttribute("data-key");
    if(translations[lang] && translations[lang][key]){
      el.innerText = translations[lang][key];
    }
  });

  localStorage.setItem("lang", lang);
}

// LOAD LANGUAGE ON PAGE LOAD
window.onload = function(){
  const savedLang = localStorage.getItem("lang") || "en";
  changeLanguage(savedLang);
};

</script>
