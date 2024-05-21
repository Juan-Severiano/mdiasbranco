import { styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  textAlign: 'end',
  '&:hover': {
    textDecoration: 'underline',
  },
}));
