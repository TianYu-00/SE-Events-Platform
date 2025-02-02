import { toast } from "react-toastify";

function useErrorChecker() {
  const checkError = (error) => {
    if (error?.response?.data?.code) {
      toast.error(error?.response?.data?.msg || "Error in error checker");
    } else {
      toast.error(error.message);
    }
  };

  return checkError;
}

export default useErrorChecker;
