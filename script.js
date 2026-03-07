'use strict';
import { menuArray } from './data.js';
import { nanoid } from 'nanoid';
const grabInfoSec = document.querySelector('.details_info');
const itemBOX = document.querySelector('.item__box');
const expeseResult = document.querySelector('.net__expense');
const submitPayment = document.querySelector('.order__submit--btn');
const popupMenu = document.querySelector('.popup_section');
const orderSec = document.querySelector('.order__section');
const tnxSec = document.querySelector('.thank_you--sec');
const infoSend = document.querySelector('.pay__submit');
const form = document.getElementById('myForm');
let purchaseInfo = [];
let order = false;
menuArray.forEach(item => {
  console.log(item);
  const card = document.createElement('div');
  card.className = 'app__card';
  card.innerHTML = `
        <img src=${item.img} alt="" class="app__card-icon">
        <section class="card_info">
          <h2>${item.name}</h2>
          <p>${item.ingredients}</p>
          <h4>$${item.price}</h4>
        </section>
        <button class="card-btn">
          <i class="fa-solid fa-plus"></i>
        </button>
  `;

  grabInfoSec.appendChild(card);
});

grabInfoSec.addEventListener('click', e => {
  if (
    e.target.classList.contains('card-btn') ||
    e.target.classList.contains('fa-plus')
  ) {
    order = false;
    renderTnx();
    const uniqueId = nanoid();
    const parentDiv = e.target.closest('.app__card');
    const infoDiv = parentDiv.querySelector('.card_info');
    const itemName = infoDiv.querySelector('h2').textContent;
    const itemPrice = infoDiv.querySelector('h4').textContent.slice(1);
    console.log(itemName, itemPrice);
    purchaseInfo.push({
      id: uniqueId,
      name: itemName,
      price: Number(itemPrice),
    });
    renderPayment();
  }
});

function renderPayment() {
  itemBOX.innerHTML = '';
  orderSec.style.display = 'block';
  purchaseInfo.map(ele => {
    itemBOX.innerHTML += `
    <div class='order_item'>
    <p>${ele.name}<button class="remove_item" data-num=${ele.id}>❌</button></p>
    <p>$${ele.price}</p>
    </div>
    `;
    expeseResult.textContent = purchaseInfo
      .map(ele => ele.price)
      .reduce((a, c) => a + c, 0);
  });
}

itemBOX.addEventListener('click', e => {
  if (e.target.classList.contains('remove_item')) {
    const targetEle = e.target.dataset.num;
    purchaseInfo = purchaseInfo.filter(ele => ele.id !== targetEle);
    console.log(purchaseInfo);
    renderPayment();
    expeseResult.textContent = purchaseInfo
      .map(ele => ele.price)
      .reduce((a, c) => a + c, 0);
  }
});

submitPayment.addEventListener('click', () => {
  popupMenu.style.display = 'block';
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('name');
  console.log(id.value);
  document.querySelector('.buyer').textContent = id.value;
  popupMenu.style.display = 'none';
  order = true;
  renderTnx();
  orderSec.style.display = 'none';
  itemBOX.innerHTML = '';
  purchaseInfo=[];
  form.reset();
});

function renderTnx() {
  if (order) tnxSec.style.display = 'block';
  else tnxSec.style.display = 'none';
}


// dark mode
const displayData = localStorage.getItem('displayMode');
if(displayData==='light'){
  document.querySelector('.app').classList.remove('dark_Mode');
}else{
  document.querySelector('.app').classList.add('dark_Mode');
}



document.querySelector('.toggle_Mode').addEventListener('click',()=>{
  const data=localStorage.getItem('displayMode')

  if(data==='light'){
    document.querySelector('.app').classList.add('dark_Mode');
    localStorage.setItem('displayMode', 'dark');
  }
  if(data==='dark'){
    document.querySelector('.app').classList.remove('dark_Mode');
    localStorage.setItem('displayMode', 'light');
  }
  if (!data) {
    document.querySelector('.app').classList.remove('dark_Mode');
    localStorage.setItem('displayMode', 'light');
  }
});