let navbar = $("nav")

let hamburgerMenue = $(".nav-header .hamburger .fa-bars")

let menue = $(".nav-header .hamburger")

let xMark = $(".nav-header .hamburger .fa-xmark")

let links = $(".nav-tabs ul li")

hamburgerMenue.click(function(){
  hamburgerMenue.addClass("d-none")
  xMark.removeClass("d-none")
  navbar.animate({left : "0"}


  )
  for (let i = 0; i < 5; i++) {
    links.eq(i).animate({
        top: 0
    }, (i + 5) * 100)
}
})

function closeNavbar(){
  
    hamburgerMenue.removeClass("d-none")
    xMark.addClass("d-none")
    navbar.animate({left : "-312px"})
    
    links.animate({
      top: 300
  }, 500)
  
}

xMark.click(function(){
  closeNavbar()
})

function showMeals(arr){
  let meals = ""
  for(let i=0 ; i<arr.length; i++){
    meals += `<div class=" figure col-md-3">
              <figure onclick="getMealDetails('${arr[i].idMeal}')" class="show-meal-figure  position-relative overflow-hidden ">
                <img src="${arr[i].strMealThumb}" alt="meals photo" class="w-100 rounded-3">
                <figcaption class="show-meal-caption position-absolute bg-white bg-opacity-75 d-flex justify-content-center align-items-center rounded-3">
                  <h2>${arr[i].strMeal}</h2>
                </figcaption>
              </figure>
          </div>`
  }
  document.querySelector(".show-meals-row").innerHTML =meals
  
}

async function getmeals(){
  let loading = $(".loading")
  loading.removeClass("d-none")
let api =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
let response = await api.json()

showMeals(response.meals.slice(0,25))

  
    loading.addClass("d-none")
  
  // console.log(response);
}

function getCategories(){
  $("nav .navbar .tab-links ul .category").click(async function(){
  
    let loading = $(".loading")
    loading.removeClass("d-none")
    document.querySelector(".details-row").innerHTML =``
    $(".area").addClass("d-none")
    $(".ingrediants-sec").addClass("d-none")
    $(".search-form").addClass("d-none")
    $(".contact-form").addClass("d-none")

    document.querySelector(".show-meals .show-meals-row").innerHTML =``
    $(".categories").removeClass("d-none")
  let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  let response = await api.json()

  displayCategories(response.categories)
  closeNavbar()


    loading.addClass("d-none")
  

})}

function displayCategories(categories){

  
    let category = ``
    for(let i=0; i< categories.length;i++ ){
      category +=`<div class="col-md-3 category-card on " >
            <figure onclick="getCategoryMeals('${categories[i].strCategory}')"  class="position-relative catrgory-figure">
              <img
                src="${categories[i].strCategoryThumb}"
                class="w-100 rounded-3"
                alt="Category Photo"
              />
              <figcaption class="figure-caption position-absolute rounded-3 top-0 end-0 start-0 bottom-0 bg-white bg-opacity-75 text-black text-center d-flex justify-content-center align-items-center flex-column">
                <h2>${categories[i].strCategory}</h2>
                <p>
                  ${categories[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}
                </p>
              </figcaption>
            </figure>
          </div>`
    }
    document.querySelector(".categories .category-row").innerHTML = category
  }
  
  async function getCategoryMeals(category) {

    let loading = $(".loading")
    loading.removeClass("d-none")

    closeNavbar()

    document.querySelector(".category-row").innerHTML =``
    document.querySelector(".show-meals .show-meals-row").innerHTML =``


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayCategorymeals(response.meals.slice(0,20))
    
    
      loading.addClass("d-none")
    

}

function displayCategorymeals(arr){
  let meals = ``
  for(let i=0 ; i<arr.length ; i++){
    meals += `<div class=" figure col-md-3">
              <figure onclick="getMealDetails('${arr[i].idMeal}')" class="show-meal-figure  position-relative overflow-hidden ">
                <img src="${arr[i].strMealThumb}" alt="meals photo" class="w-100 rounded-3">
                <figcaption class="show-meal-caption text-center position-absolute bg-white bg-opacity-75 d-flex justify-content-center align-items-center rounded-3">
                  <h2>${arr[i].strMeal}</h2>
                </figcaption>
              </figure>
          </div>`
  }
  document.querySelector(".categories .category-row").innerHTML = meals
}


