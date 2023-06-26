import React from "react";
import getCurrentUser from "../actions/getCurrentUser";

export default async function page() {
  const currentUser = await getCurrentUser();
  return <div className="text-9xl text-white">Welcome {currentUser?.name}</div>;
}
