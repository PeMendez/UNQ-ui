import { useEffect, useState } from "react"
import Api from "../../api/Api"
import { useParams } from 'react-router-dom';
import TweetComponent from "../../components/tweet/TweetComponent";

const TweetRoute = () => {
  const {tweetId} = useParams();
  const [result, setResult] = useState({type:{},user:{},id:{}, likes:{}});
  useEffect(() => {
        Api.getTweet(tweetId)
        .then((data) => {
        setResult(data.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [tweetId]);
  return (    
    <TweetComponent tweet={result}/>
  )
}
export default TweetRoute;