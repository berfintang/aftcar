import Image from "next/image";

export default function About(){

	return <>
		<div className="flex flex-row items-center">
			<Image src="/logo.jpeg" width={250} height={180}/>
			<span className="ml-5 text-6xl font-bold">AFTK Nedir?</span>
		</div>
		<article>
			<p className="my-2 text-gray-700">AFTK, araç fiyatlarını çeşitli filter ile hesaplayıp sıralar.</p>
			<p className="my-2 text-gray-700">
				Kullanıcıların satın almak istedikleri araçlar hakkında tahmini bir fiyat ve ortalama değer oluşturur.
				Böylece kullanıcılar satın almak istedikleri araçların ilanlarına tek bir uygulamadan ulaşabilirler
			</p>
			<p className="my-2 text-gray-700">
				AFTK, kullanıcılara kolaylık sağlar ve vakit kaybını önler
			</p>
		</article>
	</>
}