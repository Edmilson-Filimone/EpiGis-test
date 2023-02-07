import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import { FaSearch } from "react-icons/fa"
import Categories from '../components/Categories'
import Metrics from '../components/Metrics'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '../firebase.config'
import CardListing from '../components/CardListing'

function Home() {
  const navigate = useNavigate()
  const [done, setDone] = useState(false)
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [metricData, setMetricData] = useState({ Humanitarian: 0, Epidemiology: 0, Demography: 0, Environment: 0 })

  const onChange = (e) => {
    setSearch(e.target.value)
  }

  let allMetrics = {}
  useEffect(() => {
    let docList = []
    async function fetchData() {
      const collectionRef = collection(firestore, 'maps')
      const querySnap = await getDocs(collectionRef)
      if (!querySnap.empty) {
        querySnap.forEach((doc) => {
          docList.push({id:doc.id, data:doc.data()})}
          )
        for (let label in metricData) {
          let metric = docList.filter((doc) => doc.data.category == label).length;
          allMetrics[label] = metric
        }
        setDone(true)
        setMetricData(allMetrics)
        setData(docList)
      }
    }
    fetchData()
  }, [])

  return (
    <main>
      <section className='hero flex flex-col items-center w-screen h-screen'>
        <section className='w-screen h-screen bg-black bg-opacity-5'>
          <section className='w-fit mx-auto mt-16 md:mt-28 py-6 px-4 hover:bg-white hover:bg-opacity-10 hover:shadow-lg transition duration-150 ease-in'>
            <article className='mb-2'>
              <h2 className='hero-h2 pb-4 text-7xl text-center font-bold text-white'><span className='text-blue-400'>Epi</span>Gis</h2>
              <p className='text-2xl text-center font-medium text-white mb-4 hero-p'>Collect, analyse and inform Mozambique's indexes</p>
              <p className='text-lg text-center font-semibold text-white hero-p'>Search for maps</p>
            </article>
            <form className='flex flex-col items-center w-full space-y-3 px-4' onSubmit={() => navigate(`portfolio/${search}`)}>
              <input className='w-full md:w-[600px] bg-transparent border border-white text-black text-center focus:bg-slate-100 focus:border-white' type="text" placeholder='Ex: Malaria' value={search} onChange={onChange} />
              <button className='flex gap-2 items-center py-2 px-6 bg-blue-400 text-sm text-white font-semibold shadow-lg transition ease-out duration-150 hover:bg-blue-500 ' type="submit">
                <FaSearch />
                <span>Search</span>
              </button>
            </form>
          </section>
        </section>
      </section>
      <Categories />
      <Metrics data={metricData} />
      {!done && <Loading/>}
      {done && 
      (<section className='my-16'>
        <article className='w-screen my-10'>
          <h3 className="text-3xl text-center font-medium uppercase card-font-h3 px-4">Maps Gallery</h3>
          <p className='text-center text-light py-1'>Featured maps on EpiGis Gallery</p>
        </article>
        <div className="w-fit mx-auto mt-5 px-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {data.slice(0,6).map(({id, data}) => (
              <CardListing key={id} id={id} data={data}/>
            ))}
        </div>
        <button className="block mt-10 mx-auto py-2 px-3 shadow-md rounded-md bg-blue-400 bg-gradient-to-bl text-white text-center font-medium transition ease-in-out duration-100 hover:bg-blue-500" onClick={() => navigate('/portfolio')}>See more</button>
      </section>)}
    </main>
  )
}

export default Home