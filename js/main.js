let data = document.querySelector(".row");
let search = document.querySelector(".searchBox");
let contant = document.querySelector(".contant");
$("#Categories").click(getCategories);
$("#Area").click(getArea);
$("#Ingredients").click(getIngredients);
$("#Contact-Us").click(displayContact);
$("#Search").click(displaySearch);
closeNav();
$(".changeIcon").click(() => {
  if ($(".navbar").css("left") == "0px") {
    closeNav();
  } else {
    openNav();
  }
});
$(document).ready(() => {
  searchByName("").then(() => {
    $(".loading").fadeOut(500);
    $("body").css("overflow", "visible");
  });
});
function closeNav() {
  $(".navbar").animate({ left: -$(".nav-body").outerWidth(true) }, 500);
  $(".changeIcon").removeClass("fa-x");
  $(".changeIcon").addClass("fa-align-justify");
  $(".links li").animate({ top: "300px" }, 500);
}
function openNav() {
  $(".navbar").animate({ left: 0 }, 500);
  $(".changeIcon").addClass("fa-x");
  $(".changeIcon").removeClass("fa-align-justify");
  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate({ top: "0px" }, (i + 5) * 100);
  }
}

async function getCategories() {
  closeNav();
  data.innerHTML = "";
  search.innerHTML = "";
  contant.innerHTML = "";
  $(".loading").fadeIn(500);
  const api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const response = await api.json();
  displayCategories(response.categories);
  $(".loading").fadeOut(500);
}
function displayCategories(arr) {
  let cols = "";
  for (let i = 0; i < arr.length; i++) {
    cols += `
        <div class="col-lg-3 col-md-4">
        <div class="img-layer position-relative overflow-hidden" onclick= filterCategories("${
          arr[i].strCategory
        }")>
            <img src="${
              arr[i].strCategoryThumb
            }" alt="" class="w-100 rounded-2">
            <div class="layer position-absolute border rounded-2 text-center">
            <h3 class ="">${arr[i].strCategory}</h3>
            <p class="p-1">${arr[i].strCategoryDescription
              .split(" ")
              .slice(0, 18)
              .join(" ")}</p> 
            </div>
        </div>
    </div>
        `;
  }
  data.innerHTML = cols;
}

async function filterCategories(category) {
  $(".loading").fadeIn(500);
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  const response = await api.json();
  displayFilterCategories(response.meals);
  $(".loading").fadeOut(500);
}
function displayFilterCategories(arr) {
  let cols = "";
  for (let i = 0; i < arr.length; i++) {
    cols += `
        <div class="col-md-3">
        <div class="img-layer position-relative overflow-hidden" onclick =" mealsDetails('${arr[i].idMeal}')">
            <img src="${arr[i].strMealThumb}" alt="" class="w-100 rounded-2">
            <div class="layer position-absolute border rounded-2 d-flex align-items-center ">
                <h3>${arr[i].strMeal}</h3>
            </div>
        </div>
    </div>
        `;
  }
  data.innerHTML = cols;
}
async function getArea() {
  closeNav();
  data.innerHTML = "";
  search.innerHTML = "";
  contant.innerHTML = "";
  $(".loading").fadeIn(500);
  const api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  const response = await api.json();
  displayArea(response.meals);
  $(".loading").fadeOut(500);
}
function displayArea(arr) {
  let cols = "";
  for (let i = 0; i < arr.length; i++) {
    cols += `
        <div class="col-md-3">
        <div class="cursor-pointer text-white text-center" onclick= filterByArea("${arr[i].strArea}")>
            <i class="fa-solid fa-house-laptop fa-5x"></i>
            <h3 class="cursor-pointer">${arr[i].strArea}</h3>
        </div>
    </div>
        `;
  }
  data.innerHTML = cols;
}

async function filterByArea(area) {
  $(".loading").fadeIn(500);
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  const response = await api.json();
  displayFilterByArea(response.meals);
  $(".loading").fadeOut(500);
}
function displayFilterByArea(arr) {
  let cols = "";
  for (let i = 0; i < arr.length; i++) {
    cols += `
        <div class="col-md-3">
        <div class="img-layer position-relative overflow-hidden" onclick = mealsDetails(${arr[i].idMeal})>
            <img src="${arr[i].strMealThumb}" alt="" class="w-100 rounded-2">
            <div class="layer position-absolute border rounded-2 d-flex align-items-center ">
                <h3 class="p-2">${arr[i].strMeal}</h3>
            </div>
        </div> 
    </div>
        `;
  }
  data.innerHTML = cols;
}

