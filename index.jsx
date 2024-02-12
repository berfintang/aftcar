import { HeartIcon } from "@heroicons/react/20/solid"
import { useState } from "react"
import { useCookies } from "react-cookie"
import { useEffect } from "react"



const { default: Image } = require("next/image")

const Item = ({item}) => {
	const [cookie] = useCookies()
	const [favorite, setFavorite] = useState(item.isFavorite)
	const mark_favorite = () => {
		let method = "POST"
		if (favorite)
			method = "DELETE"
		fetch("http://127.0.0.1:5000/auth/favorites",{
			headers:{
				"Authorization":`Bearer ${cookie["token"]}`,
				"Content-Type":"application/json"
			},
			method,
			body: JSON.stringify({plate: item.plate})
		}).then(response => {
			if (response.status == 200 || response.status == 201){
				setFavorite(!favorite)
			}
		})
	}
	return <>
		<div className="bg-gray-200 p-2 my-2 flex justify-between items-center flex-row">
			<img src={item.image} width={"192"} height={"128"} />
			<span>{item.brand}</span>
			<span>{item.brand_model}</span>
			<span>{item.year}</span>
			<span>{item.km}</span>
			<span>{item.car_type}</span>
			<span>{item.motor_oil_type}</span>
			{cookie["token"] ? <div className="p-2">
				<HeartIcon className={`h-5 w-5 cursor-pointer ${favorite ? "text-red-500" : "text-gray-500"}`} onClick={mark_favorite}/>
			</div> : <></>}
		</div>
	</>
}

const ItemList = ({items, itemSize}) => {
	const [begin, setBegin] = useState(0)

	let arrow_left = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
  					</svg>
  
	let arrow_right = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
					</svg>
	if (Array.isArray(items)){
		return <>
		{console.log(items)}
			<ul>
				{items.filter((item) => true).slice(begin * itemSize, begin * itemSize + itemSize + 1)
					.map((item, index) => <Item key={index} item={item} />)}
			</ul>
			<div className="flex flex-row justify-end my-5">
				<button className="text-blue-500" onClick={e => setBegin(Math.max(0,begin - 1))}>{arrow_left}</button>
				<div className="border border-blue-400 rounded-sm p-2 divide-y flex-row ">
					{[...Array(Math.ceil(items.length / itemSize)).keys()].map(item => {
						let mainclass = item == begin ? "bg-blue-200" : ""
						if (Math.abs(begin - item) < 5)
							return <span key={item} className={`p-2 hover:bg-gray-200 my-2 cursor-pointer ${mainclass}`} onClick={e => setBegin(item)}>{item}</span>
					})}
				</div>
				<button className="text-blue-500" onClick={e => setBegin(Math.min(items.length - 1, begin + 1))}>{arrow_right}</button>
			</div>
		</>
	}
	return <ul>
		<Item item={items}/>
	</ul>
}

export {ItemList}