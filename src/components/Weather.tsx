// src/components/Weather.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const WeatherContainer = styled.div`
    color: #66d9ef; /* Faded teal color */
`;

const Weather: React.FC<{ city?: string }> = ({ city }) => {
    const [weatherData, setWeatherData] = useState<string>('Loading weather information...');
    const [forecastData, setForecastData] = useState<string[]>([]);

    const getWeatherIcon = (weathercode: number) => {
        switch (weathercode) {
            case 0:
                return `☀️  Clear`;
            case 1:
            case 2:
            case 3:
                return `🌤  Partly Cloudy`;
            case 45:
            case 48:
                return `🌫  Foggy`;
            case 51:
            case 53:
            case 55:
                return `🌦  Drizzle`;
            case 61:
            case 63:
            case 65:
                return `🌧  Rainy`;
            case 71:
            case 73:
            case 75:
                return `❄️  Snowy`;
            case 95:
                return `⛈  Thunderstorm`;
            default:
                return `🌡  Weather`;
        }
    };

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                let location;
                let lat, lon;

                if (!city) {
                    // Use Geolocation API to get user's coordinates based on IP
                    const geoResponse = await fetch('https://ipapi.co/json/');
                    const geoData = await geoResponse.json();
                    lat = geoData.latitude;
                    lon = geoData.longitude;
                    location = `${geoData.city}, ${geoData.country_name}`;
                } else {
                    // Use a simple city-to-coordinates mapping (or you could use a more comprehensive service)
                    const cityCoordinates = await fetch(`https://nominatim.openstreetmap.org/search?city=${city}&format=json&limit=1`);
                    const cityData = await cityCoordinates.json();

                    if (cityData.length > 0) {
                        lat = cityData[0].lat;
                        lon = cityData[0].lon;
                        location = city;
                    } else {
                        setWeatherData(`Could not find weather data for ${city}.`);
                        return;
                    }
                }

                // Fetch current weather data from Open-Meteo API
                const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_min,temperature_2m_max,weathercode&timezone=auto`);
                const weather = await weatherResponse.json();

                const currentWeather = `Current Weather in ${location}: ${weather.current_weather.temperature}°C, ${getWeatherIcon(weather.current_weather.weathercode)}`;

                const forecast = weather.daily.weathercode.map((code: number, index: number) => {
                    const date = new Date(weather.daily.time[index]).toLocaleDateString();
                    const minTemp = weather.daily.temperature_2m_min[index];
                    const maxTemp = weather.daily.temperature_2m_max[index];
                    return `${date} - ${getWeatherIcon(code)}: Low ${minTemp}°C, High ${maxTemp}°C`;
                });

                setWeatherData(currentWeather);
                setForecastData(forecast);
            } catch (error) {
                setWeatherData('Error fetching weather information.');
            }
        };

        fetchWeather();
    }, [city]);

    return (
        <WeatherContainer>
            <p>{weatherData}</p>
            {forecastData.length > 0 && (
                <div>
                    <h4>Weekly Forecast:</h4>
                    {forecastData.map((day, index) => (
                        <pre key={index}>{day}</pre>
                    ))}
                </div>
            )}
        </WeatherContainer>
    );
};

export default Weather;
