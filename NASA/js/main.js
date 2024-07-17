//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)



function getFetch(){
  // const choice = document.querySelector('input').value.toLowerCase()
  let yearMonthDay = document.querySelector('input').value
  const url = `https://api.nasa.gov/planetary/apod?api_key=z2kfsEPYn6PkZwX5y09RcFyIKoFp7YRzdLCr3afV&date=${yearMonthDay}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('img').src = data.hdurl
        document.querySelector('h3').innerText = data.explanation
        document.querySelector('iframe').src = data.url
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

