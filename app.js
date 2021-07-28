'use strict';

// ------------------------------- Global Variables ------------------------------//
let viewCounter = 0;
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

// let buttonElem;
// let ulElem2 = document.getElementById('clicksCounterUL2');
// let liElem2;

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
  Item.allItems.push(this);
}

Item.allItems = [];

// ------------------------------- Prototype ------------------------------//
Item.prototype.renderItem = function (img, h2) {
  img.src = this.imgPath;
  h2.textContent = this.name;
}

Item.prototype.getLikesPercentage = function (likes, views) {
  this.likesPercentage = Number(this.likes / this.views * 100).toFixed(2);
}

// ------------------------------- Global Functions ------------------------------//
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

  // let rightItemIndex = Math.floor(Math.random() * Item.allItems.length);
  // rightItem = Item.allItems[rightItemIndex];
  // while (leftItem === middleItem || leftItem === rightItem || middleItem === rightItem) {
  //   leftItemIndex = Math.floor(Math.random() * Item.allItems.length);
  //   leftItem = Item.allItems[leftItemIndex];
  //   middleItemIndex = Math.floor(Math.random() * Item.allItems.length);
  //   middleItem = Item.allItems[middleItemIndex];
  // }
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
    let liElem = document.createElement('li');
    if (item.views === 0) {
      liElem.textContent = `${item.name} was not viewed.`;
      ulElem.appendChild(liElem);
    }
    else {
      item.getLikesPercentage();
      liElem.textContent = `${item.name}: ${item.likes} likes out of ${item.views} views. (${item.likesPercentage}%)`;
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

  // for(let i = 0; i <Item.allItems.length; i++){
  //   if(i % 4 === 0){
  //     myColorArr.push('red');
  //   }
  //   else if (i % 4 === 1){
  //     myColorArr.push('blue');
  //   }
  //   else if (i % 4 === 2){
  //     myColorArr.push('green');
  //   }
  //   else {
  //     myColorArr.push('yellow');
  //   }
  // }

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

// function renderResults2() {
//   ulElem2.textContent = '';
//   for (let item of Item.allItems) {
//     let liElem2 = document.createElement('li');
//     if (item.views === 0) {
//       liElem2.textContent = `${item.name} was not viewed.`;
//       ulElem2.appendChild(liElem2);
//     }
//     else{
//       item.getLikesPercentage();
//       liElem2.textContent = `${item.name}: ${item.likes} likes out of ${item.views} views. (${item.likesPercentage}%)`;
//       ulElem2.appendChild(liElem2);
//     }
//   }
// }

function handleClick(e) {
  let imageClicked = e.target.id;
  console.log(imageClicked);
  if (imageClicked === 'leftImg' || imageClicked === 'middleImg' || imageClicked === 'rightImg') {
    clickCounter++;
    console.log(clickCounter);
    if (clickCounter === roundsOfVoting+1) {
      // buttonElem = document.createElement('button');
      // buttonElem.textContent = 'View Results';
      // buttonElem.type = 'button';
      // clickSectionElem.appendChild(buttonElem);
      // buttonElem.addEventListener('click', handleButtonClick);
      // let anchorElem = document.createElement('a');
      // let linkNode = document.createTextNode('View Results');
      // anchorElem.appendChild(linkNode);
      // anchorElem.href = "./results.html"
      // clickSectionElem.appendChild(anchorElem);
      renderChart();
      alert('Thanks for your insight!')
      clickSectionElem.removeEventListener('click', handleClick);
    } else if (imageClicked === 'leftImg') {
      leftItem.likes++;
      renderResults();
      getThreeItems();
      renderNewItems();
    } else if (imageClicked === 'middleImg') {
      middleItem.likes++;
      renderResults();
      getThreeItems();
      renderNewItems();
    } else if (imageClicked === 'rightImg') {
      rightItem.likes++;
      renderResults();
      getThreeItems();
      renderNewItems();
    }
  }
  else {
    alert('That was not a valid selection.');
  }
}

// function handleButtonClick(e){
//   window.open('./results.html');
//   renderResults2();
//   buttonElem.removeEventListener('click', handleButtonClick);
// }

// ------------------------------- Event Listener ------------------------------//

clickSectionElem.addEventListener('click', handleClick);

// ------------------------------- Calling Functions ------------------------------//

new Item('Star Wars Bag', './img/bag.jpg');
new Item('Banana Cutter', './img/banana.jpg');
new Item('iPad Toilet Paper Stand', './img/bathroom.jpg')
new Item('Toeless Galoshes', './img/boots.jpg')
new Item('All-in-One Breakfast Maker', './img/breakfast.jpg')
new Item('Meatball Bubblegum', './img/bubblegum.jpg')
new Item('Inverted Chair', './img/chair.jpg')
new Item('Cthulhu Action Figure', './img/cthulhu.jpg')
new Item('Dog Duck Bill', './img/dog-duck.jpg')
new Item('Dragon Meat', './img/dragon.jpg')
new Item('Pen Utensil Attachments', './img/pen.jpg')
new Item('Microfiber Cleaning Pet Shoes', './img/pet-sweep.jpg')
new Item('2-in-1 Scissors', './img/scissors.jpg')
new Item('Suede Shark Sleeping Bag', './img/shark.jpg')
new Item('Microfiber Cleaning Baby Onesie', './img/sweep.png')
new Item('Star Wars Tauntaun Sleeping Bag', './img/tauntaun.jpg')
new Item('Unicorn Meat', './img/unicorn.jpg')
new Item('Reverse Watering Can', './img/water-can.jpg')
new Item('Classy Wine Glass', './img/wine-glass.jpg')

getThreeItems();
renderNewItems();