async function getIngredients() {
  closeNav();
  data.innerHTML = "";
  search.innerHTML = "";
  contant.innerHTML = "";
  $(".loading").fadeIn(500);
  const api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  const response = await api.json();
  displayIngredients(response.meals);
  $(".loading").fadeOut(500);
}
function displayIngredients(arr) {
  let cols = "";
  for (let i = 0; i < 20; i++) {
    cols += `
        <div class="col-md-3">
        <div class="text-white text-center cursor-pointer" onclick = filterIngredients("${
          arr[i].strIngredient
        }")>
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${arr[i].strIngredient}</h3>
            <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
        </div>
    </div>
        `;
  }
  data.innerHTML = cols;
}
async function filterIngredients(ingredient) {
  $(".loading").fadeIn(500);
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  const response = await api.json();
  displayFilterIngredients(response.meals);
  $(".loading").fadeOut(500);
}
function displayFilterIngredients(arr) {
  let cols = "";
  for (let i = 0; i < arr.length; i++) {
    cols += `
        <div class="col-md-3">
        <div class="img-layer position-relative overflow-hidden" onclick = mealsDetails(${arr[i].idMeal})>
            <img src="${arr[i].strMealThumb}" alt="" class="w-100 rounded-2">
            <div class="layer position-absolute border rounded-2 d-flex align-items-center ">
                <h3 class="p-2">${arr[i].strMeal}</h3>
            </div>
        </div> 
    </div>
        `;
  }
  data.innerHTML = cols;
}
async function mealsDetails(id) {
  data.innerHTML = "";
  search.innerHTML = "";
  contant.innerHTML = "";
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const response = await api.json();
  displayDetails(response.meals[0]);
}
function displayDetails(arr) {
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (arr[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        arr[`strMeasure${i}`]
      } ${arr[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = arr.strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }
  let cols = `
      <div class="col-md-4 text-white">
      <div>
    <img src="${arr.strMealThumb}" alt="" class="w-100">
    <h1 class="mt-3">${arr.strMeal}</h1>
      </div>
     </div>
     <div class="col-md-8 text-white">
       <h3>Instructions</h3>
        <p>${arr.strInstructions}</p>
        <h3>Area : <span>${arr.strArea}</span></h3>
        <h3>Category : <span>${arr.strCategory}</span></h3>
        <h3>Recipes : </h3>
        <ul class="list-unstyled  d-flex flex-wrap g-3 ">
              ${ingredients}
        </ul>
        <ul class="list-unstyled  d-flex flex-wrap g-3 ">
                ${tagsStr}
        </ul>
        <a href="${arr.strSource}" target="_blank" class="btn btn-success">Source</a>
        <a href="${arr.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>

        </div>
`;
  data.innerHTML = cols;
}
function displaySearch() {
  closeNav();
  data.innerHTML = "";
  contant.innerHTML = "";
  search.innerHTML = `
    <div class="row g-5 py-5 justify-content-center align-items-center ">
                <div class="col-md-6">
                    <input type="search" onkeyup="searchByName(this.value)" placeholder="Search By Name" class="form-control text-white rounded-2 bg-black" id="searchName">
                </div>
                <div class="col-md-6">
                    <input type="search" onkeyup="searchByFirstLetter(this.value)" maxlength= "1" placeholder="Search By First Letter" class="form-control text-white rounded-2 bg-black">
                </div>
   </div> 
    `;
}
async function searchByName(name) {
  data.innerHTML = "";
  $(".loading").fadeIn(500);
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  const response = await api.json();
  $(".loading").fadeOut(500);
  response.meals ? displayMeals(response.meals) : displayMeals([]);
}
async function searchByFirstLetter(letter) {
  data.innerHTML = "";
  $(".loading").fadeIn(500);
  letter == "" ? (letter = "a") : "";
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  const response = await api.json();
  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".loading").fadeOut(500);
}
function displayMeals(arr) {
  let cols = "";
  for (let i = 0; i < arr.length; i++) {
    cols += `
        <div class="col-md-3">
        <div class="img-layer position-relative overflow-hidden" onclick = mealsDetails(${arr[i].idMeal})>
            <img src="${arr[i].strMealThumb}" alt="" class="w-100 rounded-2">
            <div class="layer position-absolute border rounded-2 d-flex align-items-center ">
                <h3 class="p-2">${arr[i].strMeal}</h3>
            </div>
        </div> 
    </div>
        `;
  }

  data.innerHTML = cols;
}

function displayContact() {
  closeNav();
  data.innerHTML = "";
  search.innerHTML = "";
  $(".loading").fadeIn(500);
  contant.innerHTML = `
    <div class="contact min-vh-100  ">
    <div class="container text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="name" onkeyup="inputsValidation()"  type="text" class="form-control" placeholder="Enter Your Name">
                <p id="resultName" >
                </p>
            </div>
            <div class="col-md-6">
                <input id="email" onkeyup="inputsValidation()"  type="email" class="form-control " placeholder="Enter Your Email">
                <p id="result" >
                </p>
            </div>
            <div class="col-md-6">
                <input id="phone" onkeyup="inputsValidation()"  type="number" class="form-control " placeholder="Enter Your Phone">
                <p id="resultPhone">
                </p>
            </div>
            <div class="col-md-6">
                <input id="age" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <p id="resultAge" ">
                </p>
            </div>
            <div class="col-md-6">
                <input  id="pass" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <p id="resultPass" >
                </p>
            </div>
            <div class="col-md-6">
                <input  id="repass" onkeyup="inputsValidation()"  type="password" class="form-control " placeholder="Repassword">
                <p id="resultRepass" >
                </p>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> 
    `;
  $(".loading").fadeOut(500);
}

function validateName() {
  const $resultName = $("#resultName");
  const pattern = /^[a-zA-Z\s]+$/i;
  if (pattern.test($("#name").val())) {
    $resultName.text($("#name").val() + " is valid.");
    $resultName.css("color", "green");
    return true;
  } else {
    $resultName.text($("#name").val() + " is invalid.");
    $resultName.css("color", "red");
    return false;
  }
}
function validateEmail() {
  const $result = $("#result");
  const pattern =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (pattern.test($("#email").val())) {
    $result.text($("#email").val() + " is valid.");
    $result.css("color", "green");
    return true;
  } else {
    $result.text($("#email").val() + " is invalid.");
    $result.css("color", "red");
    return false;
  }
}
function validatePhone() {
  const $resultPhone = $("#resultPhone");
  const pattern = /^(01)[0125][0-9]{8}$/;
  if (pattern.test($("#phone").val())) {
    $resultPhone.text($("#phone").val() + " is valid.");
    $resultPhone.css("color", "green");
    return true;
  } else {
    $resultPhone.text($("#phone").val() + " Enter Egyption phone number");
    $resultPhone.css("color", "red");
    return false;
  }
}
function validateAge() {
  const $resultAge = $("#resultAge");
  const pattern = /^([1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
  if (pattern.test($("#age").val())) {
    $resultAge.text($("#age").val() + " is valid.");
    $resultAge.css("color", "green");
    return true;
  } else {
    $resultAge.text($("#age").val() + " Enter age from 1 to 200");
    $resultAge.css("color", "red");
    return false;
  }
}
function validatePass() {
  const $resultPass = $("#resultPass");
  const pattern = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  if (pattern.test($("#pass").val())) {
    $resultPass.text($("#pass").val() + " is valid.");
    $resultPass.css("color", "green");
    return true;
  } else {
    $resultPass.text(
      $("#pass").val() +
        " Enter valid password *Minimum eight characters, at least one letter and one number:*."
    );
    $resultPass.css("color", "red");
    return false;
  }
}
function repassValidate() {
  const $resultRepass = $("#resultRepass");
  if ($("#pass").val() == $("#repass").val()) {
    $resultRepass.text(" is valid.");
    $resultRepass.css("color", "green");
    return true;
  } else {
    $resultRepass.text(" Enter valid password ");
    $resultRepass.css("color", "red");
    return false;
  }
}
function inputsValidation() {
  if (
    validateName() &&
    validateEmail() &&
    validatePhone() &&
    validateAge() &&
    validatePass() &&
    repassValidate() == true
  ) {
    $("#submitBtn").removeAttr("disabled");
  } else {
    $("#submitBtn").attr("disabled", "disabled");
  }
}
