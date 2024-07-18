//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)



function getFetch(){
  // const choice = document.querySelector('input').value.toLowerCase()
  let yearMonthDay = document.querySelector('input').value
  const url = `https://api.nasa.gov/planetary/apod?{apiKeyHere}&date=${yearMonthDay}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        // Function to create the element
        function createElement(type) {
          let element;
          if (type === 'iframe') {
            element = document.createElement('iframe');
            element.src = data.url
            element.width = '1024';
            element.height = '676';
          } else if (type === 'img') {
            element = document.createElement('img');
            element.src = data.hdurl
            element.alt = 'Example Image';
            element.width = '1024';
            element.height = '676';
          } else {
            console.error('Unknown element type:', type);
            return;
          }
        // Append the created element to the body (or any other container)
        document.body.appendChild(element);
        }

        const elementType = data.media_type === "image" ? 'img' : 'iframe'
        // Call the function to create the element
        createElement(elementType);

        document.querySelector('h3').innerText = data.explanation

        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

