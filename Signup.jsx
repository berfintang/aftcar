import Image from "next/image"
import { useState } from "react"
import { useCookies } from "react-cookie"

const SignUp = ({onSignupSuccess}) => {
	const [cookie, setCookie] = useCookies()
	const [formData, setFormDatas] = useState({})
	const [errorMessage, setErrorMessage] = useState("")
	const [passwordType, setPasswordType] = useState("password")
	const handle_signup = () => {
		if (!formData["userName"] || !formData["password"] || !formData["email"])
		{
			setErrorMessage("Lütfen verilen alanların hepsini doldurun.")
			return
		}
		if (!formData.userName.length || !formData.password.length || !formData.email.length)
		{
			setErrorMessage("Lütfen verilen alanların hepsini doldurun.")
			return
		}
		fetch("http://127.0.0.1:5000/auth/signup",{
			method:"POST",
			headers: {"Content-Type":"application/json"},
			body: JSON.stringify({
				userName: formData.userName,
				email: formData.email,
				password: formData.password
			})
		}).then(response => {
			if (response.status == 201){
				return response.json()
			}
			throw `failed with status code: ${response.status}`
		}).catch(err => {
			setErrorMessage("Kayıt yapılamadı. tekrar deneyin")
			console.error(err)
		}).then(data => {
			setCookie("token",data.token)
			if (typeof onSignupSuccess === "function")
				onSignupSuccess()
		})
	}
	return <>
		<Image src="/logo.jpeg" className="mx-auto" width={250} height={125}/>
		<div className="flex flex-col w-1/2 mx-auto text-center">
			<span className="text-red-600">{errorMessage}</span>
			<input placeholder="Kullanıcı adı" type="text" className="m-2" onChange={e => setFormDatas({...formData, userName: e.target.value})}/>
			<input placeholder="e posta" type="mail" className="m-2" onChange={e => setFormDatas({...formData, email: e.target.value})}/>
			<input placeholder="şifre" type={passwordType} className="m-2" onChange={e => setFormDatas({...formData, password: e.target.value})}/>
			<div>
			<input type="checkbox" className="mx-2" id="show-hide-pwd" onChange={e => setPasswordType(passwordType == "password" ? "text" : "password")}/>
			<label htmlFor="show-hide-pwd">Şifreyi göster</label>
			</div>
			<button className="bg-gray-200 rounded-sm p-2 m-2" onClick={handle_signup}>Kaydol</button>
		</div>
	</>
}

export {SignUp}