import {  useState,useEffect } from "react";
import { Searchbar } from './Searchbar/Searchbar';
import { Gallery } from "./ImageGallery/ImageGallery";
import { Button } from './Button/Button'
import { Modal } from "./Modal/Modal";
import { Loader } from './Loader/Loader'
import { appService } from './Api'

export const App = () => {

  const [search, setSearch] = useState('');

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [status, setStatus] = useState("resolve");
  const [totalHits, setTotalHits] = useState(null);
  
  useEffect(() => {
    if (search === '') {
      setTotalHits(0)
      return
    }

    appService(search, page).then(arr => {

      if (!arr.hits.length) {
        setData([])
        return alert(
          'There is no images found with this search request'
        );
      }

      setData(prevState => [...prevState, ...arr.hits])
      setStatus('resolve')
      setTotalHits(arr.totalHits)

 
   
     
    })

   },[search, page])  
  
  const handelFormSubmit = (search) => {
    setStatus("pending")
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
    // if (status === 'idle') {
      
    // return  <Searchbar onSubmit={handelFormSubmit} />
    // }


}
  
