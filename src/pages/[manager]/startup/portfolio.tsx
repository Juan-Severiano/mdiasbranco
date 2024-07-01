import { useParams } from "react-router-dom"

export default function ManagerStartupPortfolio() {
  const { id } = useParams()
  return (
    <h1>{id}</h1>
  )
}
