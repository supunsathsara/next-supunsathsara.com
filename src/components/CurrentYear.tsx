"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => new Date().getFullYear();
// Server snapshot stays empty so a statically-built page never freezes the year
const getServerSnapshot = () => null;

const CurrentYear = () => {
  const year = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <>{year ?? ""}</>;
};

export default CurrentYear;
