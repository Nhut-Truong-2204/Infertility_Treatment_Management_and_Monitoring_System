import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

const useOAuth2Callback = (onSuccess, onError) => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      fetch(`https://infertility-treatment-management-and.onrender.com/api/oauth2/callback?code=${code}`)
        .then((res) => res.text())
        .then((accessToken) => {
          setCookie("accessToken", accessToken, 7);
          window.history.replaceState({}, document.title, window.location.pathname);
          if (onSuccess) onSuccess(accessToken);
          navigate("/");
        })
        .catch(() => {
          if (onError) onError();
          navigate("/login");
        });
    }
  }, [navigate, onSuccess, onError]);
};

export default useOAuth2Callback;