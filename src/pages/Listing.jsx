import { useEffect, useState } from 'react'
import { BsGithub, BsLinkedin, BsPersonCircle, BsTwitter } from 'react-icons/bs'
import { FaKeycdn, FaLayerGroup } from 'react-icons/fa'
import { GoCalendar } from 'react-icons/go'
import { useParams } from 'react-router-dom'
import {doc, getDoc} from 'firebase/firestore'
import {firestore} from '../firebase.config'
import Loading from '../components/Loading'
import DOMPurify from 'dompurify'

function Listing() {
  const param = useParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  
  //Fetching Data from Db
  useEffect(()=>{
    async function fetchData(id){
      const docRef = doc(firestore, 'maps', id)
      const docSnap = await getDoc(docRef)
      if(docSnap.exists()){
        setData({...docSnap.data()})
        setLoading(false)
      }
    }
    fetchData(param.id)
  }, 
  [param.id])

  if(loading){
    return (<Loading />)
  }

  return (
    <main className='w-full px-4 pt-10 md:px-24'>
      <h3 className='text-3xl font-semibold py-4'>{data.name}</h3>
      <article className='grid grid-cols-2 gap-4 md:flex md:justify-start md:space-x-4 pb-4 border-b'>
        <div className='flex items-center space-x-1'>
          <FaLayerGroup className='text-slate-500' />
          <span className='font-light'>{data.category}</span>
        </div>
        <div className='flex items-center space-x-1'>
          <FaKeycdn className='text-slate-500' />
          <span className='font-light truncate'>{data.keyword}</span>
        </div>
        <div className='flex items-center space-x-1'>
          <GoCalendar className='text-slate-500' />
          <span className='font-light shrink-0'>{data.date}</span>
        </div>
        <div className='flex items-center space-x-1'>
          <BsPersonCircle className='text-slate-500' />
          <span className='font-light truncate'>{data.author}</span>
        </div>
      </article>
      <section className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <article className='pt-10 col-span-3 md:pr-10 md:border-r'>
          <div className='w-full mb-4'>
            <img className='max-w-full' src={data.profileUrl} alt={data.name} title={data.name} />
          </div>
          <h4 className='text-xl font-semibold py-4'>Descrition</h4>
          <div className='md:mb-10' dangerouslySetInnerHTML={{_html:DOMPurify.sanitize(data.description)}}></div>
        </article>
        <article className='flex flex-col md:gap-20 px-4 pt-10'>
          {data.country.startsWith('Mo' || 'mo')? 
          (<ul className='flex flex-col gap-4'>
            <li className='flex flex-col'>
              <span className='font-semibold items-start'>Country</span>
              <span>{data.country}</span>
            </li>
            <li className='flex flex-col items-start'>
              <span className='font-semibold'>Region</span>
              <span>{data.region}</span>
            </li>
            <li className='flex flex-col items-start'>
              <span className='font-semibold'>Province</span>
              <span>{data.province}</span>
            </li>
            <li className='flex flex-col items-start'>
              <span className='font-semibold'>District</span>
              <span>{data.district}</span>
            </li>
          </ul>):
          (
          <ul className='flex flex-col gap-4'>
            <li className='flex flex-col'>
              <span className='font-semibold items-start'>Location</span>
              <span>{data.country}</span>
            </li>
          </ul>
          )}
          <ul className='flex space-x-2 my-8 md:my-0 lg:justify-between lg:text-2xl'>
            <li className='w-fit p-3 rounded-full bg-blue-500 hover:brightness-110 text-white'><a href="#" target="_blank" title='Go to our twitter'><BsTwitter/></a></li>
            <li className='w-fit p-3 rounded-full bg-blue-500 hover:brightness-110 text-white'><a href="#" target="_blank" title='Go to our linkedin'><BsLinkedin/></a></li>
            <li className='w-fit p-3 rounded-full bg-blue-500 hover:brightness-110 text-white'><a href="#" target="_blank" title='Go to our github'><BsGithub/></a></li>
          </ul>
        </article>
      </section>
    </main>
  )
}

export default Listing