import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";

export default function Field({ label, children, error }) {
  return (
    <FormControl isInvalid={Boolean(error)}>
      <FormLabel>{label}</FormLabel>
      {children}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}
