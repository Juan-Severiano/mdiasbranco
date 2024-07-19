import { Avatar, Chip, MenuItem, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { updateCallPartial } from "../../services/requests/call";
import { useEffect, useState } from "react";
import { useCustomContext } from "../../contexts/context";
import { Startup } from "../../types/problem";
import { getStartups } from "../../services/requests/startup";
import CustomSelect from "../../styles/theme/custom-select";
import { baseURL } from "../../config";

export function SelectStartup({ atualStartup }: { atualStartup: string }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(atualStartup ?? 'Selecione a Startup');
  const { state, dispatch } = useCustomContext();
  const [startups, setStartups] = useState<Startup[]>([]);

  const { modalDetails: { problem } } = state;

  async function get() {
    try {
      const res = await getStartups()
      setStartups(res)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    get()
  }, [])

  const handleChange = async (e: SelectChangeEvent<unknown>) => {
    dispatch({ payload: true, type: 'CHANGE-LOADING' })
    const selectedValue = e.target.value as string
    setValue(selectedValue);
    await updateCallPartial({ 'responsible_startup': selectedValue }, problem?.id!);
    dispatch({ payload: false, type: 'CHANGE-LOADING' })
  };

  return (
    <Stack>
      <Typography variant="h6">Startups</Typography>
      {
        edit ? (
          <CustomSelect
            label="Status"
            sx={{ maxHeight: 30 }}
            onBlur={() => setEdit(false)}
            onChange={handleChange}
            aria-label="Startups"
            value={value}
          >
            {startups?.map((startup) => (
              <MenuItem key={startup.id} value={startup.name}>
                <Stack alignItems='center' flexDirection='row' width='100%'>
                  <Avatar sx={{ width: 25, height: 25, mr: 2 }} src={`${baseURL}/startup/attachment/${startup.attachments?.path}`} alt={`${startup.name}`} />
                  <Typography fontSize={15}>{startup.name}</Typography>
                </Stack>
              </MenuItem>
            ))}
          </CustomSelect>
        ) : (
          <Chip onClick={() => setEdit(true)} sx={{ height: 40, fontSize: 14 }} label={
            <Stack flexDirection='row' alignItems='center'>
              <Typography variant="body2" fontWeight={500}>{value}</Typography>
            </Stack>
          } />
        )
      }
    </Stack>
  )
}
