import { Chip, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import { SelectPure } from "../custom/custom-input";
import { Status, status } from "../../constants/status";
import { updateCallPartial } from "../../services/requests/call";
import { useCustomContext } from "../../contexts/context";
import { Circle } from "@mui/icons-material";

interface ProblemDetailProps {
  title: string
  icon?: ReactNode
  state: string
  handleChange?: () => void
}

export function ProblemDetail({ title, ...rest }: ProblemDetailProps) {
  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState(rest['state'])
  const { state } = useCustomContext()

  const { modalDetails: { problem } } = state

  const handleChange = async (e: SelectChangeEvent<unknown>) => {
    if (typeof e.target.value === 'string') {
      setValue(e.target.value)
      await updateCallPartial({ 'status': e.target.value }, problem?.id!)
    }
  }

  return (
    <Stack>
      <Typography variant="h6" sx={{ mb: .5 }}>{title}</Typography>
      {
        edit ? (
          <SelectPure onBlur={() => setEdit(false)} label="Status" onChange={handleChange} options={Status} value={value} />
        ) : (
          <Chip onClick={() => setEdit(true)} label={
            <Stack flexDirection='row' alignItems='center'>
              <Circle color={status[value]} fontSize='small' sx={{ mr: .5 }} /> {value}
            </Stack>
          } />
        )
      }
    </Stack>
  )
}
