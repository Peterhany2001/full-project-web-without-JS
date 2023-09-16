let isTrue = !0, arr = [];
    
// nav bar
$(".strip-toggel-menu").click(function () {
    isTrue ? ($(".nav-tab-menu").addClass("open-menu").removeClass("close-menu"), nvWidth = $(".nav-tab-menu").width() - 10, $(".strip-header-nav").css("left", nvWidth), $(".fa-align-justify").toggleClass("fa-times"),
        $(".nav-tab-menu .item1").animate({ opacity: "1", paddingTop: "25px" }, 1100),
        $(".nav-tab-menu .item2").animate({ opacity: "1", paddingTop: "25px" }, 1200),
        $(".nav-tab-menu .item3").animate({ opacity: "1", paddingTop: "25px" }, 1300),
        $(".nav-tab-menu .item4").animate({ opacity: "1", paddingTop: "25px" }, 1400),
        $(".nav-tab-menu .item5").animate({ opacity: "1", paddingTop: "25px" }, 1500),
        $(".nav-tab-menu .item6").animate({ opacity: "1", paddingTop: "25px" }, 1600), isTrue = !isTrue) : ($(".nav-tab-menu").addClass("close-menu").removeClass("open-menu"), $(".fa-align-justify").toggleClass("fa-times"), $(".strip-header-nav").css("left", 0),
        $(".nav-tab-menu li").animate({opacity: "0",paddingTop: "500px"}, 500), isTrue = !isTrue)
});
var row = document.getElementById("rowData");
async function getMainIngredient(mealName) {    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`)
    meal = await meal.json()
    displayMeals(meal.meals)
}

function displayMeals(arr) {

    let meals = ""
    for (let i = 0; i < arr.length; i++) {
        meals += `
    <div class="col-md-6 col-lg-3 my-3 myM  shadow">
        <div onclick="getMeal('${arr[i].idMeal}')" class="movie shadow rounded position-relative">
            <div class="post ">
                <img src='${arr[i].strMealThumb}' class="w-100 rounded" />
                <div class="layer d-flex align-items-center ">
                    <div class="info p-2">
                        <h2>${arr[i].strMeal}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    }
    row.innerHTML = meals
    $("html, body").animate({
        scrollTop: 0
    }, 200)
}

async function getMeal(mealID) {    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    meal = await meal.json()
    displayMeal(meal.meals[0])
}

function displayMeal(meal) {
    let recipes = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += `<li class="my-3 mx-1 p-1 alert-success rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    let tagsStr = ""
    for (let i = 0; i < tags?.length; i++) { 
        tagsStr += `<li class="my-3 mx-1 p-1 alert-danger rounded">${tags[i]}</li>`
    }

    let str = `
<div class="col-md-4 myM text-white">
                <img class="w-100" src="${meal.strMealThumb}" alt=""
                    srcset=""><br>
                <h1>${meal.strMeal}</h1>
            </div>
            <div class="col-md-8 myM text-white text-left">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <p><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
                <p><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
                <h3>Recipes :</h3>
                <ul class="d-flex " id="recipes">
                </ul>

                <h3 class="my-2 mx-1 p-1">Tags :</h3>
                <ul class="d-flex " id="tags">
                </ul>

                
                <a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
                <a class="btn youtube text-white" target="_blank" href="${meal.strYoutube}">Youtub</a>
            </div>`
    row.innerHTML = str
    document.getElementById("recipes").innerHTML = recipes
    document.getElementById("tags").innerHTML = tagsStr
    $("html, body").animate({
        scrollTop: 0
    }, 200)

}

async function getCategories(listBy) {
    x = await fetch(`https://www.themealdb.com/api/json/v1/1/${listBy}`);
    x = await x.json()
    return x;
}

async function getByLetter(letter) {
    if (letter) {
        let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        meals = await meals.json()
        if (meals.meals) {
            displayMeals(meals.meals)
        }

    }
}

async function filterByCategory(category) {    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    meals = await meals.json()
    displayMeals(meals.meals)
}

async function filterByArea(area) {    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    meals = await meals.json()
    displayMeals(meals.meals.slice(0, 20))
}


$(".nav-item a").click(async (e) => {
    
    let click_event = new CustomEvent('click');
    document.querySelector('.strip-toggel-menu').dispatchEvent(click_event);

    let x;

    if (listBy == "categories") {

        x = await getCategories(listBy + ".php")
        arr = x.categories.splice(0, 20);
        displayCategories()

    } else if (listBy == "a") {

        x = await getCategories("list.php?a=list")
        arr = x.meals.splice(0, 20);
        displayArea()

    } else if (listBy == "i") {
        x = await getCategories("list.php?i=list")
        arr = x.meals.splice(0, 20);
        displayIngredients()

    }
})
