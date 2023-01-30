import { Input } from "@chakra-ui/react";

import Field from "./Field";

export default function Step3({ register, errors, required, watch, formData }) {
  const validateConfirmPassword = (value) => {
    if (value !== formData.password) {
      return "Confirm password does not match password";
    }
  };
  return (
    <div className="my-8">
      <Field label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          {...register("email", {
            required,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          errorBorderColor="red.300"
          focusBorderColor={
            errors.email ? "red.300" : watch("email") ? "green.100" : "gray.300"
          }
          borderColor={
            errors.email ? "red.300" : watch("email") ? "green.100" : "gray.300"
          }
        />
      </Field>
      <Field label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          {...register("password", {
            required,
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
              message:
                "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 number, and 1 special character",
            },
          })}
          errorBorderColor="red.300"
          focusBorderColor={
            errors.password
              ? "red.300"
              : watch("password")
              ? "green.100"
              : "gray.300"
          }
          borderColor={
            errors.password
              ? "red.300"
              : watch("password")
              ? "green.100"
              : "gray.300"
          }
        />
      </Field>
      <Field label="Confirm Password" error={errors?.confirmPassword?.message}>
        <Input
          type="password"
          errorBorderColor="red.300"
          focusBorderColor={
            errors.confirmPassword
              ? "red.300"
              : watch("confirmPassword")
              ? "green.100"
              : "gray.300"
          }
          borderColor={
            errors.confirmPassword
              ? "red.300"
              : watch("confirmPassword")
              ? "green.100"
              : "gray.300"
          }
          {...register("confirmPassword", {
            required,
            validate: validateConfirmPassword,
          })}
        />
      </Field>
    </div>
  );
}
