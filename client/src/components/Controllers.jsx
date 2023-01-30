import { Button, Flex, Spacer } from "@chakra-ui/react";

export default function Controllers({
  activeStep,
  prevStep,
  accountType,
  trigger,
  nextStep,
}) {
  const next = async () => {
    let isValid = false;

    switch (activeStep) {
      case 0:
        isValid = true;
        break;
      case 1:
        if (accountType === "individual")
          isValid = await trigger([
            "firstName",
            "lastName",
            "gender",
            "birthdate",
            "phone",
            "address",
          ]);
        else
          isValid = await trigger([
            "businessName",
            "businessPhone",
            "businessAddress",
          ]);
        break;
      case 2:
        isValid = await trigger(["email", "password", "confirmPassword"]);
        break;
      default:
        break;
    }
    if (isValid) nextStep();
  };
  return (
    <Flex
      my={2}
      justifyContent="space-between"
      alignItems="center"
      minWidth="max-content"
    >
      {activeStep !== 0 && (
        <Button onClick={prevStep} disabled={false} backgroundColor="gray.300">
          Back
        </Button>
      )}
      <Spacer />

      {activeStep !== 3 && (
        <Button onClick={next} backgroundColor="gray.300">
          Next
        </Button>
      )}
      {activeStep === 3 && (
        <Button type="submit" onClick={next} backgroundColor="gray.300">
          Register
        </Button>
      )}
    </Flex>
  );
}
