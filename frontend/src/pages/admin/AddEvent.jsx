
import React, {useEffect, useRef, useState} from 'react'
import { assets, eventCategories } from '../../assets/assets'
import Quill from 'quill'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddEvent = () => {

    const {axios} = useAppContext()
    const [isAdding, setIsAdding] = useState(false)

    const editorRef = useRef(null)
    const quillRef = useRef(null)



    const [image, setImage] = useState(false)
    const [title, setTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')
    const [category, setCategory] = useState('Startup')
    const [isPublished, setIsPublishde] = useState(false)
    const [date, setDate] = useState('')
    const [location, setLocation] = useState('')

    const onSubmitHandler = async (e) => {
        try{
            e.preventDefault()
            setIsAdding(true)

            const event ={
                title,
                subTitle,
                description : quillRef.current.root.innerHTML,
                date,
                location,
                category,
                isPublished
            }

            const formData = new FormData()
            formData.append('event', JSON.stringify(event))
            formData.append('image', image)

            const {data} = await axios.post(`/api/event/add`,formData)

            if(data.success){
                toast.success(data.message);
                setImage(false)
                setTitle('')
                setSubTitle('')
                setDate('')
                setLocation('')
                quillRef.current.root.innerHTML = ''
                setCategory('Select category')
            }else{
                toast.error(data.message)

            }

        }catch (error){
            toast.error(error.message)

        }finally{
            setIsAdding(false)
        }
        
    }

  

    useEffect(()=>{
        if(!quillRef.current && editorRef.current){
            quillRef.current = new Quill(editorRef.current, {theme: 'snow'})
        }

    },[])


  return (
   <form onSubmit={onSubmitHandler} className='flex  text-gray-600 h-[100vh] w-[100vw] overflow-scroll'>
    <div className=' w-full max-w-3xl p-4 md:p-10 sm:m-10 rounded'>
        <p>Upload thumbnail</p>
        <label htmlFor="image">
            <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer' />
            <input onChange={(e)=> setImage(e.target.files[0])} type="file" id='image' required hidden/>
        </label>

        <p className='mt-4'>Event title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={(e)=>setTitle(e.target.value)} value={title}/>

        <p className='mt-4'>Sub title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={(e)=>setSubTitle(e.target.value)} value={subTitle}/>

        <p className='mt-4'>Event Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
            <div ref={editorRef}></div>
            
            
        </div>

        <div className="flex w-1/2 flex-col">
  <label htmlFor="date" className="font-semibold mb-1">Event Date</label>
  <input
    type="date"
    id="date"
    name="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    className="border p-2 rounded-lg"
    required
  />
</div>
<div className='p-2'>
    <p className='mt-4'>Location</p>
    <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={(e)=>setLocation(e.target.value)} value={location}/>

</div>

        <p className='mt-4'>Event category</p>
        <select onChange={(e)=> setCategory(e.target.value)} name="category" id="" value={category} className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
            <option value="">Select category</option>
            {eventCategories.map((item, index)=>{
                return <option key={index} value={item}>{item}</option>

            })}
        </select>

        <div className='flex gap-2 mt-4'> 
            <p>Publish Now</p>
            <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer' onChange={(e)=> setIsPublishde(e.target.checked)}/>
        </div>

        <div>
            <button disabled={isAdding} type='submit' className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'>{isAdding ? 'Adding...': 'Add Event'}</button>
        </div>

    </div>

   </form>
  )
}

export default AddEvent
