import {  useState,useEffect } from "react";
import { Searchbar } from './Searchbar/Searchbar';
import { Gallery } from "./ImageGallery/ImageGallery";
import { Button } from './Button/Button'
import { Modal } from "./Modal/Modal";
import { Loader } from './Loader/Loader'
import { appService } from './Api'
// import axios from "axios";
export const App = () => {

  const [search, setSearch] = useState('');
  const [prevSearch,setPrevSearch] = useState('')
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [status, setStatus] = useState("idle");
  const [totalHits, setTotalHits] = useState(null);
  
  useEffect(() => {
    console.log(prevSearch);

    if (search === '' && prevSearch === search) {
      setTotalHits(0)
      return
    }
    setStatus("pending")
    appService(search, page).then(arr => {

      if (!arr.hits.length) {
        setData({ data: [] })
        return alert(
          'There is no images found with this search request'
        );
      }
      setData([...data, ...arr.hits])
      setStatus('resolve')
      setTotalHits(arr.totalHits)
      setPrevSearch(search)
     
    })

   },[search,page])


//   useEffect(() => {
//     if (search === '') {
//       return
//     }
//     const controller = new AbortController()
//     setStatus("pending")
//     const appService = async () => {
//       axios.defaults.baseURL = 'https://pixabay.com/api';
// try {
//   const response = await axios.get( `/`,{
//     params: {
//           signal:controller.signal,
//           key:process.env.REACT_APP_API_KEY,
//           q: `${search}`,
//           page: `${page}`,
//           image_type: "photo",
//           orientation: "horizontal",
//           per_page: 12
//        }
//      })

// return response.data

// } catch (error) {
//   console.log(error.message);
// }
//     }
    
//     appService().then(arr => {

//       if (!arr.hits.length) {
//         setData({ data: [] })
//         return alert(
//           'There is no images found with this search request'
//         );
//       }
//       setData([...data, ...arr.hits])
//       setStatus('resolve')
//       setTotalHits(arr.totalHits)
     
//     })
    
//     return () => {
//       controller.abort()
//     }

//    },[search,page])
  
  
  
  const handelFormSubmit = (search) => {
    setSearch(search)
    setData([])
    setPage(1)

  }
  
  const incrementPage = () => {
    setPage(page + 1)
  }

   const closeModal = () => {
     setShowModal(false)
    }

  
 const selectedPicture = (e) => {

    setStatus('pending')
      const largeImg = e.currentTarget.src
      const img = data.find(el => el.webformatURL === largeImg).largeImageURL

    setModalImage(img)
    setShowModal(true)
    setStatus("resolve")
  } 

    
    if (status === 'pending') {
      return  <Loader/>
    }

  if (status === 'resolve') {
       return <>
         
         <Searchbar onSubmit={handelFormSubmit} />
         <Gallery log={data}
           selectedPicture={selectedPicture}
         />
         {(page < Math.ceil(totalHits/12)) && <Button incrementPage={incrementPage} />}
       {showModal && <Modal image={modalImage} closeModal={closeModal} />}
       </>
     }
    if (status === 'idle') {
      
    return  <Searchbar onSubmit={handelFormSubmit} />
    }


}
  
