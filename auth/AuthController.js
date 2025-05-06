import { authenticateUser, saveUser } from "./AuthService.js";
import { GENDER } from "./constants.js";

const EMAIL_REGEXP = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
/**
 * The password should be at least 8 characters long.
 * It should contain at least one uppercase letter.
 * It should contain at least one lowercase letter.
 * It should contain at least one digit.
 * It should contain at least one special character (like @, #, $, etc.).
 */
const PASSWORD_REGEXP =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

const validateEmail = (email) => EMAIL_REGEXP.test(email);

const validatePassword = (password) => PASSWORD_REGEXP.test(password);
const validateGender = (gender) =>
  gender === GENDER.FEMALE || gender === GENDER.MALE;
const validateName = (name) => name && name.length >= 4;

export async function signupController(req, resp) {
  const { name, email, password, gender } = req.body;

  if (
    !validateEmail(email) ||
    !validatePassword(password) ||
    !validateGender(gender) ||
    !validateName(name)
  ) {
    return resp.status(400).json({ message: "Invalid details" });
  }

  const result = await saveUser(req.body);
  if (result) {
    resp.status(201).json({ message: "Signup successful" });
  } else {
    resp.status(500).json({ message: "Signup failed! please try again" });
  }
}

export async function loginController(req, resp) {
  const { email, password } = req.body;
  if (!validateEmail(email) || !validatePassword(password)) {
    return resp.status(400).json({ message: "Invalid credentials" });
  }

  const result = await authenticateUser(req.body);
  const statusCode = result.status;
  delete result.status;
  resp.status(statusCode).json({ ...result });
}
