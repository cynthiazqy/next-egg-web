import { useState } from 'react'
import { axiosInstance } from '@/utils/axiosInstance'

const LoginPage: React.FC = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const response = await axiosInstance.post(
				'/login',
				{
					username,
					password,
				},
				{
					withCredentials: true,
				}
			)
			localStorage.setItem('token', response.data.token) // 存储 token
			// 登录成功后，重定向到用户页面或其他页面
			window.location.href = '/'
		} catch (err) {
			setError('Login failed') // 错误处理
			console.error(err)
		}
	}

	return (
		<form onSubmit={handleLogin}>
			<input
				type="text"
				placeholder="Username"
				value={username}
				onChange={e => setUsername(e.target.value)}
				required
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={e => setPassword(e.target.value)}
				required
			/>
			<button type="submit">Login</button>
			{error && <p>{error}</p>}
		</form>
	)
}

export default LoginPage
