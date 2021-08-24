///////////////////////////////////////////
/*============= Bad Way =============*/
//////////////////////////////////////////
/* const increment = (count, total, price) => {
  const countInput = document.getElementById(count);
  const subTotal=document.getElementById('sub-total');
  let countNumber = parseInt(countInput.value);
  const newCountNumber = countNumber + 1;
  if (isNaN(newCountNumber)){
    countInput.value = 0;
    document.getElementById(total).innerText = "$0";
    return;
  }
  countInput.value = newCountNumber;
  const totalAmount = "$" + newCountNumber * price;
  console.log(totalAmount);
  document.getElementById(total).innerText = totalAmount;


};

const decrement = (count, total, price) => {
  const countInput = document.getElementById(count);
  let countNumber = parseInt(countInput.value);
  const newCountNumber = countNumber - 1;
  if (newCountNumber < 0) return;

  countInput.value = newCountNumber;
  const totalAmount = "$" + newCountNumber * price;
  if (totalAmount < "$0") return;
  document.getElementById(total).innerText = totalAmount;
};

document.getElementById("case-increase").addEventListener("click", function () {
  increment("case-count", "case-total", 59);
});
document.getElementById("case-count").addEventListener("keyup", function () {
  increment("case-count", "case-total", 59);
});
document.getElementById("phone-increase").addEventListener("click", function () {
    increment("phone-count", "phone-total", 1219);
  });
document.getElementById("phone-count").addEventListener("keyup", function () {
  increment("phone-count", "phone-total", 1219);
});

document.getElementById("case-decrease").addEventListener("click", function () {
  decrement("case-count", "case-total", 59);
});
document.getElementById("phone-decrease").addEventListener("click", function () {
    decrement("phone-count", "phone-total", 1219);
});
 */
///////////////////////////////////////////
/*============= Good Way =============*/
//////////////////////////////////////////

/* const handleProductChange = (isIncreased, product) => {
  const productInput = document.getElementById(product + "-count");
  const productNumber = parseInt(productInput.value);
  let productCount = productNumber;

  if (isIncreased) {
    productCount = productNumber + 1;
  } else if (isIncreased === false && productCount > 0) {
    productCount = productNumber - 1;
  }

  const productTotal = document.getElementById(product + "-total");
  productTotal.innerText =
    "$" + (product === "phone" ? productCount * 1219 : productCount * 59);
  productInput.value = productCount;
  updateTotal();
};
const updateTotal = () => {
  const numOfPhone = stringToNumber("phone");
  const numOfCase = stringToNumber("case");

  const subAmount = numOfPhone * 1219 + numOfCase * 59;
  document.getElementById("sub-total").innerText = "$" + subAmount;

  const taxAmount = Math.round(subAmount * 0.1);
  document.getElementById("tax").innerText = "$" + taxAmount;

  document.getElementById("total").innerText = "$" + (subAmount + taxAmount);
};
const stringToNumber = (product) => {
  const numOfProduct = document.getElementById(product + "-count").value;
  return parseInt(numOfProduct);
};

const removeItems = document.getElementsByClassName("remove-item");
for (let i = 0; i < removeItems.length; i++) {
  const removeCard = removeItems[i];
  removeCard.addEventListener("click", (event) => {
    event.target.parentElement.parentElement.parentElement.remove();
  });
}

///////////////////////////////////////////
/*============= Better Way =============*/
//////////////////////////////////////////

/*
 /////All Element 
const phoneTotal = document.getElementById("phone-total");
const caseTotal = document.getElementById("case-total");
const tax = document.getElementById("tax");
const total = document.getElementById("total");
const counterContainer = document.querySelector(".cart");

///////// Counter 
const counter = (isIncreased, type, price) => {
  const productInput = document.getElementById(`${type}-count`);
  const productNumber = +productInput.value;
  //prettier-ignore
  productInput.value = isIncreased ? productNumber + 1  : productNumber > 0 ? productNumber - 1 : 0;
  const productPrice = document.getElementById(`${type}-total`);
  productPrice.textContent = +productInput.value * price;
  totalCost();
};
/////Total Cost 
const totalCost = function () {
  const price = +phoneTotal.textContent + +caseTotal.textContent;
  document.querySelector("#sub-total").textContent = "$" + price;
  const taxAmount = price / 10;
  tax.textContent = "$" + taxAmount;
  total.textContent = taxAmount + price;
};
//// Event Handler 

counterContainer.addEventListener("click", function (event) {
  console.log("click", event.target.tagName);

  if (event.target.classList.contains("increment-btn")) incrementCount(event);
  if (event.target.classList.contains("decrement-btn")) decrementCount(event);
});

const incrementCount = function (event) {
  console.log("Click");
  counter(true, event.target.dataset.type, event.target.dataset.price);
};
const decrementCount = function (event) {
  counter(false, event.target.dataset.type, event.target.dataset.price);
};
 */

///////////////////////////////////////////////////
/*============= Object Oriented Way =============*/
//////////////////////////////////////////////////
const phoneTotal = document.getElementById("phone-total");
const caseTotal = document.getElementById("case-total");
const tax = document.getElementById("tax");
const total = document.getElementById("total");
const counterContainer = document.querySelector(".cart");

class Counter {
  constructor() {
    counterContainer.addEventListener("click", this.handler);
  }

  count(isIncreased, type, price) {
    console.log("count clicked");
    console.log(isIncreased, type, price);
    const productInput = document.getElementById(`${type}-count`);
    const productNumber = +productInput.value;
    //prettier-ignore
    productInput.value = isIncreased ? productNumber + 1  : productNumber > 0 ? productNumber - 1 : 0;
    const productPrice = document.getElementById(`${type}-total`);
    productPrice.textContent = +productInput.value * price;
    this.calcTotalCost();
  }

  handler(event) {
    const { type, price } = event.target.dataset;
    // if (event.target.classList.contains("increment-btn")) {
    //   this.count(true, type, price);
    // }
    if (event.target.classList.contains("decrement-btn")) {
      this.count(false, type, price);
    }
    if (event.target.classList.contains("increment-btn")) {
      // this.count(true, type, price);

      this.count(true, type, price);
    }
  }

  calcTotalCost() {
    const price = +phoneTotal.textContent + +caseTotal.textContent;
    document.querySelector("#sub-total").textContent = "$" + price;
    const taxAmount = price / 10;
    tax.textContent = "$" + taxAmount;
    total.textContent = taxAmount + price;
  }
}
const count = new Counter();
