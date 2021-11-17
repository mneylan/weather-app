//API Key weather 30e646590aed33f1fafd4c6fb8886c6b

//giphy api key HHOa7g1NvTTLAOvFWPfbyeorJzB8wjCa

//sun id kJqZDN4aDHNsowYg7t

//api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}

let img = document.getElementById('img')
let key = "30e646590aed33f1fafd4c6fb8886c6b"
let searchBar = document.querySelector('.search-bar')
let error = document.querySelector('.error')
let searchBtn = document.querySelector('.search-btn')
let place = document.querySelector('.location')
let temperature = document.querySelector('.temperature')
let fahrenheit = document.querySelector('.fahrenheit')
let celsius = document.querySelector('.celsius')
let weatherDescription = document.querySelector('.weather-description')




searchBar.addEventListener('click', () => {
  error.textContent = 'Enter based on this format: "City Name, 2 digit Country Code(optional), State(optional)"'
  error.style.color = "black"
  error.style.display = "block"
})

// let callWeatherApi = (city, country = null, state = null) => {
//   if (country == null && state == null) {
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`, {mode: 'cors'})
//       .then(function(response) {
//         return response.json()
//       })
//       .then(function(response) {
//         place.textContent = city
//         cityTemp = response.main.temp
//         temperature.textContent = cityTemp
//       })
//       .catch((error) => {
//         console.log("couldn't find that city, dawg")
//       })
//   }
// }

let callWeatherApi = async (city, country = undefined, state = undefined) => {
  try {
  if (country == undefined && state == undefined) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`, {mode: 'cors'})
    let data = await response.json()
    place.textContent = capitalize(city)
    cityTemp = data.main.temp
    temperature.textContent = Math.round(cityTemp)
    let weath = data.weather["0"]
    weatherDescription.textContent = weath.main
    fahrenheit.style.textShadow = "rgb(35, 235, 78) 1px 1px 5px"
    celsius.style.textShadow = ""
    showWeatherGif()

    
  } else if (country == undefined && state != undefined) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},us&appid=${key}&units=imperial`, {mode: 'cors'})
    let data = await response.json()
    
    place.textContent = capitalize(city)
    cityTemp = data.main.temp
    temperature.textContent = Math.round(cityTemp)
    let weath = data.weather["0"]
    weatherDescription.textContent = weath.main
    fahrenheit.style.textShadow = "rgb(35, 235, 78) 1px 1px 5px"
    celsius.style.textShadow = ""
    showWeatherGif()
  } else {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${key}&units=imperial`, {mode: 'cors'})
    let data = await response.json()
    
    place.textContent = capitalize(city)
    cityTemp = data.main.temp
    temperature.textContent = Math.round(cityTemp)
    let weath = data.weather["0"]
    weatherDescription.textContent = weath.main
    fahrenheit.style.textShadow = "rgb(35, 235, 78) 1px 1px 5px"
    celsius.style.textShadow = ""
    showWeatherGif()
  }
}
  catch (err) {
    
    error.textContent = "Couldn't find that city."
    error.style.display = "block"
    error.style.color = "red"
    error.style.margin = "0 auto"
    
  }
} 


searchBtn.addEventListener('click', () => {
  let values = searchBar.value.split(", ")
  let city = values[0]
  let country = values[1]
  let state = values[2]
  callWeatherApi(city, country, state)
  error.style.display = "none"
  
})

celsius.addEventListener('click', () => {
  fahrenheit.style.textShadow = "none"
  
  if (celsius.style.textShadow == "rgb(35, 235, 78) 1px 1px 5px") {return}
  
  let temp = temperature.textContent
  let cels = (temp - 32) * 5 / 9
  temperature.textContent = Math.round(cels).toString()
  
  
  celsius.style.textShadow = "1px 1px 5px rgb(35, 235, 78)"
  
  
})

fahrenheit.addEventListener('click', () => {
  celsius.style.textShadow = "none"
  
  if (fahrenheit.style.textShadow == "rgb(35, 235, 78) 1px 1px 5px") {return}
  
  let temp = temperature.textContent
  let fahr = (temp / 5) * 9 + 32
  temperature.textContent = Math.round(fahr).toString()
  fahrenheit.style.textShadow = "1px 1px 5px rgb(35, 235, 78)"
  
})

let capitalize = (str) => {
  let eachWord = str.split(" ")
  let capitalizedWords = []
  eachWord.forEach((word) => {
    
    capitalizedWords.push(word[0].toUpperCase() + word.slice(1))
    
  })
  
  return capitalizedWords.join(" ")
  }

  let showWeatherGif = () => {
    let goodWeather = ['sunny', 'clear']
    let cloudy = ['clouds'];
    let hazy = ['haze']
    let rain = ['rain', 'mist']
    let snow = ['snow']

    if (goodWeather.includes(weatherDescription.textContent.toLowerCase())) {
    gifApiCall('kJqZDN4aDHNsowYg7t')
    } else if (cloudy.includes(weatherDescription.textContent.toLowerCase())) {
      gifApiCall('3o7rc6sa2RvKo8K5EI')
    } else if (hazy.includes(weatherDescription.textContent.toLowerCase())) {
      gifApiCall('9GIEZ60FUeeSAPyltp')
    } else if (rain.includes(weatherDescription.textContent.toLowerCase())) {
      gifApiCall('dI3D3BWfDub0Qp')
    } else if (snow.includes(weatherDescription.textContent.toLowerCase())) {
      gifApiCall('12wteMTXxjLaVO')
    } 
  }

  let gifApiCall = (id) => {
    fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=HHOa7g1NvTTLAOvFWPfbyeorJzB8wjCa`, {mode: 'cors'})
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      
      img.src = response.data.images.original.url
    })

  }