getCategories()


  async function getMealDetails(mealID) {

    let loading = $(".loading")
  loading.removeClass("d-none")

    closeNavbar()
    document.querySelector(".category-row").innerHTML =``
    document.querySelector(".show-meals .show-meals-row").innerHTML =``
    $(".meal-details").removeClass("d-none")
    $(".search-form").addClass("d-none")
    $(".contact-form").addClass("d-none")

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await api.json();
    displayMealDetails(respone.meals[0])
    
    
      loading.addClass("d-none")
    

}

  

function displayMealDetails(meal){
  
  let ingredients = ``

  for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
          ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
      }
  }

  let tags = meal.strTags?.split(",")
  // let tags = meal.strTags.split(",")
  if (!tags) tags = []

  let tagsStr = ''
  for (let i = 0; i < tags.length; i++) {
      tagsStr += `
      <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
  }



  details = `<div class="col-md-4">
            <div class="meal-img">
              <img
                src="${meal.strMealThumb}"
                class="w-100 rounded-3"
                alt="Meal Photo"
              />
              <h2 class="mt-3 fw-medium fs-2">${meal.strMeal}</h2>
            </div>
          </div>
          
          <div class="col-md-8">
            <div class="inner-meal-detail">
              <h2>Instructions</h2>
              <p>
              ${meal.strInstructions}
              </p>
              <h3><span>Area : </span>${meal.strArea}</h3>
              <h3><span>Category : </span>${meal.strCategory}</h3>
              <h3 class="mb-2"><span>Recipes : </span></h3>

              <ul class="d-flex flex-wrap list-unstyled row-gap-3 recipe">
                ${ingredients}
              </ul>

              <h3 class="mb-2">Tags :</h3>

              <ul class=" gang d-flex flex-wrap list-unstyled row-gap-3 tags mb-4">
                ${tagsStr}
              </ul>

              <a
                href="${meal.strSource}"
                class="source p-2 rounded-3 me-2 bg-success text-white text-decoration-none"
                target="_blank">Source</a
              >
              <a
                href="${meal.strYoutube}"
                class="youtube p-2 rounded-3 me-2 bg-danger text-white text-decoration-none"
                target="_blank">Youtube</a
              >
            </div>
          </div>`
      
document.querySelector(".details-row").innerHTML = details

}


async function getArea() {
  $("nav .navbar .tab-links ul .area-link").click(async function(){
    let loading = $(".loading")
  loading.removeClass("d-none")

        closeNavbar()
        $(".ingrediants-sec").addClass("d-none")
        // document.querySelector(".details-row").innerHTML =``
    $(".meal-details").addClass("d-none")
    $(".search-form").addClass("d-none")
    $(".contact-form").addClass("d-none")
        // $(".details-row").addClass("d-none")
        document.querySelector(".show-meals .show-meals-row").innerHTML =``
        $(".categories").addClass("d-none")
        $(".area").removeClass("d-none")
  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  respone = await respone.json()
  displayArea(respone.meals)

  
    loading.addClass("d-none")
  
  })
}

function displayArea(areas){
  let area =``
  for(let i=0;i<areas.length;i++){
    area +=`<div class="col-md-3 mb-3">
            <div onclick="getAreaMeals('${areas[i].strArea}')" class="area-card d-flex flex-column justify-content-center align-items-center text-white">
              <i class="fa-solid fa-house-laptop fa-4x"></i>
              <h3>${areas[i].strArea}</h3>
            </div>
          </div>`
  }
  document.querySelector(".area-row").innerHTML=area
}

async function getAreaMeals(area){
  let loading = $(".loading")
  loading.removeClass("d-none")

  closeNavbar()
        document.querySelector(".details-row").innerHTML =``
        document.querySelector(".show-meals .show-meals-row").innerHTML =``
        $(".categories").addClass("d-none")
        $(".area").addClass("d-none")

  let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  let response = await api.json()
console.log(response);
displayAreaMeals(response.meals.slice(0,20))


  loading.addClass("d-none")

}

function displayAreaMeals(meals){
let cartona =``
for(let i=0 ; i<meals.length;i++){
  cartona += `<div class=" figure col-md-3">
              <figure onclick="getMealDetails('${meals[i].idMeal}')" class="show-meal-figure  position-relative overflow-hidden ">
                <img src="${meals[i].strMealThumb}" alt="meals photo" class="w-100 rounded-3">
                <figcaption class="show-meal-caption text-center position-absolute bg-white bg-opacity-75 d-flex justify-content-center align-items-center rounded-3">
                  <h2>${meals[i].strMeal}</h2>
                </figcaption>
              </figure>
          </div>`
}
document.querySelector(".show-meals .show-meals-row").innerHTML =cartona
console.log(cartona);
}

function getIngrediants(){
  $("nav .navbar .tab-links ul .ingrediants").click(async function(){
    let loading = $(".loading")
    loading.removeClass("d-none")
    closeNavbar()
    $(".ingrediants-sec").removeClass("d-none")
    document.querySelector(".details-row").innerHTML =``
    document.querySelector(".show-meals .show-meals-row").innerHTML =``
    $(".meal-details").addClass("d-none")
    $(".search-form").addClass("d-none")
    $(".contact-form").addClass("d-none")
    $(".categories").addClass("d-none")
    $(".area").addClass("d-none")
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let response = await api.json()
    displayingrediants(response.meals.slice(0,20))
    loading.addClass("d-none")
  })
}

function displayingrediants(ingrediants){
let cartona =``
for(let i=0;i<ingrediants.length;i++){
  cartona += `<div class="col-md-3">
            <div onclick="getIngrediantsMeals('${ingrediants[i].strIngredient}')" class="ingrediants-card text-white text-center">
              <i class="fa-solid fa-drumstick-bite fa-4x mb-3"></i>
              <h3 class="mb-3">${ingrediants[i].strIngredient}</h3>
              <p>
                ${ingrediants[i].strDescription.split(" ").slice(0,20).join(" ")}
              </p>
            </div>
          </div>`
}
document.querySelector(".ingrediants-sec .ingrediants-row").innerHTML = cartona
}

async function  getIngrediantsMeals(ingrediants){
  let loading = $(".loading")
  loading.removeClass("d-none")
  closeNavbar()
  document.querySelector(".details-row").innerHTML =``
  document.querySelector(".show-meals .show-meals-row").innerHTML =``
  $(".categories").addClass("d-none")
  $(".ingrediants-sec").addClass("d-none")

  let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediants}`)
  let response = await api.json()
  displayIngrediantsMeals(response.meals)
  loading.addClass("d-none")
}

