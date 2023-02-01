import { ChakraProvider, extendTheme, Box } from "@chakra-ui/react";
import { Steps, Step, useSteps, StepsTheme } from "chakra-ui-steps";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import Controllers from "./components/Controllers";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

const theme = extendTheme({
  components: {
    Steps: StepsTheme,
  },
});

const required = { value: true, message: "This field is required" };

function App() {
  const { activeStep, nextStep, prevStep } = useSteps({ initialStep: 0 });
  const [accountType, setAccountType] = useState("");
  const [formData, setFormData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    reset,
  } = useForm({ mode: "onChange", reValidateMode: "onChange" });

  useEffect(() => {
    setFormData(watch());
  }, [watch()]);

  const submitForm = async (data) => {
    const { confirmPassword, accountType, ...updatedObj } = data;
    axios
      .post("/api/v1/signup", { accountType, data: updatedObj })
      .then((res) => nextStep())
      .catch((error) => alert(error.response.data.message));
  };

  const typingInputStyle = (name) => {
    return `w-full border-2 py-2 px-4 rounded border-grey-light placeholder-grey-light placeholder-opacity-0 border-opacity-50 outline-none transition duration-200 ${
      errors[name]
        ? "border-danger focus:border-danger"
        : watch(name)
        ? "border-green focus:border-green"
        : "border-grey-light focus:border-grey-light"
    }`;
  };

  const placeholderStyle =
    "placeholder-text px-1 bg-white text-grey-light absolute left-0 top-2.5 mx-5 transition duration-200";
  return (
    <main className="flex min-h-screen relative">
      <div className="bg-[url('./assets/geometrica.png')] w-[15%]"></div>
      <ChakraProvider theme={theme}>
        <Box className="p-6 lg:w-[60%] sm:w-full">
          <h1 className="font-bold mb-8 text-[#004159] text-xl">
            Hello👋 Let's create your accounts
          </h1>
          <form onSubmit={handleSubmit(submitForm)} autoComplete="off">
            <Steps activeStep={activeStep}>
              <Step label="Account Type">
                <Step1
                  errors={errors}
                  register={register}
                  required={required}
                  watch={watch}
                  setAccountType={setAccountType}
                />
              </Step>
              <Step label="Basic Info">
                <Step2
                  register={register}
                  errors={errors}
                  required={required}
                  accountType={accountType}
                  watch={watch}
                  typingInputStyle={typingInputStyle}
                  placeholderStyle={placeholderStyle}
                />
              </Step>
              <Step label="Account Info">
                <Step3
                  register={register}
                  errors={errors}
                  required={required}
                  formData={formData}
                  typingInputStyle={typingInputStyle}
                  placeholderStyle={placeholderStyle}
                />
              </Step>
            </Steps>
            <Controllers
              activeStep={activeStep}
              prevStep={prevStep}
              accountType={accountType}
              nextStep={nextStep}
              trigger={trigger}
            />
          </form>
          {activeStep === 3 && <h1>Signed up successfully! Congrats 🎊</h1>}
        </Box>
      </ChakraProvider>
    </main>
  );
}

export default App;
