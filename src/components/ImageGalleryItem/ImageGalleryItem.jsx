import {ImageGalleryItemImage,ImageGalleryItem} from './ImageGalleryItem.styled'

export const GalleryItems = (props) => {
    
        const {images} = props
       return (
        images.map(image => 
            <ImageGalleryItem key={image.id}
              
            >
                <ImageGalleryItemImage
                    onClick={props.selectedPicture}
                    src={image.webformatURL} alt=""
               
                />
               
          </ImageGalleryItem>  

        )
        
    )
    
   
}