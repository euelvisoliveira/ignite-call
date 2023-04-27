import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { Header, Container } from '../styles'
import {
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInput,
  IntervalItem,
} from './style'
import { ArrowArcRight } from 'phosphor-react'

export default function TimeIntervals() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>

        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />

        <IntervalBox as="form">
          <IntervalContainer>
            <IntervalItem>
              <IntervalDay>
                <Checkbox />
                <Text>Segunda-feira</Text>
              </IntervalDay>

              <IntervalInput>
                <TextInput size="sm" type="time" step={60} />
                <TextInput size="sm" type="time" step={60} />
              </IntervalInput>
            </IntervalItem>

            <IntervalItem>
              <IntervalDay>
                <Checkbox />
                <Text>Terça-feira</Text>
              </IntervalDay>

              <IntervalInput>
                <TextInput size="sm" type="time" step={60} />
                <TextInput size="sm" type="time" step={60} />
              </IntervalInput>
            </IntervalItem>
          </IntervalContainer>

          <Button type="submit">
            Proximo passo
            <ArrowArcRight />
          </Button>
        </IntervalBox>
      </Header>
    </Container>
  )
}
