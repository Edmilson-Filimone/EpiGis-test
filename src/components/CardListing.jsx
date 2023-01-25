import {BsPersonCircle } from 'react-icons/bs';
import {GoCalendar, GoLocation} from 'react-icons/go'
import {FaLayerGroup} from 'react-icons/fa'


function CardListing({id, data}) {
  return (
    <>
      <div className="w-full md:w-[320px] bg-white shadow-lg overflow-hidden">
        <div className="w-full p-2">
          <div className="w-full h-[250px] max-h-[250px] bg-slate-600 mb-2 border overflow-hidden">
            <img className='w-full h-full transition ease-in-out duration-500 hover:scale-105' src={data.profileUrl} alt="Image" id="image"/>
          </div>
          <h3 className="mb-2 text-left font-semibold truncate card-font-h3">{data.name}</h3>
          <div className="flex flex-wrap justify-between items-center mb-2">
            <div className='flex items-center space-x-2 my-1.5'>
              <FaLayerGroup/>
              <span className='uppercase text-[12px] font-semibold truncate'>{data.category}</span>
            </div>
            <div className='flex items-center space-x-2 my-1.5 w-20 overflow-hidden'>
              <GoLocation/>
              <span className='uppercase text-[12px] font-semibold truncate'>{data.district}</span>
            </div>
            <button className="w-[80px] my-1.5 px-2 py-1 rounded-md bg-sky-400 text-sm text-white font-medium transition ease-in-out duration-100 hover:bg-sky-500" type="button">Details</button>
          </div>
        </div>
        <div className="flex justify-between text-sm font-light mb-2 border-t pt-3 px-2">
            <div className="flex items-center space-x-2">
              <BsPersonCircle />
              <span>{data.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <GoCalendar/>
              <span>{data.date}</span>
            </div>
        </div>
      </div>
    </>
  )
}

export default CardListing