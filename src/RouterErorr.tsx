import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RouterErorr = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);
  return <div>Erorr...</div>;
};

export default RouterErorr;
