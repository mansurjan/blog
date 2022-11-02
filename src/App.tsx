import { auth } from "./config/firebase-config";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Routes, Route } from "react-router-dom";
import { saveUser } from "./redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import Navbar from "./config/components/Navbar";
import PostPage from "./pages/post/PostPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import EditPost from "./pages/EditPost";
import Home from "./pages/Home";
import WritePost from "./pages/WritePost";
import ProtectedRoute from "./pages/Protected";
import ProtectedView from "./pages/ProtectedView";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  console.log("user from state", user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          saveUser({
            refreshToken: user?.refreshToken,
            isLogged: true,
          })
        );
      } else {
        console.log("saveUser failed");
        dispatch(
          saveUser({
            refreshToken: null,
            isLogged: false,
          })
        );
      }
    });
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/posts/:postId" element={<PostPage />} />
            <Route path="/posts/:postId/edit" element={<EditPost />} />
            <Route path="/write" element={<WritePost />} />
            <Route path="/protected-view" element={<ProtectedView />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
