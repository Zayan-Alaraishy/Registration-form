import {
  ChakraProvider,
  extendTheme,
  Box,
  Select,
  Input,
  Flex,
  Button,
  Spacer,
} from '@chakra-ui/react';
import { Steps, Step, useSteps, StepsTheme } from 'chakra-ui-steps';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './components/Field';

const theme = extendTheme({
  components: {
    Steps: StepsTheme,
  },
  colors: {
    gray: {
      100: '#fafafa',
      200: '#f7f7f7',
    },
    green: {
      100: '#38a169',
    },
  },
});

const required = { value: true, message: 'This field is required' };

function App() {
  const { activeStep, nextStep, prevStep } = useSteps({ initialStep: 0 });
  const [accountType, setAccountType] = useState('individual');
  const [formData, setFormData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm({ mode: 'onChange', reValidateMode: 'onChange' });

  useEffect(() => {
    setFormData(watch());
  }, [watch]);

  const next = async () => {
    let isValid = false;

    switch (activeStep) {
      case 0:
        isValid = true;
        break;
      case 1:
        if (accountType === 'individual')
          isValid = await trigger([
            'firstName',
            'lastName',
            'gender',
            'birthdate',
            'phone',
            'address',
          ]);
        else
          isValid = await trigger([
            'businessName',
            'businessPhone',
            'businessAddress',
          ]);
        break;
      case 2:
        isValid = await trigger(['email', 'password', 'confirmPassword']);
        break;
      default:
        break;
    }
    if (isValid) nextStep();
  };

  const validateBirthdate = (value) => {
    const age = calculateAge(value);
    if (age < 18) {
      return 'You must be at least 18 years old';
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

  const validateConfirmPassword = (value) => {
    if (value !== formData.password) {
      return 'Confirm password does not match password';
    }
  };

  const submitForm = () => {
    alert('Welcome');
  };
  return (
    <ChakraProvider theme={theme}>
      <Box p={'4em'} maxWidth={'80em'}>
        <form onSubmit={handleSubmit(submitForm)}>
          <Steps activeStep={activeStep}>
            <Step label='Account Type'>
              <Field
                label='  Select your account type'
                error={errors?.accountType}
              >
                <Select
                  {...register('accountType')}
                  borderColor='green.100'
                  focusBorderColor='green.100'
                  onChange={(e) => setAccountType(e.target.value)}
                >
                  <option value='individual'>Individual</option>
                  <option value='business'>Business</option>
                </Select>
              </Field>
            </Step>
            <Step label='Basic Info'>
              {accountType === 'individual' ? (
                <>
                  <Field label='First name' error={errors?.firstName?.message}>
                    <Input
                      {...register('firstName', {
                        required,
                      })}
                      errorBorderColor='red.300'
                      focusBorderColor={
                        errors.firstName
                          ? 'red.300'
                          : watch('firstName')
                          ? 'green.100'
                          : 'gray.300'
                      }
                      borderColor={
                        errors.firstName
                          ? 'red.300'
                          : watch('firstName')
                          ? 'green.100'
                          : 'gray.300'
                      }
                    />
                  </Field>
                  <Field label='Last name' error={errors?.lastName?.message}>
                    <Input
                      {...register('lastName', {
                        required,
                      })}
                      errorBorderColor='red.300'
                      focusBorderColor={
                        errors.lastName
                          ? 'red.300'
                          : watch('lastName')
                          ? 'green.100'
                          : 'gray.300'
                      }
                      borderColor={
                        errors.lastName
                          ? 'red.300'
                          : watch('lastName')
                          ? 'green.100'
                          : 'gray.300'
                      }
                    />
                  </Field>
                  <Field label='Gender' error={errors?.gender?.message}>
                    <Select
                      {...register('gender')}
                      borderColor='green.100'
                      focusBorderColor='green.100'
                    >
                      <option value='male' selected>
                        Male
                      </option>
                      <option value='female'>Female</option>
                      <option value='other'>Other</option>
                    </Select>
                  </Field>
                  <Field label='Birthdate' error={errors?.birthdate?.message}>
                    <Input
                      type='date'
                      {...register('birthdate', {
                        required,
                        validate: validateBirthdate,
                      })}
                      errorBorderColor='red.300'
                      focusBorderColor={
                        errors.birthdate
                          ? 'red.300'
                          : watch('birthdate')
                          ? 'green.100'
                          : 'gray.300'
                      }
                      borderColor={
                        errors.birthdate
                          ? 'red.300'
                          : watch('birthdate')
                          ? 'green.100'
                          : 'gray.300'
                      }
                    />
                  </Field>
                  <Field label='Phone number' error={errors?.phone?.message}>
                    <Input
                      type='tel'
                      {...register('phone', { required })}
                      errorBorderColor='red.300'
                      focusBorderColor={
                        errors.phone
                          ? 'red.300'
                          : watch('phone')
                          ? 'green.100'
                          : 'gray.300'
                      }
                      borderColor={
                        errors.phone
                          ? 'red.300'
                          : watch('phone')
                          ? 'green.100'
                          : 'gray.300'
                      }
                    />
                  </Field>
                </>
              ) : (
                <>
                  <Field
                    label='Business Name'
                    error={errors?.businessName?.message}
                  >
                    <Input
                      {...register('businessName', { required })}
                      errorBorderColor='red.300'
                      focusBorderColor={
                        errors.businessName
                          ? 'red.300'
                          : watch('businessName')
                          ? 'green.100'
                          : 'gray.300'
                      }
                      borderColor={
                        errors.businessName
                          ? 'red.300'
                          : watch('businessName')
                          ? 'green.100'
                          : 'gray.300'
                      }
                    />
                  </Field>
                  <Field
                    label='Business Phone Number'
                    error={errors?.businessPhone?.message}
                  >
                    <Input
                      {...register('businessPhone', { required })}
                      errorBorderColor='red.300'
                      focusBorderColor={
                        errors.businessPhone
                          ? 'red.300'
                          : watch('businessPhone')
                          ? 'green.100'
                          : 'gray.300'
                      }
                      borderColor={
                        errors.businessPhone
                          ? 'red.300'
                          : watch('businessPhone')
                          ? 'green.100'
                          : 'gray.300'
                      }
                    />
                  </Field>
                  <Field
                    label='Location'
                    error={errors?.businessAddress?.message}
                  >
                    <Input
                      {...register('businessAddress', { required })}
                      errorBorderColor='red.300'
                      focusBorderColor={
                        errors.businessAddress
                          ? 'red.300'
                          : watch('businessAddress')
                          ? 'green.100'
                          : 'gray.300'
                      }
                      borderColor={
                        errors.businessAddress
                          ? 'red.300'
                          : watch('businessAddress')
                          ? 'green.100'
                          : 'gray.300'
                      }
                    />
                  </Field>
                </>
              )}
            </Step>
            <Step label='Account Info'>
              <Field label='Email' error={errors?.email?.message}>
                <Input
                  type='email'
                  {...register('email', {
                    required,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  errorBorderColor='red.300'
                  focusBorderColor={
                    errors.email
                      ? 'red.300'
                      : watch('email')
                      ? 'green.100'
                      : 'gray.300'
                  }
                  borderColor={
                    errors.email
                      ? 'red.300'
                      : watch('email')
                      ? 'green.100'
                      : 'gray.300'
                  }
                />
              </Field>
              <Field label='Password' error={errors?.password?.message}>
                <Input
                  type='password'
                  {...register('password', {
                    required,
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
                      message:
                        'Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 number, and 1 special character',
                    },
                  })}
                  errorBorderColor='red.300'
                  focusBorderColor={
                    errors.password
                      ? 'red.300'
                      : watch('password')
                      ? 'green.100'
                      : 'gray.300'
                  }
                  borderColor={
                    errors.password
                      ? 'red.300'
                      : watch('password')
                      ? 'green.100'
                      : 'gray.300'
                  }
                />
              </Field>
              <Field
                label='Confirm Password'
                error={errors?.confirmPassword?.message}
              >
                <Input
                  type='password'
                  errorBorderColor='red.300'
                  focusBorderColor={
                    errors.confirmPassword
                      ? 'red.300'
                      : watch('confirmPassword')
                      ? 'green.100'
                      : 'gray.300'
                  }
                  borderColor={
                    errors.confirmPassword
                      ? 'red.300'
                      : watch('confirmPassword')
                      ? 'green.100'
                      : 'gray.300'
                  }
                  {...register('confirmPassword', {
                    required,
                    validate: validateConfirmPassword,
                  })}
                />
              </Field>
            </Step>
          </Steps>
          <Flex
            my={2}
            justifyContent='space-between'
            alignItems='center'
            minWidth='max-content'
          >
            {activeStep !== 0 && (
              <Button
                onClick={prevStep}
                disabled={false}
                backgroundColor='gray.300'
              >
                Back
              </Button>
            )}
            <Spacer />

            {activeStep !== 3 && (
              <Button onClick={next} backgroundColor='gray.300'>
                Next
              </Button>
            )}
            {activeStep === 3 && (
              <Button type='submit' onClick={next} backgroundColor='gray.300'>
                Register
              </Button>
            )}
          </Flex>
        </form>
      </Box>
    </ChakraProvider>
  );
}

export default App;
