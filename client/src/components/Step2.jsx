import Field from "./Field";

export default function Step2({
  accountType,
  register,
  errors,
  watch,
  required,
  typingInputStyle,
  placeholderStyle,
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
        <div className="my-8">
          <Field error={errors?.firstName?.message}>
            <input
              {...register("firstName", {
                required,
              })}
              placeholder={"First name"}
              className={typingInputStyle("firstName")}
            />
            <span className={placeholderStyle}>First name</span>
          </Field>
          <Field error={errors?.lastName?.message}>
            <input
              {...register("lastName", {
                required,
              })}
              placeholder={"Last name"}
              className={typingInputStyle("lastName")}
            />
            <span className={placeholderStyle}>Last name</span>
          </Field>
          <Field error={errors?.gender?.message}>
            <select
              {...register("gender", { required })}
              className={`border-2 border-grey-light w-full py-2.5 px-1 rounded  border-opacity-50 outline-green ${
                errors.gender
                  ? "border-danger focus:border-danger"
                  : watch("gender")
                  ? "border-green focus:border-green"
                  : "border-grey-light focus:border-grey-light"
              }`}
            >
              <option value="" hidden>
                Select your gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </Field>
          <Field error={errors?.birthdate?.message}>
            <input
              type="date"
              {...register("birthdate", {
                required,
                validate: validateBirthdate,
              })}
              placeholder={"Birthdate"}
              className={typingInputStyle("birthdate")}
            />
            <span className={placeholderStyle}>Birthdate</span>
          </Field>
          <Field error={errors?.phone?.message}>
            <input
              type="tel"
              {...register("phone", { required })}
              placeholder={"Phone number"}
              className={typingInputStyle("phone")}
            />
            <span className={placeholderStyle}>Phone number</span>
          </Field>
          <Field error={errors?.address?.message}>
            <input
              {...register("address", { required })}
              placeholder={"Address"}
              className={typingInputStyle("address")}
            />
            <span className={placeholderStyle}>Address</span>
          </Field>
        </div>
      ) : (
        <div className="my-8">
          <Field error={errors?.businessName?.message}>
            <input
              {...register("businessName", { required })}
              placeholder={"Business Name"}
              className={typingInputStyle("businessName")}
            />
            <span className={placeholderStyle}>Business Name</span>
          </Field>
          <Field error={errors?.businessPhone?.message}>
            <input
              type="tel"
              {...register("businessPhone", { required })}
              placeholder={"Business Phone Number"}
              className={typingInputStyle("businessPhone")}
            />
            <span className={placeholderStyle}>Business Phone Number</span>
          </Field>
          <Field error={errors?.businessAddress?.message}>
            <input
              {...register("businessAddress", { required })}
              placeholder={"Location"}
              className={typingInputStyle("businessAddress")}
            />
            <span className={placeholderStyle}>Location</span>
          </Field>
        </div>
      )}
    </>
  );
}
