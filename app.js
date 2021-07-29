'use strict';

// ------------------------------- Global Variables ------------------------------//
let clickCounter = 0;
const roundsOfVoting = 25;

const ulElem = document.getElementById('clicksCounterUL');
const clickSectionElem = document.getElementById('clickSection');
const leftImgElem = document.getElementById('leftImg');
const leftH2Elem = document.getElementById('leftH2');
const middleImgElem = document.getElementById('middleImg');
const middleH2Elem = document.getElementById('middleH2');
const rightImgElem = document.getElementById('rightImg');
const rightH2Elem = document.getElementById('rightH2');
const buttonElem = document.getElementById('viewResults');

let leftItem = null;
let middleItem = null;
let rightItem = null;

// ------------------------------- Constructor Function------------------------------//
function Item (name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.views = 0;
  this.likes = 0;
  this.likesPercentage = 0;
}

Item.allItems = [];

// ------------------------------- Prototype ------------------------------//
Item.prototype.renderItem = function (img, h2) {
  img.src = this.imgPath;
  h2.textContent = this.name;
}

Item.prototype.getLikesPercentage = function () {
  this.likesPercentage = Number(this.likes / this.views * 100).toFixed(2);
}

// ------------------------------- Global Functions ------------------------------//
function getFromStorage() {
  let storedItems = localStorage.getItem('items');
  if (storedItems) {
    let parsedItems = JSON.parse(storedItems);
    console.log(parsedItems);
    for (let item of parsedItems) {
      let newItem = new Item(item.name, item.imgPath)
      newItem.views = item.views;
      newItem.likes = item.likes;
      Item.allItems.push(newItem);
    }
    renderResults();
  } else {
      Item.allItems.push(new Item('Star Wars Bag', './img/bag.jpg'));
      Item.allItems.push(new Item('Banana Cutter', './img/banana.jpg'));
      Item.allItems.push(new Item('iPad Toilet Paper Stand', './img/bathroom.jpg'));
      Item.allItems.push(new Item('Toeless Galoshes', './img/boots.jpg'));
      Item.allItems.push(new Item('All-in-One Breakfast Maker', './img/breakfast.jpg'));
      Item.allItems.push(new Item('Meatball Bubblegum', './img/bubblegum.jpg'));
      Item.allItems.push(new Item('Inverted Chair', './img/chair.jpg'));
      Item.allItems.push(new Item('Cthulhu Action Figure', './img/cthulhu.jpg'));
      Item.allItems.push(new Item('Dog Duck Bill', './img/dog-duck.jpg'));
      Item.allItems.push(new Item('Dragon Meat', './img/dragon.jpg'));
      Item.allItems.push(new Item('Pen Utensil Attachments', './img/pen.jpg'));
      Item.allItems.push(new Item('Microfiber Cleaning Pet Shoes', './img/pet-sweep.jpg'));
      Item.allItems.push(new Item('2-in-1 Scissors', './img/scissors.jpg'));
      Item.allItems.push(new Item('Suede Shark Sleeping Bag', './img/shark.jpg'));
      Item.allItems.push(new Item('Microfiber Cleaning Baby Onesie', './img/sweep.png'));
      Item.allItems.push(new Item('Star Wars Tauntaun Sleeping Bag', './img/tauntaun.jpg'));
      Item.allItems.push(new Item('Unicorn Meat', './img/unicorn.jpg'));
      Item.allItems.push(new Item('Reverse Watering Can', './img/water-can.jpg'));
      Item.allItems.push(new Item('Classy Wine Glass', './img/wine-glass.jpg'));
  }
}

function putInStorage() {
  let preppedItems = JSON.stringify(Item.allItems);
  localStorage.setItem('items', preppedItems);
}

