import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .min(6, "Email is Too short")
    .required("Email is required")
    .email("Email is valid"),
  password: Yup.string()
    .min(6, "Password is too short")
    .required("Password is required"),
});

export default LoginSchema;
