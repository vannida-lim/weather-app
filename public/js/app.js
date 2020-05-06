const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherIconImg = document.querySelector('#weather-icon')
const adviceP = document.querySelector('#advice')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    weatherIconImg.src = './img/loading.gif'
    // messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    adviceP.textContent = ''

    fetch(`/weather?address=${location}`)
    .then(r => r.json())
    .then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            weatherIconImg.src = data.weatherIcon
            messageOne.textContent = `Location: ${data.location}`
            messageTwo.textContent = `Forecast: ${data.forecast}`
            
            let degreeMatch = data.forecast.match(/(\d+)/)
            let degrees = degreeMatch[0]
            
            if (degrees < 40) {
                adviceP.textContent = `Bundle up. It's gonna be freezing! 🥶 Have a great day. 😎`
            } else if (degrees >= 40 && degrees < 60) {
                adviceP.textContent = `Wear something warm. It's gonna be chilly. 🥺 Have a great day. 😎`
            } else if (degrees >= 60 && degrees <= 80) {
                adviceP.textContent = `The weather's perfect! Have a great day. 😎`
            } else if (degrees > 81){
                adviceP.textContent = `It's gonna be a scorcher today. Stay cool, friend! 🥵 Have a great day. 😎`
            }
            
            let rainMatch = data.forecast.match(/ain/g)
            let rain = rainMatch[0]
            
            if (rain) {
                adviceP.textContent = adviceP.textContent + ` Don't forget your umbrella! ☔️`
            }
        }
    })
})