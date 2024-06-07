import { Avatar, Grid, Paper } from "@mui/material";

export function Comment() {
  return (
    <Paper style={{ padding: "20px 20px" }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Paper style={{ padding: "20px 20px" }}>
          <Grid item container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: "left" }}>Isaac Alves</h4>
              <p style={{ textAlign: "left" }}>
                Como poderiamos fazer isso?
              </p>
              <p style={{ textAlign: "left", color: "gray" }}>
                posted 1 minute ago
              </p>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Paper>
  )
}