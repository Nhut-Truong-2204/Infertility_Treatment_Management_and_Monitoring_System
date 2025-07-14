import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserOnLoad } from "./redux/slices/authSlice";
import router from "./router/router";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOnLoad());
  }, [dispatch]);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} fallbackElement={<>Loading</>} />
    </GoogleOAuthProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
