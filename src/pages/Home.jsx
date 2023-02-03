import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import {FaChartArea, FaChartBar, FaLeaf, FaPeopleCarry, FaSearch} from "react-icons/fa"
import { HiOutlineUserGroup, HiUserGroup } from 'react-icons/hi'
import Categories from '../components/Categories'

function Home() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const onChange = (e)=>{
    setSearch(e.target.value)
  }
  
  return (
    <main>
      <section className='hero flex flex-col items-center w-screen h-screen'>
        <section className='mt-16 md:mt-28 py-6 px-4 hover:bg-white hover:bg-opacity-10 hover:shadow-lg transition duration-150 ease-in'>
          <article className='mb-2'>
            <h2 className='hero-h2 pb-4 text-7xl text-center font-bold text-white'><span className='text-blue-400'>Epi</span>Gis</h2>
            <p className='text-2xl text-center font-medium text-white mb-4 hero-p'>Collect, analyse and inform Mozambique's indexes</p>
            <p className='text-lg text-center font-semibold text-white hero-p'>Search for maps</p>
          </article>
          <form className='flex flex-col items-center w-full space-y-3 px-4' onSubmit={()=>navigate(`portfolio/${search}`)}>
            <input className='w-full md:w-[600px] bg-transparent border border-white text-black text-center focus:bg-slate-100 focus:border-white' type="text"  placeholder='Ex: Malaria' value={search} onChange={onChange}/>
            <button className='flex gap-2 items-center py-2 px-6 bg-blue-400 text-sm text-white font-semibold shadow-lg transition ease-out duration-150 hover:bg-blue-500 ' type="submit">
              <FaSearch/>
              <span>Search</span>
            </button>
          </form>
        </section>
      </section>
      <Categories/>
      <section className='metrics'></section>
      <section className='portfolio'></section>
    </main>
  )
}

export default Home