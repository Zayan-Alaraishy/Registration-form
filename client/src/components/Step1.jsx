import Field from "./Field";

export default function Step1({
  register,
  setAccountType,
  errors,
  required,
  watch,
}) {
  return (
    <div className="my-8">
      <Field error={errors?.accountType?.message}>
        <select
          {...register("accountType", { required })}
          onChange={(e) => {
            delete errors.accountType;
            setAccountType(e.target.value);
          }}
          className={`border-2 border-grey-light w-full py-2.5 px-1 rounded  border-opacity-50 outline-green ${
            errors.accountType
              ? "border-danger focus:border-danger"
              : watch("accountType")
              ? "border-green focus:border-green"
              : "border-grey-light focus:border-grey-light"
          }`}
        >
          <option value="" hidden>
            Select your account type
          </option>
          <option value="individual">Individual</option>
          <option value="business">Business</option>
        </select>
      </Field>
    </div>
  );
}
