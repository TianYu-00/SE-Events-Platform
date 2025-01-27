import { toast } from "react-toastify";

function useErrorChecker() {
  const checkError = (error) => {
    // console.log(error?.response?.data?.code);
    if (error?.response?.data?.code) {
      toast.error(error?.response?.data?.msg || "Error in error checker");
    } else {
      toast.error(error.message);
    }
  };

  return checkError;
}

export default useErrorChecker;
