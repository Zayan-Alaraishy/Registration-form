import { Input, Select } from "@chakra-ui/react";

import Field from "./Field";

export default function Step2({
  accountType,
  register,
  errors,
  watch,
  required,
}) {
  const validateBirthdate = (value) => {
    const age = calculateAge(value);
    if (age < 18) {
      return "You must be at least 18 years old";
    }
  };

  function calculateAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <>
      {accountType === "individual" ? (
        <>
          <Field label="First name" error={errors?.firstName?.message}>
            <Input
              {...register("firstName", {
                required,
              })}
              errorBorderColor="red.300"
              focusBorderColor={
                errors.firstName
                  ? "red.300"
                  : watch("firstName")
                  ? "green.100"
                  : "gray.300"
              }
              borderColor={
                errors.firstName
                  ? "red.300"
                  : watch("firstName")
                  ? "green.100"
                  : "gray.300"
              }
            />
          </Field>
          <Field label="Last name" error={errors?.lastName?.message}>
            <Input
              {...register("lastName", {
                required,
              })}
              errorBorderColor="red.300"
              focusBorderColor={
                errors.lastName
                  ? "red.300"
                  : watch("lastName")
                  ? "green.100"
                  : "gray.300"
              }
              borderColor={
                errors.lastName
                  ? "red.300"
                  : watch("lastName")
                  ? "green.100"
                  : "gray.300"
              }
            />
          </Field>
          <Field label="Gender" error={errors?.gender?.message}>
            <Select
              {...register("gender")}
              borderColor="green.100"
              focusBorderColor="green.100"
            >
              <option value="Male" selected>
                Male
              </option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
          </Field>
          <Field label="Birthdate" error={errors?.birthdate?.message}>
            <Input
              type="date"
              {...register("birthdate", {
                required,
                validate: validateBirthdate,
              })}
              errorBorderColor="red.300"
              focusBorderColor={
                errors.birthdate
                  ? "red.300"
                  : watch("birthdate")
                  ? "green.100"
                  : "gray.300"
              }
              borderColor={
                errors.birthdate
                  ? "red.300"
                  : watch("birthdate")
                  ? "green.100"
                  : "gray.300"
              }
            />
          </Field>
          <Field label="Phone number" error={errors?.phone?.message}>
            <Input
              type="tel"
              {...register("phone", { required })}
              errorBorderColor="red.300"
              focusBorderColor={
                errors.phone
                  ? "red.300"
                  : watch("phone")
                  ? "green.100"
                  : "gray.300"
              }
              borderColor={
                errors.phone
                  ? "red.300"
                  : watch("phone")
                  ? "green.100"
                  : "gray.300"
              }
            />
          </Field>
          <Field label="Address" error={errors?.address?.message}>
            <Input
              {...register("address", { required })}
              errorBorderColor="red.300"
              focusBorderColor={
                errors.address
                  ? "red.300"
                  : watch("address")
                  ? "green.100"
                  : "gray.300"
              }
              borderColor={
                errors.address
                  ? "red.300"
                  : watch("address")
                  ? "green.100"
                  : "gray.300"
              }
            />
          </Field>
        </>
      ) : (
        <>
          <Field label="Business Name" error={errors?.businessName?.message}>
            <Input
              {...register("businessName", { required })}
              errorBorderColor="red.300"
              focusBorderColor={
                errors.businessName
                  ? "red.300"
                  : watch("businessName")
                  ? "green.100"
                  : "gray.300"
              }
              borderColor={
                errors.businessName
                  ? "red.300"
                  : watch("businessName")
                  ? "green.100"
                  : "gray.300"
              }
            />
          </Field>
          <Field
            label="Business Phone Number"
            error={errors?.businessPhone?.message}
          >
            <Input
              {...register("businessPhone", { required })}
              errorBorderColor="red.300"
              focusBorderColor={
                errors.businessPhone
                  ? "red.300"
                  : watch("businessPhone")
                  ? "green.100"
                  : "gray.300"
              }
              borderColor={
                errors.businessPhone
                  ? "red.300"
                  : watch("businessPhone")
                  ? "green.100"
                  : "gray.300"
              }
            />
          </Field>
          <Field label="Location" error={errors?.businessAddress?.message}>
            <Input
              {...register("businessAddress", { required })}
              errorBorderColor="red.300"
              focusBorderColor={
                errors.businessAddress
                  ? "red.300"
                  : watch("businessAddress")
                  ? "green.100"
                  : "gray.300"
              }
              borderColor={
                errors.businessAddress
                  ? "red.300"
                  : watch("businessAddress")
                  ? "green.100"
                  : "gray.300"
              }
            />
          </Field>
        </>
      )}
    </>
  );
}
