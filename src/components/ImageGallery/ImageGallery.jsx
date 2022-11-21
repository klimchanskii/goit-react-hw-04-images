import { GalleryItems } from '../ImageGalleryItem/ImageGalleryItem'

import {ImageGallery} from './ImageGallery.styled'


export const Gallery = (props) => {
    
    

    
        return (
        <>
       
        <ImageGallery className="gallery">
            <GalleryItems images={ props.log } selectedPicture={props.selectedPicture} />

        </ImageGallery> 
        
        
     </>
    
       

    )   

    

  

}