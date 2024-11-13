import { AuthFormProps, SIGN_IN_FORM, SIGN_UP_FORM } from "./forms"


type NextConstantsProps = {
  signUpForm: AuthFormProps[]
  signInForm: AuthFormProps[]
}

export const Next_CONSTANTS: NextConstantsProps = {
  signUpForm: SIGN_UP_FORM,
  signInForm: SIGN_IN_FORM,
}
