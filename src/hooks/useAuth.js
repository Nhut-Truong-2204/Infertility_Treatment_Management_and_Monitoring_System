import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";

export const useAuth = () => {
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return {
    user,
    loading,
    error,
    logout,
    isAuthenticated: !!user, // Trả về true nếu có user
  };
};

export default useAuth;