function displayIngrediantsMeals(ingrediants){
  let cartona = ``
  for(let i=0;i<ingrediants.length;i++){
    cartona +=`<div class=" figure col-md-3">
              <figure onclick="getMealDetails('${ingrediants[i].idMeal}')" class="show-meal-figure  position-relative overflow-hidden ">
                <img src="${ingrediants[i].strMealThumb}" alt="meals photo" class="w-100 rounded-3">
                <figcaption class="show-meal-caption text-center position-absolute bg-white bg-opacity-75 d-flex justify-content-center align-items-center rounded-3">
                  <h2>${ingrediants[i].strMeal}</h2>
                </figcaption>
              </figure>
          </div>`
  }
  document.querySelector(".show-meals .show-meals-row").innerHTML =cartona
}

function showSearchInput(){
  document.querySelector(".search-row").innerHTML=`<div class="col-md-6">
            <input type="search" name="by-name" id="search-name" placeholder="Search By Name" class="form-control  bg-black ps-3 border-2 border-white  ">
          </div>
          <div class="col-md-6">
            <input type="search" maxlength="1" name="first-latter" id="firsr-latter" placeholder="Search By First Latter" class="form-control  bg-black ps-3 border-2 border-white  ">
          </div>`
          let name =document.getElementById("search-name")
          name.addEventListener("keyup",function(){
            searchByName(this.value)
          })

          let firstLatter =document.getElementById("firsr-latter")
          firstLatter.addEventListener("keyup",function(){
            searchByFirstLatter(this.value)
          })
}

