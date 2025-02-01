export const weatherApi = () => ({
    weatherApi: {
        apiKey: process.env.WEATHER_API_KEY,
        apiUrl: process.env.WEATHER_API_URL
    }
})

export default weatherApi