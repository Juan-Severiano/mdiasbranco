import { Chip, Stack, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import { updateCallPartial } from "../../services/requests/call";
import { useCustomContext } from "../../contexts/context";
import { Heading } from "../custom/heading";
import { CalendarCheck, CalendarDots } from "@phosphor-icons/react";
import CustomOutlinedInput from "../../styles/theme/custom-outlined-input";
import dayjs from "dayjs";
import "dayjs/locale/pt-br"
dayjs.locale("pt-br")

interface ProblemDetailProps {
  title: string
  icon?: ReactNode
  state: string
  handleChange?: () => void
}

export function ResolutionDate({ title, ...rest }: ProblemDetailProps) {
  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState(rest['state'] ?? 'Selecione uma data')
  const { state, dispatch } = useCustomContext()

  const { modalDetails: { problem } } = state

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({ payload: true, type: 'CHANGE-LOADING' })
    if (typeof e.target.value === 'string') {
      setValue(e.target.value)
    }
    dispatch({ payload: false, type: 'CHANGE-LOADING' })
  }

  async function handleSave() {
    await updateCallPartial({ 'resolve_at': value }, problem?.id!)
    setEdit(false)
  }

  return (
    <Stack spacing={1}>
      <Heading text={title} variant="h6" icon={<CalendarCheck fontSize={20} style={{ marginRight: 20 }} />} />
      {
        edit ? (
          <CustomOutlinedInput
            fullWidth
            type='date'
            value={value !== 'Selecione uma data' ? dayjs(value).format('YYYY-MM-DD') : ''}
            startAdornment={<CalendarDots fontSize={24} style={{ marginRight: 10 }} />}
            onChange={handleChange}
            onBlur={handleSave}
            sx={{ maxHeight: 40 }}
          />
        ) : (
          <Chip onClick={() => setEdit(true)} sx={{ height: 40, fontSize: 14 }} label={
            <Stack flexDirection='row' alignItems='center'>
              <Typography variant="body2" fontWeight={500}>{value !== 'Selecione uma data' ? dayjs(value).format('DD [de] MMMM [de] YYYY') : value}</Typography>
            </Stack>
          } />
        )
      }
    </Stack>
  )
}
