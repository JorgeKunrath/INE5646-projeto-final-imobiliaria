import styled from 'styled-components'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

const Wrapper = styled.section`
  background-color: var(--black);

  img {
    max-height: 70vmin;
    object-fit: contain;
  }

  /**
  * overwrites carousel
  */
  .carousel .slider .slide {
    display: grid;
    place-items: center;
  }
  .carousel.carousel-slider .control-arrow {
    width: 70px;
  }
  .carousel .control-dots {
    margin: 0.25rem auto;
    display: flex;
    justify-content: center;
    height: 1rem;
  }
  .carousel .control-dots .dot {
    opacity: 0.6;
    width: 0.5rem;
    height: 0.5rem;
    display: block;
    position: relative;

    /* make clickable area bigger */
    ::after {
      content: '';
      position: absolute;
      width: 1rem;
      height: 1rem;
      top: -50%;
      left: -50%;
    }
  }
  .carousel .control-dots .dot.selected {
    opacity: 1;
    transform: scale(1.2);
  }
`

export default function HeroImovel({ images }) {
  return (
    <Wrapper>
      <Carousel showThumbs={false} showStatus={false} infiniteLoop={true}>
        {images && images.map((image, i) => <img key={i} src={image} alt="" />)}
      </Carousel>
    </Wrapper>
  )
}
