import Image from "next/image"
import { useState } from "react"
import { useCookies } from "react-cookie"

const Login = ({onLoginSuccess}) => {
	const [cookie, setCookie] = useCookies()
	const [login, setLogin] = useState({})
	const [errorMessage, setErrorMessage] = useState("")
	const [passwordType, setPasswordType] = useState("password")
	const handle_login = () => {
		if (!login["userName"] || !login["password"])
		{
			setErrorMessage("Lütfen verilen alanların hepsini doldurun.")
			return
		}
		if (!login.userName.length || !login.password.length)
		{
			setErrorMessage("Lütfen verilen alanların hepsini doldurun.")
			return
		}
		fetch("http://127.0.0.1:5000/auth/login",{
			method:"POST",
			headers: {"Content-Type":"application/json"},
			body: JSON.stringify({
				userName: login.userName,
				password: login.password
			})
		}).then(response => {
			if (response.status == 200){
				return response.json()
			}
			throw `failed with status code: ${response.status}`
		}).catch(err => {
			setErrorMessage("Giriş bilgilerinizi gözden geçirerek tekrar deneyin.")
			console.error(err)
		}).then(data => {
			setCookie("token",data.token)
			if (typeof onLoginSuccess === "function")
				onLoginSuccess()
		})
	}
	return <>
		<Image src="/logo.jpeg" className="mx-auto" width={250} height={125}/>
		<div className="flex flex-col w-1/2 mx-auto text-center">
			<span className="text-red-600">{errorMessage}</span>
			<input placeholder="Kullanıcı adı veya e posta" className="m-2" onChange={e => setLogin({...login, userName: e.target.value})}/>
			<input placeholder="şifre" type={passwordType} className="m-2" onChange={e => setLogin({...login, password: e.target.value})}/>
			<div>
			<input type="checkbox" className="mx-2" id="show-hide-pwd" onChange={e => setPasswordType(passwordType == "password" ? "text" : "password")}/>
			<label htmlFor="show-hide-pwd">Şifreyi göster</label>
			</div>
			<button className="bg-gray-200 rounded-sm p-2 m-2" onClick={handle_login}>Giriş Yap</button>
		</div>
	</>
}

export {Login}