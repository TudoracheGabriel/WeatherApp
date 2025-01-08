const card = document.querySelector(".card");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const max = document.querySelector(".max");
const mini = document.querySelector(".mini");
const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");
const input = document.getElementById("input");
const btn = document.getElementById("btn");
const api = "55bf58bc8c98f06d26dc17fdc713c464";

btn.addEventListener("click", (event) => {
  event.preventDefault();
  let cityInput = input.value;
  if (cityInput === "") {
    displayError();
  } else {
    fetchWeather(cityInput);
  }
});

async function fetchWeather() {
  try {
    const query = input.value;
    if (!query) {
      alert("Te rog introdu un oras!");
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      alert("Orasul nu a fost gasit!");
      return;
    }
    const data = await response.json();
    console.log(data);
    ///////////////////////////
    const sunriseTimestamp = data.sys.sunrise;
    const sunsetTimestamp = data.sys.sunset;
    const sunriseX = new Date(sunriseTimestamp * 1000); 
    const sunsetX= new Date(sunsetTimestamp * 1000);
    const sunriseTime = sunriseX.toLocaleTimeString("ro-RO", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const sunsetTime = sunsetX.toLocaleTimeString("ro-RO", {
      hour: "2-digit",
      minute: "2-digit",
    });
    /////////////////////////
    city.textContent = data.name;
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    max.textContent = `Max: ${Math.round(data.main.temp_max)}°C`;
    mini.textContent = `Min: ${Math.round(data.main.temp_min)}°C`;
    sunrise.textContent = `Răsărit: ${sunriseTime}`;
    sunset.textContent = `Apus: ${sunsetTime}`;

  } catch (error) {
    console.error("Eroare la obținerea datelor:", error);
  }
}

function displayError() {
  alert("Te rog introdu un oras!");
}

function formatCity(name) {
  return name
    .toLowerCase()
    .replace(/♀/g, "-f")
    .replace(/♂/g, "-m")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getWeatherEmoji(weather) {
    const condition = weather.toLowerCase(); 
    switch (condition) {
      case "clear":
        return "☀️"; 
      case "clouds":
        return "☁️";
      case "rain":
        return "🌧️"; 
      case "drizzle":
        return "🌦️"; 
      case "snow":
        return "❄️"; 
      case "thunderstorm":
        return "⛈️"; 
      case "mist":
      case "haze":
      case "fog":
        return "🌫️"; 
      case "smoke":
        return "💨"; 
      case "dust":
      default:
        return "🌈"; 
    }
  }
  
