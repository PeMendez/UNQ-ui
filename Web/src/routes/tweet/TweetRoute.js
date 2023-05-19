import { useEffect, useState } from "react"
import Api from "../../api/Api"
import { useParams } from 'react-router-dom';
import TweetComponent from "../../components/tweet/TweetComponent";

const TweetRoute = () => {
  const {tweetId} = useParams();
  const [result, setResult] = useState({type:{},user:{},id:{}});
  useEffect(() => {
        Api.getTweet(tweetId)
        .then((data) => setResult(data.data))
  })
  return (    
    <TweetComponent tweet={result}/>
  )
}
export default TweetRoute;