$("nav .navbar .tab-links ul .search").click(function(){
  let loading = $(".loading")
    loading.removeClass("d-none")
    closeNavbar()
    $(".ingrediants-sec").addClass("d-none")
    document.querySelector(".details-row").innerHTML =``
    document.querySelector(".show-meals .show-meals-row").innerHTML =``
    $(".meal-details").addClass("d-none")
    $(".search-form").addClass("d-none")
    $(".categories").addClass("d-none")
    $(".area").addClass("d-none")
    $(".search-form").removeClass("d-none")
    $(".contact-form").addClass("d-none")

    showSearchInput()

    loading.addClass("d-none")
})

async function searchByName(key){
  let loading = $(".loading")
  loading.removeClass("d-none")

  document.querySelector(".show-meals .show-meals-row").innerHTML =``
  
  let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`)
  let response = await api.json()

  // displaySearch(response.meals)

  response.meals ? displaySearch(response.meals) : displaySearch([])

  loading.addClass("d-none")
}

async function searchByFirstLatter(latter){
  let loading = $(".loading")
  loading.removeClass("d-none")

  document.querySelector(".show-meals .show-meals-row").innerHTML =``

  latter == "" ? latter = "a" : "";

  let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${latter}`) 
  let response = await api.json()

  // displaySearch(response.meals)

  response.meals ? displaySearch(response.meals) : displaySearch([])

  loading.addClass("d-none")
}

function displaySearch(response){
  let cartona = ``
  for(let i=0;i<response.length;i++){
    cartona +=`<div class=" figure col-md-3">
              <figure onclick="getMealDetails('${response[i].idMeal}')" class="show-meal-figure  position-relative overflow-hidden ">
                <img src="${response[i].strMealThumb}" alt="meals photo" class="w-100 rounded-3">
                <figcaption class="show-meal-caption text-center position-absolute bg-white bg-opacity-75 d-flex justify-content-center align-items-center rounded-3">
                  <h2>${response[i].strMeal}</h2>
                </figcaption>
              </figure>
          </div>`
  }
  document.querySelector(".show-meals .show-meals-row").innerHTML =cartona
}


function showContacts(){
  document.querySelector(".contact-form").innerHTML=`<div class="container w-75 d-flex flex-column justify-content-center align-items-center">
        <div class="row py-4 g-4">
          <div class="col-md-6">
            <input id="nameInput" onkeyup="inputsValidation()" type="text" name="name" id="contact-name" placeholder="Enter Your Name" class="form-control">
            <div id="nameAlert" class="alert alert-danger w-100 mt-2 text-center d-none">
              Special characters and numbers not allowed
            </div>
          </div>
          <div class="col-md-6">
            <input id="emailInput" onkeyup="inputsValidation()" type="email" name="email" id="contact-email" placeholder="Enter Your Email" class="form-control">
            <div id="emailAlert" class="alert alert-danger w-100 mt-2 text-center d-none">
              Email not valid *exemple@yyy.zzz
            </div>
          </div>
          <div class="col-md-6">
            <input id="phoneInput" onkeyup="inputsValidation()" type="tel" name="phone" id="contact-phone" placeholder="Enter Your Phone" class="form-control">
            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 text-center d-none">
              Enter valid Phone Number
            </div>
          </div>
          <div class="col-md-6">
            <input id="ageInput" onkeyup="inputsValidation()" type="number" name="age" id="contact-age" placeholder="Enter Your Age" class="form-control">
            <div id="ageAlert" class="alert alert-danger w-100 mt-2 text-center d-none">
              Enter valid age
            </div>
          </div>
          <div class="col-md-6">
            <input id="passInput" onkeyup="inputsValidation()" type="password" name="pass" id="contact-pass" placeholder="Enter Your Password" class="form-control">
            <div id="passAlert" class="alert alert-danger w-100 mt-2 text-center d-none">
              Enter valid password *Minimum eight characters, at least one letter and one number:*
            </div>
          </div>
          <div class="col-md-6">
            <input id="repassInput" onkeyup="inputsValidation()" type="password" name="repass" id="contact-repass" placeholder="Repassword" class="form-control">
            <div id="repassAlert" class="alert alert-danger w-100 mt-2 text-center d-none">
              Enter valid repassword
            </div>
          </div>
        </div>
        <button id="submitBtn" type="submit" disabled="true" class=" submit-btn btn btn-outline-danger px-2 mt-2 ">Submit</button>
      </div>`
      

       submit = document.getElementById("submitBtn")

      console.log(submit);

      document.getElementById("nameInput").addEventListener("focus",function(){
        nameInputTouched = true
      })

      document.getElementById("emailInput").addEventListener("focus",function(){
        emailInputTouched = true
      })

      document.getElementById("phoneInput").addEventListener("focus",function(){
        phoneInputTouched = true
      })

      document.getElementById("ageInput").addEventListener("focus",function(){
        ageInputTouched = true
      })

      document.getElementById("passInput").addEventListener("focus",function(){
        passInputTouched = true
      })

      document.getElementById("repassInput").addEventListener("focus",function(){
        repassInputTouched = true
      })
          
}





