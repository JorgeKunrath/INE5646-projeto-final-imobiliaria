import React, { useState } from 'react'
import styled from 'styled-components'
import Slider from '@material-ui/core/Slider'

import Card from '../common/Card'

import IcoQuartos from '../../icons/Quartos'
import IcoBanheiros from '../../icons/Banheiros'
import IcoGaragem from '../../icons/Garagem'
import IcoArea from '../../icons/Area'

const Aside = styled.aside``

const FilterInputs = styled.div`
  label {
    display: flex;
    flex-flow: column;
    margin-bottom: 1em;
    color: var(--gray3);
    min-width: 0;
  }

  hr {
    margin-bottom: 1em;
    border: none;
    border-bottom: 1px solid #e0e0e0;
  }
`

const InputStyled = styled.input`
  width: unset;
  max-width: auto;
  margin-top: 0.25em;
  font-size: inherit;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 0.5em 0.75em;
  color: var(--gray3);
  border: ${(props) =>
    props.error ? '1px solid #eb5757' : '1px solid #e0e0e0'};
  box-shadow: ${(props) =>
    props.error ? 'inset 0 0 0 1px #eb5757' : 'inset 0 0 0 0 transparent'};
  transition: box-shadow 0.2s ease, border 0.2s ease;

  :focus {
    outline: none;
  }

  &.textarea {
    resize: vertical;
  }
`

const Flags = styled.div`
  span {
    display: inline-block;
    font-size: 0.9em;
    line-height: 1;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    background-color: var(--gray6);
    padding: 0.25em 0.5em 0.4em;
    border-radius: 5px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    &.selected {
      background-color: var(--orange);
      color: white;
    }
  }
`

const Sliders = styled.div`
  margin-top: 1rem;
  padding: 0 0.25em;
  .MuiSlider-root {
    display: block;
    max-width: 98%;
    margin: 0 auto;
  }
  .MuiSlider-colorPrimary {
    color: var(--orange);
  }
`

const SliderLabel = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 0.5rem;
    fill: var(--orange);
  }
`

export default function Filters(props) {
  const { rawData, filteredData, setFilteredData, style = {} } = props

  // every time that is made a request
  React.useEffect(() => {
    setFilteredData(rawData)
  }, [rawData])

  //
  //
  //
  //
  //
  // FILTERS STUFF:

  // ------------------------
  // CONTROLES

  // isso tem que vir da informação q existe de fato
  let initialRanges = {
    quartos: [1, 8],
    banheiros: [2, 5],
    garagem: [0, 3],
    area: [40, 300],
    aluguel: [720, 3000],
  }

  const [vQuartos, setVQuartos] = useState(initialRanges['quartos'])
  function handleQuartos(e, value) {
    setVQuartos(value)
    console.log({ value })
  }

  // ----------------------------------------
  const [vBanheiros, setVBanheiros] = useState(initialRanges['banheiros'])
  function handleBanheiros(e, value) {
    setVBanheiros(value)
    console.log({ value })
  }

  // ----------------------------------------
  const [vGaragem, setVGaragem] = useState(initialRanges['garagem'])
  function handleGaragem(e, value) {
    setVGaragem(value)
    console.log({ value })
  }

  // ----------------------------------------
  const [vArea, setVArea] = useState(initialRanges['area'])
  function handleArea(e, value) {
    setVArea(value)
    console.log({ value })
  }

  // ----------------------------------------
  const [vAluguel, setVAluguel] = useState(initialRanges['aluguel'])
  function handleAluguel(e, value) {
    setVAluguel(value)
    console.log({ value })
  }

  // ------------------------
  // LÓGICA ...
  // todo

  return (
    <Aside>
      <Card style={{ padding: '0.5em', ...style }}>
        <FilterInputs>
          <label>
            {/* cidade */}
            <InputStyled as="select" name="cidade" title="Filtrar Cidades">
              <option value="noFilter">Cidade</option>
              <option value="disponível">
                lista de opções aqui com um map do q tem disponível
              </option>
            </InputStyled>
          </label>
          <label>
            {/* cidade */}
            <InputStyled as="select" name="bairro" title="Filtrar Bairros">
              <option value="noFilter">Bairros</option>
              <option value="value">
                bairros q tem na cidade selecionada (map)
              </option>
            </InputStyled>
            <div>bairros selecionados vão aqui com botão pra deselecionar</div>
          </label>

          <hr />

          {/* <Flags>
            <span className="selected">casa</span>
            <span className="">apartamento</span>
          </Flags> */}

          <Sliders>
            <label>
              <SliderLabel>
                <IcoQuartos />
                {vQuartos[0] === vQuartos[1]
                  ? `${vQuartos[0]}`
                  : `${vQuartos[0]} — ${vQuartos[1]}`}
              </SliderLabel>
              <Slider
                value={vQuartos}
                onChange={handleQuartos}
                min={initialRanges['quartos'][0]}
                max={initialRanges['quartos'][1]}
                valueLabelDisplay="auto"
                aria-labelledby="range-e"
              />
            </label>
            <label>
              <SliderLabel>
                <IcoBanheiros />
                {vBanheiros[0] === vBanheiros[1]
                  ? `${vBanheiros[0]}`
                  : `${vBanheiros[0]} — ${vBanheiros[1]}`}
              </SliderLabel>
              <Slider
                value={vBanheiros}
                onChange={handleBanheiros}
                min={initialRanges['banheiros'][0]}
                max={initialRanges['banheiros'][1]}
                valueLabelDisplay="auto"
                aria-labelledby="range-e"
              />
            </label>
            <label>
              <SliderLabel>
                <IcoGaragem />
                {vGaragem[0] === vGaragem[1]
                  ? `${vGaragem[0]}`
                  : `${vGaragem[0]} — ${vGaragem[1]}`}
              </SliderLabel>
              <Slider
                value={vGaragem}
                onChange={handleGaragem}
                min={initialRanges['garagem'][0]}
                max={initialRanges['garagem'][1]}
                valueLabelDisplay="auto"
                aria-labelledby="range-e"
              />
            </label>
            <label>
              <SliderLabel>
                <IcoArea />
                {vArea[0] === vArea[1]
                  ? `${vArea[0]}`
                  : `${vArea[0]} — ${vArea[1]}`}
              </SliderLabel>
              <Slider
                value={vArea}
                onChange={handleArea}
                min={initialRanges['area'][0]}
                max={initialRanges['area'][1]}
                step={5}
                valueLabelDisplay="auto"
                aria-labelledby="range-e"
              />
            </label>
            <label>
              <SliderLabel>
                <span
                  style={{
                    fontSize: '1.2rem',
                    lineHeight: '1',
                    color: 'var(--orange)',
                    marginRight: '0.5rem',
                  }}
                >
                  R$
                </span>
                {vAluguel[0] === vAluguel[1]
                  ? `${vAluguel[0]}`
                  : `${vAluguel[0]} — ${vAluguel[1]}`}
              </SliderLabel>
              <Slider
                value={vAluguel}
                onChange={handleAluguel}
                min={initialRanges['aluguel'][0]}
                max={initialRanges['aluguel'][1]}
                step={50}
                valueLabelDisplay="auto"
                aria-labelledby="range-e"
              />
            </label>
          </Sliders>
        </FilterInputs>
      </Card>
    </Aside>
  )
}
