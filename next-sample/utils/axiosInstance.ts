import axios from 'axios'

// create Axios instance
export const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000',
})

// add request interceptor
axiosInstance.interceptors.request.use(
	config => {
		const token = localStorage.getItem('token')
		console.log('token=', token)
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
