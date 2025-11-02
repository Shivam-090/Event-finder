import Moment from 'moment';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const EventCard = ({event}) => {
  const {title, description, category, date, comingCount, location, image, _id} = event;
  const navigate = useNavigate();  
  return (
    <div onClick={()=> navigate(`/event/${_id}`)} className='w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadiow-primary/25 duration-300 cursor-pointer'>
      <img src={image} alt="" className='aspect-video' />
      <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'>{category}</span>
      <div className='px-5 py-1 '>
        <div className='flex gap-2 items-center'>

        <span className='text-sm text-primary'>Location: </span>
        <p className='text-gray-600 text-xs'> {location}</p>

        </div>
        
         <div className='flex gap-2 items-center'>

        <span className='text-sm text-primary'>Date: </span>
        <p className='text-gray-600 text-xs'> {Moment(date).format('MMMM Do YYYY')}</p>

        </div>
         <div className='flex gap-2 items-center'>

        <span className='text-sm text-primary'>Coming: </span>
        <p className='text-gray-600 text-xs'> {comingCount}</p>

        </div>
      </div>
      <div className='px-5 py-1'>
        <h5 className='mb-2 font-medium text-gray-900'>{title}</h5>
        <p className='mb-3 text-xs text-gray-600' dangerouslySetInnerHTML={{"__html": description.slice(0,58)}}></p>
      </div>
    </div>
  )
}

export default EventCard
