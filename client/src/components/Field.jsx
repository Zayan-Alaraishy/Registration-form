import { FormControl, FormErrorMessage } from "@chakra-ui/react";

export default function Field({ children, error }) {
  return (
    <FormControl isInvalid={Boolean(error)} className="mb-4">
      {children}
      {error && (
        <FormErrorMessage className="text-danger">{error}</FormErrorMessage>
      )}
    </FormControl>
  );
}
