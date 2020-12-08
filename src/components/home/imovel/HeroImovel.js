import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  /* border: 3px solid red; */
  background-color: var(--black);

  > div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`

export default function HeroImovel({ images }) {
  return (
    <Wrapper>
      {/* TODO finalizar carrossel de fotos */}
      <div>
        {images.map((img, i) => {
          return <img key={img} src={img} alt="" />
        })}
      </div>
    </Wrapper>
  )
}
