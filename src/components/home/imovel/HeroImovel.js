import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  /* border: 3px solid red; */
  background-color: var(--black);
  position: relative;
  min-height: 60vmin;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* > div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  } */
`

export default function HeroImovel({ images }) {
  console.log({ images })
  return (
    <Wrapper>
      {/* TODO finalizar carrossel de fotos */}
      <img src={images[0]} alt="" />
    </Wrapper>
  )
}
