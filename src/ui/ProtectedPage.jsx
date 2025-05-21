import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useGetUser } from "../hooks/useGetUser";

function ProtectedPage({ children }) {
  const navigate = useNavigate();
  const { user, isPending } = useGetUser();

  useEffect(() => {
    if (user?.role !== "authenticated" && !isPending) {
      navigate("/login");
    }
  }, [user, isPending]);

  if (isPending) {
    return <Spinner />;
  }

  return <>{children}</>;
}

export default ProtectedPage;
