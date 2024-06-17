import { CloudDone, CloudSync } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useCustomContext } from "../../contexts/context";

export function Sync() {
  const { state } = useCustomContext()

  return (
    <Tooltip title={!state.loading.loading ? 'Sincronizado' : 'Sincronizando ...'}>
      {
        !state.loading.loading ? <CloudDone color="primary" fontSize="medium" /> : <CloudSync color="primary" fontSize="medium" />
      }
    </Tooltip>
  )
}
