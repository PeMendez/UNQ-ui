import { useEffect, useState } from "react"
import Api from "../../api/Api"
import User from "../../components/user/UserComponent"

const LoggedUserRoute = () => {
  const [result, setResult] = useState([])

  useEffect(() => {
    Api.getLoggedUser()
      .then((data) => setResult(data))
  }, [])
  
  return (
    User(result)
  )
}

export default LoggedUserRoute