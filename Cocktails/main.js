document.getElementById("button").addEventListener("click", getDrink)


function getDrink() {
    let drink = document.getElementById("input").value

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.getElementById("image").src = data.drinks[0].strDrinkThumb
        document.getElementById("drinkName").innerText = data.drinks[0].strDrink
        document.getElementById("instructions").innerText = data.drinks[0].strInstructions
        //create an array of ingredients from the 15 strings the API gives
        let ingredients = []
        for (let i = 1; i <= 15; i++) {
            ingredients.push(
                (data.drinks[0][`strMeasure`+i] || "") +
                data.drinks[0][`strIngredient`+i])
        }
        console.log(ingredients)
        ingredients = ingredients.filter(el => el !== "null")
        //clear any existing User result by emptying the element:
        document.querySelector(".ingredients").innerHTML = "" 
        //create a list item for each ingredient
        document.createElement("h3")
        ingredients.forEach(el => {
            let unorderedList = document.createElement("ul")

            let listItem = document.createElement("li")
            listItem.innerHTML = el
            unorderedList.append(listItem)

            document.querySelector(".ingredients").appendChild(unorderedList)
        })
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