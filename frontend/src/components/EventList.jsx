import React, { useState } from 'react'
import { eventCategories } from '../assets/assets'
import { motion } from 'motion/react'
import EventCard from './EventCard'
import { useAppContext } from '../context/AppContext'

const EventList = () => {

    const [menu, setMenu] = useState("All")
    const {events, input } = useAppContext()

    const filteredEvents = ()=>{
        if (input === ''){
            return events
        }
        else{
            return events.filter((event)=>event.title.toLowerCase().includes(input.toLowerCase()) || event.category.toLowerCase().includes(input.toLowerCase()))
        }
    }

  return (
    <div>
        <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
            {eventCategories.map((item)=>(
                <div key={item} className='relative'>
                    <button onClick={()=>setMenu(item)} className={`cursor-pointer text-gray-500 ${menu === item && 'text-white px-4 pt-0.5'}`}>
                        {item}
                        {menu === item && (
                            <motion.div layoutId='underline' 
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className='absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full'></motion.div>
                        )
                        }
                    </button>
                </div>
            ))}

        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-clos-3 xl:grid-cols-4 gap-9 md-24 mx-8 sm:mx-16 xl:mx-40'>
            {filteredEvents().filter((event)=> menu === "All" ? true : event.category === menu).map((event) => <EventCard key={event._id} event={event}/>)}

        </div>
      
    </div>
  )
}

export default EventList
