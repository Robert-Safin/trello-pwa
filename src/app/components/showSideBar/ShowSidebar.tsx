

import { toggleHideSidebar } from '@/redux/slices/hideSidebarSlice'
import {AiFillEye} from 'react-icons/ai'
import { useDispatch } from 'react-redux'

const ShowSidebar = () => {
  const dispatch = useDispatch()
  return (
    <div
    style={{
      cursor: 'pointer'
    }}
    className='absolute bottom-4  bg-action px-3 py-2 rounded-r-full' onClick={()=> {
      dispatch(toggleHideSidebar())
    }}>
      <AiFillEye className="w-6 h-6 dark:text-white text-black"/>
    </div>
  )
}


export default ShowSidebar
