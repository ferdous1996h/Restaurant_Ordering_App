"use strict";
import { menuArray } from "./data.js";
const grabInfoSec = document.querySelector(".details_info");
const itemBOX = document.querySelector(".item__box");
const expeseResult = document.querySelector(".net__expense");
const submitPayment = document.querySelector(".order__submit--btn");
const popupMenu = document.querySelector(".popup_section");
const orderSec = document.querySelector(".order__section");
const tnxSec = document.querySelector(".thank_you--sec");
const infoSend = document.querySelector(".pay__submit");
const form = document.getElementById("myForm");
let sum = [];
let purchaseInfo = [];
menuArray.forEach((item) => {
  console.log(item);
  const card = document.createElement("div");
  card.className = "app__card";
  card.innerHTML = `
        <img src=${item.img} alt="" class="app__card-icon">
        <div class="card_info">
          <h2>${item.name}</h2>
          <p style="color: #8B8B8B;">${item.ingredients}</p>
          <h4>$${item.price}</h4>
        </div>
        <button class="card-btn">
          <i class="fa-solid fa-plus"></i>
        </button>
  `;
  const punchItem = card.querySelector(".card-btn");
  punchItem.addEventListener("click", (e) => {
    purchaseInfo.push({
      name: item.name,
      price: item.price,
    });
    tnxSec.style.display = "none";
    orderSec.style.display = "block";
    const data = document.createElement("div");
    data.className = "order_item";
    data.innerHTML = `
         <!-- <p>${item.name}<button class="remove_item">❌</button></p>-->
          <p>${item.name}</p>
          <p>$${item.price}</p>
    `;
    itemBOX.appendChild(data);
    sum.push(item.price);
    expeseResult.textContent = sum.reduce((a, b) => a + b, 0);

    // data.querySelector(".remove_item").addEventListener("click", () => {
    //   console.log("hi");
    //   console.log(purchaseInfo);
    // });
  });
  grabInfoSec.appendChild(card);
});
submitPayment.addEventListener("click", () => {
  popupMenu.style.display = "block";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("name");
  console.log(id.value);
  document.querySelector(".buyer").textContent = id.value;
  popupMenu.style.display = "none";
  tnxSec.style.display = "block";
  orderSec.style.display = "none";
  sum = [];
  itemBOX.innerHTML = "";
  form.reset();
});
// gu
