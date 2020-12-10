import React, { useState } from 'react'
import Slider from '@material-ui/core/Slider'

import Card from '../common/Card'
import {
  Aside,
  FilterInputs,
  InputStyled,
  Flags,
  Sliders,
  SliderLabel,
} from './Filters_styles'

import IcoQuartos from '../../icons/Quartos'
import IcoBanheiros from '../../icons/Banheiros'
import IcoGaragem from '../../icons/Garagem'
import IcoArea from '../../icons/Area'

export default function Filters({ rawData, filteredData, setFilteredData }) {
  // every time that is made a request
  React.useEffect(() => {
    console.log(
      'EU MUDEEEEEIIII ------------------------------------------------------------------------'
    )
    setFilteredData(rawData)
  }, [rawData])

  React.useEffect(() => {
    if (filteredData) {
      console.log({ rawData })
      console.log({ filteredData })
    }
  }, [filteredData])

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
    quartos: [0, 8],
    banheiros: [0, 5],
    garagem: [0, 5],
    area: [10, 300],
    aluguel: [100, 3000],
  }

  const [vQuartos, setVQuartos] = useState(initialRanges['quartos'])
  function handleQuartos(e, value) {
    setVQuartos(value)
    // console.log({ value })
  }

  // ----------------------------------------
  const [vBanheiros, setVBanheiros] = useState(initialRanges['banheiros'])
  function handleBanheiros(e, value) {
    setVBanheiros(value)
    // console.log({ value })
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
    // console.log({ value })
  }

  // ----------------------------------------
  const [vAluguel, setVAluguel] = useState(initialRanges['aluguel'])
  function handleAluguel(e, value) {
    setVAluguel(value)
    // console.log({ value })
  }

  // ------------------------
  // LÓGICA ...
  // todo

  React.useEffect(() => {
    console.log(
      '==================================================== RODANDO O USE EFFECT DE FILTER ===================================================================================================================='
    )

    console.table([vQuartos, vBanheiros, vGaragem, vArea, vAluguel])

    if (rawData) {
      // manipulate
      console.log('raw data aaaaaaa', { rawData })
      let newData = rawData.filter((house) => {
        console.log({ house })

        console.table([
          +house.detalhes.dormitorios,
          +house.detalhes.banheiros,
          +house.detalhes.vagas,
          +house.detalhes.area,
          +house.aluguel,
        ])

        return (
          +house.detalhes.dormitorios >= vQuartos[0] &&
          +house.detalhes.dormitorios <= vQuartos[1] &&
          +house.detalhes.banheiros >= vBanheiros[0] &&
          +house.detalhes.banheiros <= vBanheiros[1] &&
          +house.detalhes.vagas >= vGaragem[0] &&
          +house.detalhes.vagas <= vGaragem[1] &&
          +house.detalhes.area >= vArea[0] &&
          +house.detalhes.area <= vArea[1] &&
          +house.aluguel >= vAluguel[0] &&
          +house.aluguel <= vAluguel[1]
        )
      })
      console.log('RESULTADO -----------')
      console.log({ newData })

      // set
      setFilteredData(newData)
    }
  }, [vQuartos, vBanheiros, vGaragem, vArea, vAluguel])

  return (
    <Aside>
      <Card style={{ padding: '0.5em' }}>
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
