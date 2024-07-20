import { Button, Chip, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { Heading } from "../custom/heading";
import { PrecisionManufacturing } from "@mui/icons-material";
import { updateCallPartial } from "../../services/requests/call";
import { useState } from "react";
import { useCustomContext } from "../../contexts/context";
import { Solution } from "../../constants/sector-options";
import { SelectPure } from "../custom/custom-input";
import { SelectStartup } from "./select-startup";
import CustomOutlinedInput from "../../styles/theme/custom-outlined-input";

interface SolutionDetailsProps {
  solution: string
}

export function SolutionDetails({ solution }: SolutionDetailsProps) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(solution ?? 'Selecione a solução');
  const { state, dispatch } = useCustomContext();
  
  const { modalDetails: { problem } } = state;
  
  const [message, setMessage] = useState(problem?.description_solution ?? '')

  const handleChange = async (e: SelectChangeEvent<unknown>) => {
    dispatch({ payload: true, type: 'CHANGE-LOADING' })
    const selectedValue = e.target.value as Solution;
    if (Object.values(Solution).includes(selectedValue)) {
      setValue(selectedValue);
      await updateCallPartial({ 'solution': selectedValue }, problem?.id!);
    }
    dispatch({ payload: false, type: 'CHANGE-LOADING' })
  };

  async function handleSaveSolution() {
    dispatch({ payload: true, type: 'CHANGE-LOADING' })
    await updateCallPartial({ 'description_solution': message }, problem?.id!);
    dispatch({ payload: false, type: 'CHANGE-LOADING' })
  }

  return (
    <Stack spacing={1}>
      <Heading text="Solução" variant="h6" icon={<PrecisionManufacturing sx={{ mr: 2 }} />} />
      {
        edit ? (
          <SelectPure label="Status" onBlur={() => setEdit(false)} onChange={handleChange} options={Solution} value={value} />
        ) : (
          <Chip onClick={() => setEdit(true)} sx={{ height: 40, fontSize: 14 }} label={
            <Stack flexDirection='row' alignItems='center'>
              <Typography variant="body2" fontWeight={500}>{value}</Typography>
            </Stack>
          } />
        )
      }
      {
        value === 'Startup' ? (
          <SelectStartup atualStartup={problem?.responsible_startup?.name!} />
        ) : null
      }
      <Typography variant="body2" fontWeight={500}>Descreva sua solução</Typography>
      <CustomOutlinedInput
        sx={{ height: 40, fontSize: 12 }}
        fullWidth
        placeholder="Descreva sua solução aqui ..."
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <Button disabled={state.loading.loading} variant="contained" onClick={handleSaveSolution}>
        {state.loading.loading ? 'Salvando ...' : 'Salvar solução'}
      </Button>
    </Stack>
  )
}
