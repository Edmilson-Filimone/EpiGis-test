import {BsEnvelope, BsMap} from 'react-icons/bs'
import {TbPhoneCall} from 'react-icons/tb'
import {IoMdGlobe} from 'react-icons/io'
import { useState } from 'react'

function Footer() {
  
  const [formData, setFormData] = useState({name:'', subject:'', message:''})
  const {name, subject, message} = formData
  const onChange = (e)=>{
    setFormData((prevStat)=>({...prevStat, [e.target.id]:e.target.value}))
  }

  return (
    <div className='relative w-full px-16 pt-8 bg-[#004274]'>
      <div>
        <h2 className='text-center text-4xl text-white card-font-h3'>Get in Touch</h2>
        <p className='text-center text-sm text-white'>Feel free to drop us a line to contact us</p>
      </div>
      <div className='flex flex-col-reverse md:flex-row md:space-x-48'>
        <div className='text-white my-32 md:w-[600px]'>
          <h3 className='text-3xl font-semibold card-font-h3'>Feel Free To Contact</h3>
          <p className='py-2'>Lorem, ipsum dolor sit amet Nisi possimus eos qui voluptate quia recusandae rerum rem ad tenetur cumque, non debitis quod distinctio fuga?</p>
          <ul className='py-2'>
            <li className='flex items-center space-x-4 pb-5'>
              <BsMap className='bg-black w-10 h-10 py-3'/>
              <address className='not-italic'>São Dâmaso, Matola, Mozambique</address>
            </li>
            <li className='flex items-center space-x-4 pb-5'>
              <TbPhoneCall className='bg-black w-10 h-10 py-3'/>
              <span>+258 846 795 894</span>
            </li>
            <li className='flex items-center space-x-4 pb-5'>
              <BsEnvelope className='bg-black w-10 h-10 py-3'/>
              <span>philimone99@gmail.com</span>
            </li>
            <li className='flex items-center space-x-4 pb-5'>
              <IoMdGlobe className='bg-black w-10 h-10 py-3'/>
              <a href='https://edmilson-filimone.github.io/my_profile' target='_blank' title='Author profile'>https://edmilson-filimone.github.io</a>
            </li>
          </ul>
        </div>
        <form onSubmit={()=> setFormData({name:'', subject:'', message:''})} className='w-full mt-32 md:w-[600px]' action={`mailto:philimone99@gmail.com?subject=${subject}&body=${message}`} method="post" enctype="text/plain">
          <label className='block text-gray-400 font-light' htmlFor="name">Name<sup>*</sup></label>
          <input type="text" id='name' className='w-full text-white bg-transparent border-x-0 border-t-0 mb-5' value={name} onChange={onChange}/>
          <label className='block text-gray-400 font-light' htmlFor="subject">Subject<sup>*</sup></label>
          <input type="text" id='subject' className='w-full text-white bg-transparent border-x-0 border-t-0 mb-5' value={subject} onChange={onChange}/>
          <label className='block text-gray-400 font-light' htmlFor="message">Message<sup>*</sup></label>
          <textarea type="text" id='message' className='w-full text-white bg-transparent border-x-0 border-t-0 mb-5' value={message} onChange={onChange}/>
          <input className='px-6 py-1 border-2 border-white text-white' type="submit" value="Send" />
        </form>
      </div>
      <div className='absolute left-0 bottom-0 w-full h-20 py-7 bg-black bg-opacity-20'>
        <p className='text-sm text-center text-white'>Created By <span className='text-pink-600'>Edmilson Filimone</span> & <span className='text-sm'>designed by SoraTemplates</span></p>
      </div>
    </div>
  )
}

export default Footer