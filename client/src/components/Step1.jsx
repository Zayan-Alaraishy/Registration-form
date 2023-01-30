import { Select } from "@chakra-ui/react";

import Field from "./Field";

export default function Step1({ register, setAccountType }) {
  return (
    <Field label="  Select your account type">
      <Select
        {...register("accountType")}
        borderColor="green.100"
        focusBorderColor="green.100"
        onChange={(e) => setAccountType(e.target.value)}
      >
        <option value="individual">Individual</option>
        <option value="business">Business</option>
      </Select>
    </Field>
  );
}
