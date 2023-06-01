import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../api/Api";
import UserById from "../../components/user/UserById";

const UserRoute = () => {
  const { userId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Api.getUser(userId)
      .then((data) => {
        setResult(data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <UserById user={result}/>
  );
}

export default UserRoute;
