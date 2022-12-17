import{ LazyLoadImage } from 'react-lazy-load-image-component' 
import 'react-lazy-load-image-component/src/effects/blur.css';
// import Load from '../../Load/Load';



const LazyLoad = (props) => {
    const {image} = props
    return ( 
             <LazyLoadImage

            key={image.key}
            alt={image.alt}
            src={image.src}
            effect="blur"
            height={image.height}
            width={image.width}
            style={{
                objectFit: 'cover',
                objectPosition: 'center',
                ...image.styles
            }}
            placeholderSrc={image.src}
            // scrollPosition={scrollPosition}
            // If the image we are creating here has the same src than before,
            // we can directly display it with no need to lazy-load.

            />
     );
}
 
export default LazyLoad;