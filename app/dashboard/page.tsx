"use client";

import { AuthContext } from "@/auth/AuthContext";
import { useContext } from "react";

function Dashboard() {
  const { user } = useContext(AuthContext);
  return <>{JSON.stringify(user)}</>;
}

export default Dashboard;
