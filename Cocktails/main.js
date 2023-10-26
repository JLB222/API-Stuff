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
            ingredients.push(data.drinks[0][`strIngredient`+i])
        }
        ingredients = ingredients.filter(el => el !== null) 
        //clear any existing User result by emptying the element:
        document.querySelector(".ingredients").innerHTML = "" 
        //create a list item for each ingredient
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

//toDoList
//display all results with a carousel of images