let nameInputTouched = false

let emailInputTouched = false

let phoneInputTouched = false

let ageInputTouched = false

let passInputTouched = false

let repassInputTouched = false

function inputsValidation(){
  if(nameInputTouched){
    if(nameValidation()){
      document.getElementById("nameAlert").classList.replace("d-block","d-none")
    }else{
      document.getElementById("nameAlert").classList.replace("d-none","d-block")
    }
  }

  if(emailInputTouched){
    if(emailValidation()){
      document.getElementById("emailAlert").classList.replace("d-block","d-none")
    }else{
      document.getElementById("emailAlert").classList.replace("d-none","d-block")
    }
  }

  if(phoneInputTouched){
    if(phoneValidation()){
      document.getElementById("phoneAlert").classList.replace("d-block","d-none")
    }else{
      document.getElementById("phoneAlert").classList.replace("d-none","d-block")
    }
  }

  if(ageInputTouched){
    if(ageValidation()){
      document.getElementById("ageAlert").classList.replace("d-block","d-none")
    }else{
      document.getElementById("ageAlert").classList.replace("d-none","d-block")
    }
  }

  if(passInputTouched){
    if(passValidation()){
      document.getElementById("passAlert").classList.replace("d-block","d-none")
    }else{
      document.getElementById("passAlert").classList.replace("d-none","d-block")
    }
  }

  if(repassInputTouched){
    if(repassValidation()){
      document.getElementById("repassAlert").classList.replace("d-block","d-none")
    }else{
      document.getElementById("repassAlert").classList.replace("d-none","d-block")
    }
  }

  if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passValidation() &&
        repassValidation()) {
          submit.removeAttribute("disabled")
    } else {
      submit.setAttribute("disabled", true)
    }
}

$("nav .navbar .tab-links ul .contact").click(function(){
  let loading = $(".loading")
    loading.removeClass("d-none")
    closeNavbar()
    $(".ingrediants-sec").addClass("d-none")
    document.querySelector(".details-row").innerHTML =``
    document.querySelector(".show-meals .show-meals-row").innerHTML =``
    $(".meal-details").addClass("d-none")
    $(".search-form").addClass("d-none")
    $(".categories").addClass("d-none")
    $(".area").addClass("d-none")
    $(".search-form").addClass("d-none")
    $(".contact-form").removeClass("d-none")

    showContacts()

    loading.addClass("d-none")
})

function nameValidation(){
  return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation(){
  return (/^([a-zA-Z0-9._%-]+@[a-zA-Z.-]+\.com)$/.test(document.getElementById("emailInput").value))
}

function phoneValidation(){
  return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation(){
  return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9])$/.test(document.getElementById("ageInput").value))
}

function passValidation(){
  return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passInput").value))
}

function repassValidation(){
  return document.getElementById("repassInput").value == document.getElementById("passInput").value
}

getIngrediants()
getArea()
getmeals()