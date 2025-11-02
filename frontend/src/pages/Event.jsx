import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Moment from 'moment';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';


const Event = () => {

  
  const {id} = useParams();
  const {axios, incrementComing} = useAppContext()
  
  const [data, setData] = useState(null)


  const fetchEventData = async () => {
    try{
      const {data} = await axios.get(`/api/event/${id}`)
      data.success ? setData(data.event) : toast.error(data.message)

    }catch (error){
      toast.error(error.message)

    }
  }





  useEffect(() => {
    fetchEventData();
    

   
  },[])
  



  return data ? (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,),linear-gradient(to_bottom,#8080800a_1px,)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-25 -z-10 m-auto h-[400px] w-[400px] rounded-full bg-sky-500 opacity-35 blur-[100px]"></div></div>
      <Navbar />
      <div className='text-center mt-20 text-gray-600' >
        <p className='text-primary py-4 font-medium'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <p className='text-primary py-4 font-medium'>Date of event {Moment(data.date).format('MMMM Do YYYY')}</p>
        <p className='text-primary py-4 font-medium'>Location: {data.location}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
        <h2 className='my-5 max-w-lg turncate mx-auto' dangerouslySetInnerHTML={{__html:data.subTitle}}></h2>
        
      </div>

      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.image} alt="" className='Rounded-3xl mb-5' />


        <div className='rich-text max-w-3xl' dangerouslySetInnerHTML={{__html: data.description}}></div>

         <button
          onClick={() => incrementComing(data._id)}
          className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition-transform active:scale-95"
        >
          👥 Coming ({data.comingCount || 0})
        </button>




        
        
        {/* Share buttons */}
        <div className='my-24 max-w-3xl mx-auto'>
          <p className='font-semibold my-4'>Share this Event on social media
          </p>

          <div className='flex gap-4'>
              <a
      href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(window.location.href)}`}
      target="_blank"
      rel="noopener noreferrer"
      title="Share on Facebook"
    >
      <img src={assets.facebook_icon} className='w-15 border rounded-full' alt="Facebook" />
    </a>

    <a
      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(data.title)}`}
      target="_blank"
      rel="noopener noreferrer"
      title="Share on Twitter"
    >
      <img src={assets.twitter_icon} className='w-15 border rounded-full' alt="Twitter" />
    </a>

    <a
      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(data.title + " " + window.location.href)}`}
      target="_blank"
      rel="noopener noreferrer"
      title="Share on WhatsApp"
    >
      <img src={assets.whatsapp_icon} className='w-15 border rounded-full' alt="WhatsApp" />
    </a>
          </div>
        
        </div>

      </div>

      <Footer />

    </div>
  ) : <div className="flex justify-center items-center h-screen bg-gray-100">
    <Loader /></div> 
}

export default Event