function getThreeItems() {
  const currentItems = [leftItem, middleItem, rightItem];
  while (currentItems.includes(leftItem)){
    let leftItemIndex = Math.floor(Math.random() * Item.allItems.length);
    leftItem = Item.allItems[leftItemIndex];
  }
  currentItems.push(leftItem);

  while (currentItems.includes(middleItem)){
    let middleItemIndex = Math.floor(Math.random() * Item.allItems.length);
    middleItem = Item.allItems[middleItemIndex];
  }
  currentItems.push(middleItem);

  while (currentItems.includes(rightItem)){
    let rightItemIndex = Math.floor(Math.random() * Item.allItems.length);
    rightItem = Item.allItems[rightItemIndex];
  }
  currentItems.push(rightItem);

  leftItem.views++;
  middleItem.views++;
  rightItem.views++;
}

function renderNewItems() {
  leftItem.renderItem(leftImgElem, leftH2Elem);
  middleItem.renderItem(middleImgElem, middleH2Elem);
  rightItem.renderItem(rightImgElem, rightH2Elem);
}

function renderResults() {
  ulElem.textContent = '';
  for (let item of Item.allItems) {
    console.log(item);
    let liElem = document.createElement('li');
    if (item.views === 0) {
      liElem.textContent = `${item.name} was not viewed.`;
      ulElem.appendChild(liElem);
    }
    else {
      item.getLikesPercentage();
      liElem.textContent = `${item.name}: ${item.likes} likes`;
      ulElem.appendChild(liElem);
    }
  }
}

function renderChart(){
  const ctx = document.getElementById('chart').getContext('2d');
  let myItemNameArr = [];
  let myViewsArr = [];
  let myLikesArr = [];
  let myLikesPercentageArr = [];
  let myColorArr = [];

  for(let item of Item.allItems){
    myItemNameArr.push(item.name);
    myViewsArr.push(item.views);
    myLikesArr.push(item.likes);
    myLikesPercentageArr.push(item.likesPercentage);
  }

  var itemsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: myItemNameArr,
      datasets: [{
          id: 'views',
          label: 'Views',
          data: myViewsArr,
          backgroundColor: 'blue',
          borderColor: 'black',
          borderWidth: 2
        },{
        id: 'likes',
        label: 'Likes',
        data: myLikesArr,
        backgroundColor: 'red',
        borderColor: 'black',
        borderWidth: 2
      },{
        id: 'percentage',
        label: 'Percentage',
        data: myLikesPercentageArr,
        backgroundColor: 'yellow',
        borderColor: 'black',
        borderWidth: 2
      }]
    },
    options: {      
      plugins: {
        title: {
          text: 'Item Views and Likes',
          display: true,
          font: {
            size: 20
          },
          padding: 15
        },
        legend: {
          position: 'bottom'
        }},
      layout: {
        padding: {
          top: 50
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function handleClick(e) {
  let imageClicked = e.target.id;
  console.log(imageClicked);
  if (imageClicked === 'leftImg' || imageClicked === 'middleImg' || imageClicked === 'rightImg') {
    clickCounter++;
      if (imageClicked === 'leftImg') {
      leftItem.likes++;
    } if (imageClicked === 'middleImg') {
      middleItem.likes++;
    } if (imageClicked === 'rightImg') {
      rightItem.likes++;
    } if (clickCounter === roundsOfVoting) {
    alert('Thanks for your insight!');
    buttonElem.style.display = 'block';
    clickSectionElem.removeEventListener('click', handleClick);
    renderResults();
    } else {
    getThreeItems();
    renderNewItems();
    }
  } else {
    alert('That was not a valid selection.');
  }
  
}

function handleButtonClick(){
  renderChart();
  putInStorage();
  buttonElem.removeEventListener('click', handleButtonClick);
}

// ------------------------------- Event Listener ------------------------------//
clickSectionElem.addEventListener('click', handleClick);
buttonElem.addEventListener('click', handleButtonClick);

// ------------------------------- Calling Functions ------------------------------//
getFromStorage();
getThreeItems();
renderNewItems();