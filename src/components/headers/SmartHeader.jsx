import React from "react";
import { useSelector } from "react-redux";
import GuestHeader from "./GuestHeader";
import CustomerHeader from "./CustomerHeader";

const SmartHeader = ({
  onLoginClick,
  onRegisterClick,
  hasBackground = false,
}) => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = !!user;

  if (isAuthenticated) {
    return <CustomerHeader />;
  }
  return (
    <GuestHeader
      onLoginClick={onLoginClick}
      onRegisterClick={onRegisterClick}
      hasBackground={hasBackground}
    />
  );
};

export default SmartHeader;
