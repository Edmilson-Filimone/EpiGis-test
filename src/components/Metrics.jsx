import React from 'react'
import {ChartBarIcon, FireIcon, MapIcon, SunIcon, UserGroupIcon} from '@heroicons/react/24/outline'

function Metrics({data}) {
  return (
    <section className='w-screen my-16 text-white metrics-container'>
      <section className='w-screen py-12  bg-black bg-opacity-50'>
        <h2 className='text-3xl text-center font-medium uppercase card-font-h3 px-4'>Our collection Metrics</h2>
        <article className='w-screen my-10'>
          <ul className='grid gap-16 md:gap-0 md:grid-cols-2 md:grid-rows-3 lg:grid-rows-1 lg:grid-cols-5 mx-auto'>
            <li className='metrics'>
              <MapIcon className='metrics-icon'/>
              <span className='metrics-value'>{data.demography + data.environment + data.epidemiology + data.humanitarian}</span>
              <span className='metrics-label'>Total Maps</span>
            </li>
            <li className='metrics'>
              <UserGroupIcon className='metrics-icon'/>
              <span className='metrics-value'>{data.demography}</span>
              <span className='metrics-label'>Demography</span>
            </li>
            <li className='metrics md:col-span-2 lg:col-auto'>
              <SunIcon className='metrics-icon'/>
              <span className='metrics-value'>{data.environment}</span>
              <span className='metrics-label'>Environment</span>
            </li>
            <li className='metrics'>
              <ChartBarIcon className='metrics-icon'/>
              <span className='metrics-value'>{data.epidemiology}</span>
              <span className='metrics-label'>Epidemiology</span>
            </li>
            <li className='metrics'>
              <FireIcon className='metrics-icon'/>
              <span className='metrics-value'>{data.humanitarian}</span>
              <span className='metrics-label'>Humanitarian</span>
            </li>
          </ul>
        </article>
      </section>
    </section>
  )
}

export default Metrics