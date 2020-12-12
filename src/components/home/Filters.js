import { useEffect, useState } from 'react'
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
  // ------------------------
  // CONTROLES

  const [initialRanges, setInitialRanges] = useState(false)

  const [vQuartos, setVQuartos] = useState()
  const [vBanheiros, setVBanheiros] = useState()
  const [vGaragem, setVGaragem] = useState()
  const [vArea, setVArea] = useState()
  const [vAluguel, setVAluguel] = useState()

  // every time that is made a request
  useEffect(() => {
    if (rawData) {
      let base = {
        dormitorios: [],
        banheiros: [],
        vagas: [],
        area: [],
        aluguel: [],
      }
      rawData.forEach((house) => {
        console.log({ house })
        base.dormitorios.push(house.detalhes.dormitorios)
        base.banheiros.push(house.detalhes.banheiros)
        base.vagas.push(house.detalhes.vagas)
        base.area.push(house.detalhes.area)
        base.aluguel.push(house.aluguel)
      })
      let minmax = {
        quartos: [Math.min(...base.dormitorios), Math.max(...base.dormitorios)],
        banheiros: [Math.min(...base.banheiros), Math.max(...base.banheiros)],
        garagem: [Math.min(...base.vagas), Math.max(...base.vagas)],
        area: [Math.min(...base.area), Math.max(...base.area)],
        aluguel: [Math.min(...base.aluguel), Math.max(...base.aluguel)],
      }
      setInitialRanges(minmax)
      setFilteredData(rawData)
    }
  }, [rawData])

  // set initial ranges for each slider
  useEffect(() => {
    if (initialRanges) {
      setVQuartos(initialRanges['quartos'])
      setVBanheiros(initialRanges['banheiros'])
      setVGaragem(initialRanges['garagem'])
      setVArea(initialRanges['area'])
      setVAluguel(initialRanges['aluguel'])
    }
  }, [initialRanges])

  //
  //
  //
  //
  //
  // FILTERS STUFF:

  // ------------------------
  // LÓGICA

  useEffect(() => {
    console.log('=========== RODANDO O USE EFFECT DE FILTER ===========')

    console.table([vQuartos, vBanheiros, vGaragem, vArea, vAluguel])

    if (filteredData && initialRanges) {
      console.log('-----------')
      console.log({ filteredData })
      console.log('-----------')
      // manipulate
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
          <p style={{ margin: 0, color: 'var(--gray3)' }}>Filtros</p>
          <hr />
          {/* <label>
            <InputStyled as="select" name="cidade" title="Filtrar Cidades">
              <option value="noFilter">Cidade</option>
              <option value="disponível">
                lista de opções aqui com um map do q tem disponível
              </option>
            </InputStyled>
          </label>
          <label>
            <InputStyled as="select" name="bairro" title="Filtrar Bairros">
              <option value="noFilter">Bairros</option>
              <option value="value">
                bairros q tem na cidade selecionada (map)
              </option>
            </InputStyled>
            <div>bairros selecionados vão aqui com botão pra deselecionar</div>
          </label>

          <hr /> */}
          {/* <Flags>
            <span className="selected">casa</span>
            <span className="">apartamento</span>
          </Flags> */}
          {initialRanges && (
            <Sliders>
              <label>
                {vQuartos && (
                  <>
                    <SliderLabel>
                      <IcoQuartos />
                      {vQuartos[0] === vQuartos[1]
                        ? `${vQuartos[0]}`
                        : `${vQuartos[0]} — ${vQuartos[1]}`}
                    </SliderLabel>
                    <Slider
                      value={vQuartos}
                      onChange={(e, v) => setVQuartos(v)}
                      min={initialRanges['quartos'][0]}
                      max={initialRanges['quartos'][1]}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-e"
                    />
                  </>
                )}
              </label>
              {vBanheiros && (
                <label>
                  <SliderLabel>
                    <IcoBanheiros />
                    {vBanheiros[0] === vBanheiros[1]
                      ? `${vBanheiros[0]}`
                      : `${vBanheiros[0]} — ${vBanheiros[1]}`}
                  </SliderLabel>
                  <Slider
                    value={vBanheiros}
                    onChange={(e, v) => setVBanheiros(v)}
                    min={initialRanges['banheiros'][0]}
                    max={initialRanges['banheiros'][1]}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-e"
                  />
                </label>
              )}
              {vGaragem && (
                <label>
                  <SliderLabel>
                    <IcoGaragem />
                    {vGaragem[0] === vGaragem[1]
                      ? `${vGaragem[0]}`
                      : `${vGaragem[0]} — ${vGaragem[1]}`}
                  </SliderLabel>
                  <Slider
                    value={vGaragem}
                    onChange={(e, v) => setVGaragem(v)}
                    min={initialRanges['garagem'][0]}
                    max={initialRanges['garagem'][1]}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-e"
                  />
                </label>
              )}
              {vArea && (
                <label>
                  <SliderLabel>
                    <IcoArea />
                    {vArea[0] === vArea[1]
                      ? `${vArea[0]}`
                      : `${vArea[0]} — ${vArea[1]}`}{' '}
                    m²
                  </SliderLabel>
                  <Slider
                    value={vArea}
                    onChange={(e, v) => setVArea(v)}
                    min={initialRanges['area'][0]}
                    max={initialRanges['area'][1]}
                    step={5}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-e"
                  />
                </label>
              )}
              {vAluguel && (
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
                    onChange={(e, v) => setVAluguel(v)}
                    min={initialRanges['aluguel'][0]}
                    max={initialRanges['aluguel'][1]}
                    step={50}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-e"
                  />
                </label>
              )}
            </Sliders>
          )}
        </FilterInputs>
      </Card>
    </Aside>
  )
}
