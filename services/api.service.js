import { getKeyValue, TOKEN_DICT } from './storage.service.js';
import axios from 'axios';

const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};

const getCoord = async (city) => {
	const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICT.token);
	if (!token) {
		throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
	};

	const { data } = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
		params: {
			q: city,
			appid: token,
		}
	});

	if (data.length == 0) {
		throw new Error('Неправильно указан город');
	} else {
		const result = getWeather(data[0]['lat'], data[0]['lon']);
		return result;
	}
}

const getWeather = async (lat, lon) => {
	const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICT.token);
	if (!token) {
		throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
	};
	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			lat: lat,
			lon: lon,
			appid: token,
			units: 'metric',
			lang: 'ru'
		}
	});
	return data;
}

export { getCoord, getIcon };