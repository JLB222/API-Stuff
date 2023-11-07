document.getElementById("button").addEventListener("click", getDrink)


function getDrink() {
    //capture the data input by the user
    let drink = document.getElementById("input").value
    //clear the existing array of drinks so that multiple user inputs doesn't create a massive drink list
    document.querySelector("#root").innerHTML = ""

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json())
    .then(data => {
        console.log(data.drinks)

        data.drinks.forEach( el => {
            //create a div for the drink that'll hold all the other elements.
            let containerDiv = document.createElement("div")
            //create an H2 for the name of the drink
            let drinkName = document.createElement("h2")
                drinkName.innerHTML = el.strDrink
            //create an image to show off the drink
            let drinkImage = document.createElement("img")
                drinkImage.src = el.strDrinkThumb
            //create a paragraph element for the drink's instructions
            let drinkInstructions = document.createElement("p")
                drinkInstructions.innerHTML = el.strInstructions

            //this API stores the ingredients in up to 15 different strings, ugh, so we put all those into one array for ease.
            let ingredients = []
                for (let i = 1; i <= 15; i++) {
                  ingredients.push( (el[`strMeasure`+i] || "") + el[`strIngredient`+i] )  //the property names are strIngredient1 through strIngredient15, so the template literal + i allows us to go through them all. 
                }
                ingredients = ingredients.filter(el => el !== "null")  //since many of the strIngredient strings are empty, they'll return null (which will be turned into a string due to the "") and we don't want to render that to the page, so we filter nulls out
            //create an Unordered List element to hold all the ingredients
            let ingredientList = document.createElement("ul")
            
            //create a list item element for every ingredient & fill that element with the ingredient's details; then append that ingredient to the UL we made above.
            ingredients.forEach(el =>{
                let ingredient = document.createElement("li")
                ingredient.innerHTML = el
                ingredientList.append(ingredient)
            })
            //append everything we made above to the container Div
                containerDiv.append(drinkName)
                containerDiv.append(drinkImage)
                containerDiv.append(drinkInstructions)
                containerDiv.append(ingredientList)
            //append the drink's container Div to the root div so it's rendered for the user
                document.querySelector("#root").appendChild(containerDiv)
        })




        //DRINK INGREDIENT LISTS
        //create an array of ingredients from the 15 strings the API gives
        // let ingredients = []
        // for (let i = 1; i <= 15; i++) {
        //     ingredients.push(
        //         (data.drinks[0][`strMeasure`+i] || "") +
        //         data.drinks[0][`strIngredient`+i])
        // }
        // ingredients = ingredients.filter(el => el !== "null")
        // //clear any existing User result by emptying the element:
        // document.querySelector(".ingredients").innerHTML = "" 
        // //create a list item for each ingredient
        // document.createElement("h3")
        // ingredients.forEach(el => {
        //     let unorderedList = document.createElement("ul")

        //     let listItem = document.createElement("li")
        //     listItem.innerHTML = el
        //     unorderedList.append(listItem)

        //     document.querySelector(".ingredients").appendChild(unorderedList)
        // })
    })
    .catch(err => {
        console.log(`${err}`)
    });
}


//API Ninjas' Drink API:
// function getDrink() {
//     let drink = document.getElementById("input").value

//     fetch(`https://api.api-ninjas.com/v1/cocktail?name=${drink}`,
//     {
//         method: "GET",
//         headers: {
//             "X-Api-Key": "7ZGPMUYUEtwwbtojntbJIA==8TwVWhvfDKByqz3F"
//         }
//     })
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//         document.getElementById("image").src = data[0]
//         document.getElementById("drinkName").innerText = data[0].name
//         document.getElementById("instructions").innerText = data[0].instructions

//         let ingredients = []
//         for (let i = 0; i < data[0].ingredients.length; i++) {
//             ingredients.push(data[0].ingredients[i])
//         }

//         document.createElement("h3")
//         ingredients.forEach(el => {
//             let unorderedList = document.createElement("ul")

//             let listItem = document.createElement("li")
//             listItem.innerHTML = el
//             unorderedList.append(listItem)

//             document.querySelector(".ingredients").appendChild(unorderedList)
//         })
//     })
// }

//toDoList
//display all results with a carousel of images