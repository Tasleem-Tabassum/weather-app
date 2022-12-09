console.log('Client side script loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#para-1')
const messageTwo = document.querySelector('#para-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ""
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error){
            messageOne.textContent = data.error
            messageTwo.textContent = "Try your current city name"
        } else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
        })
    })
})