import { useAuthContext } from "../context/AuthContext";
import { UnAuthNav, AuthNav } from "../components";

const Navbar = () => {
  const { authUser } = useAuthContext();
  return <>{!authUser ? <UnAuthNav /> : <AuthNav />}</>;
};

export default Navbar;
