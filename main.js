const cityName = document.querySelector('.city-name')
const input = document.querySelector('input')
const sendBtn = document.querySelector('.btn')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')
const warning = document.querySelector('.warning')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=574f0228504c1cc5cfa2ce4865b4b5a1'
const UNITS = '&units=metric'

async function getWeather() {
	try{
		const city = input.value || 'Marrakesh'
		const URL = API_LINK + city + API_KEY + UNITS
		const res = await axios.get(URL)
		const status = Object.assign({}, ...res.data.weather)
		// const status = res.data.weather[0].main - inny zapis
		console.log(status);
		const clouds = res.data.clouds.all
		const temp = res.data.main.temp
		const hum = res.data.main.humidity
		
		cityName.textContent = city
		temperature.textContent = Math.floor(temp) + '°C'
		humidity.textContent = hum + '%'
		weather.textContent = status.main + ' ' + clouds + '%'

		input.value = ''
		warning.textContent = ''

		if(status.id >= 200 && status.id < 300){
			photo.setAttribute('src','img/thunderstorm.png')
		}else if(status.id >= 300 && status.id < 400){
			photo.setAttribute('src','img/drizzle.png')
		}else if(status.id >= 500 && status.id < 600){
			photo.setAttribute('src','img/rain.png')
		}else if(status.id >= 600 && status.id < 700){
			photo.setAttribute('src','img/ice.png')
		}else if(status.id >= 700 && status.id < 800){
			photo.setAttribute('src','img/fog.png')
		}else if(status.id === 800 ){
			photo.setAttribute('src','img/sun.png')
			weather.textContent = status.main
		}else if(status.id >= 801 && status.id < 900){
			photo.setAttribute('src','img/cloud.png')
		}else{
			photo.setAttribute('src','img/unknown.png')
		}

	}catch{
		warning.textContent = 'Wpisz poprawną nazwe miasta'
	}
}

const enterCheck = (e) =>{
	if(e.key === 'Enter'){
		getWeather()
	}
}

getWeather()
input.addEventListener('keyup',enterCheck)
sendBtn.addEventListener('click', getWeather)