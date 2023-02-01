import Field from "./Field";

export default function Step3({
  register,
  errors,
  required,
  formData,
  typingInputStyle,
  placeholderStyle,
}) {
  const validateConfirmPassword = (value) => {
    if (value !== formData.password) {
      return "Confirm password does not match password";
    }
  };
  return (
    <div className="my-8">
      <Field error={errors?.email?.message}>
        <input
          type="email"
          {...register("email", {
            required,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          placeholder={"Email"}
          className={typingInputStyle("email")}
        />
        <span className={placeholderStyle}>Email</span>
      </Field>
      <Field error={errors?.password?.message}>
        <input
          type="password"
          {...register("password", {
            required,
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
              message:
                "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 number, and 1 special character",
            },
          })}
          placeholder={"Password"}
          className={typingInputStyle("password")}
        />
        <span className={placeholderStyle}>Password</span>
      </Field>
      <Field error={errors?.confirmPassword?.message}>
        <input
          type="password"
          {...register("confirmPassword", {
            required,
            validate: validateConfirmPassword,
          })}
          placeholder={"Confirm Password"}
          className={typingInputStyle("confirmPassword")}
        />
        <span className={placeholderStyle}>Confirm Password</span>
      </Field>
    </div>
  );
}
