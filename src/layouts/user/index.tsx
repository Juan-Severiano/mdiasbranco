import { Box, Container } from "@mui/material"
import { Outlet, useNavigate } from "react-router-dom"
import TopNav from "./top-nav"
import StepForm from "../../components/form/modal-step"
import ModalProblem from "../../components/modal"
import { localClient } from "../../lib/local/client"
import { useEffect } from "react"

const DefaultLayout = () => {
  const { data: user } = localClient.getUser()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(user)
    if (!user) {
      navigate('/auth/login')
    }
  }, [user])

  useEffect(() => {
    if (user?.role === 'manager') {
      navigate('/manager/home')
    } else if (user?.role === 'base') {
      navigate('/')
    }
  }, [])

  return (
    <Box bgcolor='#f7f7fd'>
      <Box>
        <Container maxWidth='lg'>
          <TopNav />
        </Container>
      </Box>
      <Box sx={{ pb: 10, pt: 2, minHeight: '100vh' }}>
        <Container maxWidth='lg'>
          <Outlet />
          <StepForm />
          <ModalProblem />
        </Container>
      </Box>
    </Box>
  )
}

export default DefaultLayout