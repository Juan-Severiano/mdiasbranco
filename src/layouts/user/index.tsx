import { Box, Container } from "@mui/material"
import { Outlet, useNavigate } from "react-router-dom"
import TopNav from "./top-nav"
import StepForm from "../../components/form/modal-step"
import ModalProblem from "../../components/modal"
import { localClient } from "../../lib/local/client"
import { useEffect } from "react"
import { getUserById } from "../../services/requests/auth"

const DefaultLayout = () => {
  const { data: user } = localClient.getUser()
  const navigate = useNavigate()

  console.log(user)
  if (!user) {
    navigate('/auth/login')
  }

  async function getUser() {
    if (user) {
      const newUser = await getUserById(String(user?.id!))
      if (newUser) {
        localClient.addUser(newUser)
      }
    }
  }

  useEffect(() => {
    getUser()
    if (user?.role === 'manager') {
      navigate('/manager/home')
    } else if (user?.role === 'base') {
      return
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