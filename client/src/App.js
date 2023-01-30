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
  colors: {
    gray: {
      100: "#fafafa",
      200: "#f7f7f7",
    },
    green: {
      100: "#38a169",
    },
  },
});

const required = { value: true, message: "This field is required" };

function App() {
  const { activeStep, nextStep, prevStep } = useSteps({ initialStep: 0 });
  const [accountType, setAccountType] = useState("individual");
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

  const submitForm = (data) => {
    const { confirmPassword, accountType, ...updatedObj } = data;
    // alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    reset();
    axios
      .post("/api/v1/signup", { accountType, data: updatedObj })
      .then((res) => console.log(res.data))
      .catch((error) => console.error(error));
  };
  return (
    <ChakraProvider theme={theme}>
      <Box p={"4em"} maxWidth={"80em"}>
        <form onSubmit={handleSubmit(submitForm)}>
          <Steps activeStep={activeStep}>
            <Step label="Account Type">
              <Step1
                errors={errors}
                register={register}
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
              />
            </Step>
            <Step label="Account Info">
              <Step3
                register={register}
                errors={errors}
                required={required}
                formData={formData}
                watch={watch}
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
      </Box>
    </ChakraProvider>
  );
}

export default App;
