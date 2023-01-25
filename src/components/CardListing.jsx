import {BsPersonCircle } from 'react-icons/bs';
import {GoCalendar, GoLocation} from 'react-icons/go'
import {FaLayerGroup} from 'react-icons/fa'


function CardListing({url, title}) {
  return (
    <>
      <div className="w-full bg-white shadow-md overflow-hidden">
        <div className="w-full p-2">
          <div className="w-full h-[250px] max-h-[250px] bg-slate-600 mb-2 border">
            <img className='w-full h-full' src={url} alt="Image" id="image"/>
          </div>
          <h3 className="mb-2 text-left font-semibold truncate card-font-h3">{title}</h3>
          <div className="flex flex-wrap justify-between items-center mb-2">
            <div className='flex items-center space-x-2 my-1.5'>
              <FaLayerGroup/>
              <span className='uppercase text-[12px] font-semibold truncate'>Epidemiology</span>
            </div>
            <div className='flex items-center space-x-2 my-1.5'>
              <GoLocation/>
              <span className='uppercase text-[12px] font-semibold truncate'>Maputo</span>
            </div>
            <button className="w-[80px] my-1.5 px-2 py-2 rounded-md bg-sky-400 text-white font-medium" type="button">Details</button>
          </div>
        </div>
        <div className="flex justify-between text-sm font-light mb-2 border-t pt-3 px-2">
            <div className="flex items-center space-x-2">
              <BsPersonCircle />
              <span>Edmilson Filimone</span>
            </div>
            <div className="flex items-center space-x-2">
              <GoCalendar/>
              <span>2015</span>
            </div>
        </div>
      </div>
    </>
  )
}

export default CardListing