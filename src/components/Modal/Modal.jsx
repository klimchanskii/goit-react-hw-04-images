import { useEffect } from 'react';
import { Overlay, ModalWindow } from './Modal.styled'
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root')



export const Modal = (props) => {

    useEffect(() => {
        
       window.addEventListener('keydown', handleKeyDown ) 

        return()=>{window.removeEventListener('keydown', handleKeyDown)}
   })

   const handleKeyDown = e => {
        if (e.code === `Escape`) {
                props.closeModal()
                
            }
       }

 const hendelClick = e => {
        if (e.target === e.currentTarget) {
        props.closeModal()
    }
}
    
   




   

        
        return  createPortal(<Overlay onClick={hendelClick} >
            <ModalWindow>
                <img src={props.image} alt="" />
          
         </ModalWindow>
        </Overlay >,modalRoot  )
      
    
   
}