const key = "c5137e7ef0740b54fb1cc46879a0be2a";

function fetchWeather(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + key)
    .then((response) => {
        if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
        }
      return response.json();
    })
    .then(data => {
        displayWeather(data);
    })
    .catch((error) => {
        console.log("Request failed", error);
    });
}

function displayWeather(data) {
    const {name} = data;
    const {temp, humidity, pressure} = data.main;
    const {icon, description} = data.weather[0];
    const {speed} = data.wind;

    document.querySelector(".city").innerText = name;
    document.querySelector(".temp").innerText = Math.trunc(temp) + "°C";
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description[0].toUpperCase() + description.slice(1);
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + " %";
    document.querySelector(".pressure").innerText = "Pressure: " + pressure + " hPa";

    console.log(name, temp, humidity, icon, description, speed, pressure);
}

function search() {
    fetchWeather(document.querySelector(".search-input").value);
}

document.querySelector(".submit-button").addEventListener("click", function () {
     search();
});

document.querySelector(".search-input").addEventListener("keyup", function (event) {
    if(event.key == "Enter") {
        search();
    }
});


fetchWeather("Timisoara");
