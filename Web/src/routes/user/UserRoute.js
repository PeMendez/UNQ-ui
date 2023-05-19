import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../api/Api";
import UserById from "../../components/user/UserById";

const UserRoute = () => {
  const { userId } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    Api.getUser(userId)
      .then((data) => setResult(data.data))
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  return (
    <UserById user={result}/>
  );
}

export default UserRoute;
