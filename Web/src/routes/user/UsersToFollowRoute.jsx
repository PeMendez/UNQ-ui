import { useEffect, useState } from "react"
import Api from "../../api/Api"
import User from "../../components/user/UsersToFollow"

const UsersToFollowRoute = () => {
  const [result, setResult] = useState([])

  useEffect(() => {
    Api.getUsersToFollow()
      .then((data) => setResult(data.data))
  }, [])
  
  return (
    User(result)
  )
}

export default UsersToFollowRoute