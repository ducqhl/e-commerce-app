// A custom hook that builds on useLocation to parse

import { useMemo } from "react";
import { useLocation } from "react-router-dom";

// the query string for you.
const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};

export default useQuery;
