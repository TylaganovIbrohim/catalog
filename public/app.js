// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAsrcT84CP6nZq8YG2KWfcu6TCtQpQoNm0",
  authDomain: "catalog-app-1014f.firebaseapp.com",
  projectId: "catalog-app-1014f",
  storageBucket: "catalog-app-1014f.firebasestorage.app",
  messagingSenderId: "1047135603204",
  appId: "1:1047135603204:web:6c7ceeaed34f73154ac351",
  measurementId: "G-0LQQQ1TBYP"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);


// Инициализация Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Загрузка товаров
const productsContainer = document.getElementById("products");

function renderProduct(doc) {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");
  
  productDiv.innerHTML = `
    <img src="${doc.data().image}" alt="${doc.data().name}">
    <h3>${doc.data().name}</h3>
    <p>${doc.data().price} ₽</p>
    <h2>${doc.data().id}<h2>
  `;
  
  productsContainer.appendChild(productDiv);
}

// Реальное время: слушаем изменения в базе
db.collection("products").onSnapshot(snapshot => {
  productsContainer.innerHTML = "";
  snapshot.forEach(doc => {
    renderProduct(doc);
  });
});
// Регистрация service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("Service Worker зарегистрирован"))
    .catch(err => console.error("Ошибка SW:", err));
}
