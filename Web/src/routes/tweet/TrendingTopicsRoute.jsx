import { useEffect, useState } from "react"
import Api from "../../api/Api"
import Tweet from "../../components/tweet/TrendingTopics.jsx"

const TrendingTopicsRoute= () => {
  const [result, setResult] = useState([])

  useEffect(() => {
    Api.getTrendingTopics()
      .then((data) => setResult(data))
  }, [])
  
  return (
    Tweet(result)
  )
}

export default TrendingTopicsRoute