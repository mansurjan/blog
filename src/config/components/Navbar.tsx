import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import { userLogOut } from "../../redux/auth/authSlice";

const Navbar: React.FC = () => {
  const isLogged: boolean = useAppSelector((state) => state.auth.isLogged);
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="flex justify-between items-center h-20 px-12 shadow-md">
        <div>
          <h1 className="text-2xl font-bold m-0">
            <Link to="/">Blog</Link>
          </h1>
        </div>
        <div>
          <ul className="flex gap-x-6 p-0 m-0">
            <Link className="text-xl" to="/">
              Home
            </Link>
            <Link className="text-xl" to="protected-view">
              ProtectedView
            </Link>
            {!isLogged && (
              <Link className="text-xl" to="login">
                Log in
              </Link>
            )}
            {isLogged && (
              <Link className="text-xl" to="write">
                Write
              </Link>
            )}
            {isLogged && (
              <Link
                to="login"
                className="text-xl"
                onClick={() => {
                  signOut(auth)
                    .then(() => {
                      dispatch(userLogOut());
                      console.log("user signed out");
                    })
                    .catch((error) => {
                      console.log("error", error);
                    });
                }}>
                Log out
              </Link>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
