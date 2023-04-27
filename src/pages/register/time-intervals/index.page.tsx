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
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { getWeekDays } from '@/utils/get-week-days'

const timeIntervalsFormSchema = z.object({})

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  }) // ele basicamente ele permite lítera um campo do formulário que e um array

  const weekDays = getWeekDays()

  async function handleSetTimeIntervals() {}

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>

        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />

        <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
          <IntervalContainer>
            {fields.map((field, index) => {
              return (
                <IntervalItem key={field.id}>
                  <IntervalDay>
                    <Checkbox />
                    <Text>{weekDays[field.weekDay]}</Text>
                  </IntervalDay>

                  <IntervalInput>
                    <TextInput
                      size="sm"
                      type="time"
                      step={60}
                      {...register(`intervals.${index}.startTime`)}
                    />
                    <TextInput
                      size="sm"
                      type="time"
                      step={60}
                      {...register(`intervals.${index}.endTime`)}
                    />
                  </IntervalInput>
                </IntervalItem>
              )
            })}
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
