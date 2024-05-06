import { Box, Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import TopNav from "./top-nav"
import StepForm from "../../components/form/modal-step"
import ModalProblem from "../../components/modal"
// import { useAuth } from "../../contexts/auth-context"

const DefaultLayout = () => {
  // const { data: user } = localClient.getUser()
  // const navigate = useNavigate()

  // useEffect(() => {
  //   console.log(user)
  //   if (!user) {
  //     navigate('/auth/login')
  //   }
  // }, [user])

  // useEffect(() => {
  //   if (user?.role === 'gerente') {
  //     navigate('/manager/home')
  //   } else if (user?.role === 'tecnico') {
  //     navigate('/technical/home')
  //   }
  // }, [])

  return (
    <Box>
      <Box  sx={{ p: 2, bgcolor: '#0B2B70' }}>
        <Container maxWidth='xl'>
          <TopNav />
        </Container>
      </Box>
      <Box sx={{ pb: 10, pt: 2, backgroundColor: '#F3F5F8', minHeight: '100vh' }}>
        <Container>
          <Outlet />
          <StepForm />
          <ModalProblem />
        </Container>
      </Box>
    </Box>
  )
}

export default DefaultLayout