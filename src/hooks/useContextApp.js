import { useContext } from "react";
import { Context } from "../context";

const useContextApp = () => {
  const context = useContext(Context);
  if (!context) throw new Error("Context topilmadi");
  return context;
};

export default useContextApp;
