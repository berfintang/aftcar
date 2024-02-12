const { Menu, Transition } = require("@headlessui/react");
const { default: Link } = require("next/link");
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { UserCircleIcon } from '@heroicons/react/20/solid'
import { Fragment, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import ReactModal from 'react-modal';
import { Login } from '../Auth/Login';
import { SignUp } from '../Auth/Signup';
import Image from 'next/image';

function NavBar(){
	const [cookies, setCookies, removeCookies] = useCookies()
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [modalTitle, setModalTitle] = useState("")
	const [modalContent, setModalContent] = useState(<></>)
	const buttons_logged = <>
		<button className='rounded-md border border-title p-2' onClick={e => {
			location.replace("/list-car?favorites=true")
		}}>Favorilerim</button>
		<button className='rounded-md border border-title p-2' onClick={e => {
			removeCookies(['token'])
			setButtons(buttons_non_logged)
			location.replace("/")
		}}>Çıkış Yap</button>
	</>
	const buttons_non_logged = <>
		<button className='rounded-md border border-title p-2'
			onClick={e => {
				setModalIsOpen(true);
				setModalTitle("Kayıt Ol")
				setModalContent(() => <SignUp onSignupSuccess={() => location.reload()}/>)
				setButtons(cookies['token'] ? buttons_logged : buttons_non_logged)
			}}>Kayıt Ol</button>
		
		<button className='rounded-md border border-title p-2'
				onClick={e => {
				setModalIsOpen(true);
				setModalTitle("Giriş Yap")
				setModalContent(() => <Login onLoginSuccess={() => location.reload()}/>)
				setButtons(cookies['token'] ? buttons_logged : buttons_non_logged)
			}}>Giriş Yap</button>
	</>
	const [buttons, setButtons] = useState(buttons_non_logged);
	
	useEffect(() => {
		if (cookies['token']){
			setButtons(buttons_logged)
		}
	},[])
	return (<>
		<div className='flex justify-between items-center p-4'>
			<Image src="/logo.jpeg" width="192" height="128" />
			<form action="/list-car" method="get" className='border rounded-sm border-title divide-x p-1'>
				<input type="text" name="search" placeholder="Arama Çubuğu"/>
				<button className='p-1'>Ara</button>
			</form>
			<Link href={"car-value"} className='rounded-md border border-title p-2'>Araç Değeri</Link>
			<button className='rounded-md border border-title p-2' onClick={e => {
				location.assign("/list-car")
			}}>Araçları Sırala</button>
			

			<Menu as="div" className="relative inline-block text-left">
				<div>
					<Menu.Button className="inline-flex w-full uppercase justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
					Hakkımızda
					<ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
					</Menu.Button>
				</div>

				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="py-1 flex flex-col">
						<Menu.Item>
						{({ active }) => (
							<Link href={"about"} className={active ? "bg-title" : ""}>AFTK Nedir</Link>
						)}
						</Menu.Item>
						
					</div>
					</Menu.Items>
				</Transition>
			</Menu>

			<div className='grid grid-rows-2 grid-flow-col gap-4'>
				<div className='row-span-2'>
					<UserCircleIcon className='h-20 w-20 text-gray-400'/>
				</div>
				{buttons}
			</div>

		</div>
		<ReactModal
			isOpen={modalIsOpen}>
				<div className='flex justify-between items-center border-b py-2'>
					<div className='text-2xl'>
						{modalTitle}
					</div>
					<button className='px-1 hover:bg-gray-200 hover:rounded-sm' onClick={e => setModalIsOpen(false)}>x</button>
				</div>
				<div>
					{modalContent}
				</div>
		</ReactModal>
	</>)
}
export {NavBar};