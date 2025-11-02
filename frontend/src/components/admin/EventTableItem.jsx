
import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const EventTableItem = ({event, index, fetchEvents}) => {
  const {axios} = useAppContext()
    const {title, createdAt} = event;
    const EventDate = new Date(createdAt);

    const deleteEvent = async ()=>{
      const confirm = window.confirm('Are you sure you want to delete this event?')
      if(!confirm){
        return
      }
      try{
        const {data} = await axios.post('/api/event/delete',{id: event._id})
        if(data.success){
          toast.success(data.message)
          await fetchEvents()
        }else{
          toast.error(data.message)
        }
      }catch (error){
        toast.error(error.message)
      }

    }

    const togglePublush = async ()=>{
      try{

        const {data} = await axios.post('/api/event/toggle-publish',{id: event._id})
         if(data.success){
            toast.success(data.message)
            await fetchEvents()
          }else{
            toast.error(data.message)
          }
      }catch (error){
        toast.error(error.message)
      }

    }
    
  return (
    <tr className='boreer-y border-gray-300'>
        <th className='px-2 py-4'>{index}</th>
        <td className='px-2 py-4'>{title}</td>
        <td className='px-2 py-4 max-sm:hidden'>{EventDate.toDateString()}</td>
        <td className='px-2 py-4 max-sm:hidden'>
            <p className={`${event.isPublished? "text-green-600":"text-orange-700"}`}>{event.isPublished ? 'Published': 'Unpublished'}</p>
        </td>
        <td className='px-2 py-4 flex text-xs gap-3'>
            <button onClick={togglePublush} className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>{event.isPublished ? 'UnPublish': 'Publish'}</button>
            <img onClick={deleteEvent} src={assets.cross_icon} alt="" className='w-8 hover:scale-110 transition-all cursor-pointer'/>
        </td>
    </tr>
  )
}

export default EventTableItem
