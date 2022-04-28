console.log("JS loaded")

const api_url = "/weather?address="

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const address = search.value
    fetch(api_url + address)
    .then((response)=>{
        response.json().then((data) => {
            console.log(data)
            document.getElementById("weather-update").innerHTML = data.forecast
        })
    })
})