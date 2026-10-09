import { useState } from "react";
import { gooeyToast } from "goey-toast";

import AuthLayout from "../components/AuthLayout";
import SignUpForm from "../components/auth/SignUpForm";
import OtpForm from "../components/auth/OtpForm";
import { useNavigate } from "react-router";
import { useEffect } from "react";

// Todo Resend OTP function
// todo expired JWT token verification function
export default function SignUpPage() {
  const navigation = useNavigate();
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");

  const [details, setDetails] = useState({
    name: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setDetails((current) => ({
      ...current,
      [name]: value,
    }));

    setFieldErrors((current) => ({
      ...current,
      [name]: "",
      ...(name === "password" ? { confirmPassword: "" } : {}),
    }));

    setError("");
  }

  function validateForm(form) {
    const errors = {};

    const nameLength = Array.from(details.name.trim()).length;

    if (nameLength < 3 || nameLength > 26) {
      errors.name = "Your name must be between 3–26 characters.";
    }

    const emailInput = form.elements.namedItem("email");

    if (!emailInput.validity.valid) {
      errors.email = "Enter a valid email address.";
    }

    if (!/^(\+?91|0)?[6789]\d{9}$/.test(details.phonenumber)) {
      errors.phonenumber =
        "Enter a valid Indian mobile number, optionally prefixed with +91, 91, or 0.";
    }

    const passwordLength = Array.from(details.password).length;

    if (passwordLength < 8 || passwordLength > 26) {
      errors.password = "Your password must be 8–26 characters.";
    }

    const confirmationLength = Array.from(details.confirmPassword).length;

    if (confirmationLength < 8 || confirmationLength > 26) {
      errors.confirmPassword = "Confirm your password using 8–26 characters.";
    } else if (details.password !== details.confirmPassword) {
      errors.confirmPassword = "Your passwords don’t match.";
    }

    setFieldErrors(errors);

    const firstInvalidField = Object.keys(errors)[0];

    if (firstInvalidField) {
      form.elements.namedItem(firstInvalidField)?.focus();
    }

    return !firstInvalidField;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (busy) return;

    setError("");

    if (!validateForm(event.currentTarget)) return;

    setBusy(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/sendOTPToEmail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: details.email.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Could not send OTP.");
      }

      gooeyToast.success("OTP sent successfully", {
        description: "Check your email for the verification code.",
      });

      setOtp("");
      setShowOtp(true);
    } catch (err) {
      gooeyToast.error(err.message || "Could not send OTP.");
    } finally {
      setBusy(false);
    }
  }

  async function handleCreateNewUser() {
    if (busy) return;

    setError("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Enter a valid 6-digit OTP.");
      return;
    }

    setBusy(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/create-new-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: details.name.trim(),
            email: details.email.trim(),
            phonenumber: details.phonenumber,
            password: details.password,
            confirmPassword: details.confirmPassword,
            otp: otp,
          }),
        },
      );

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Could not create account.");
      }

      gooeyToast.success("Account Created Successfully", {
        description: "You can now sign in.",
      });

      navigation("/signin",{replace:true});
    } catch (error) {
      setError(error.message || "Could not create account. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  function handleBack() {
    setShowOtp(false);
    setOtp("");
    setError("");
  }
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      navigation("/", { replace: true });
    }
  }, [navigation]);
  return (
    <AuthLayout>
      <div className="w-full max-w-420px max-md:max-w-440px">
        <ol
          className="mb-10 flex gap-6 text-xs text-muted"
          aria-label="Account creation progress"
        >
          <li
            className={!showOtp ? "font-semibold text-accent" : ""}
            aria-current={!showOtp ? "step" : undefined}
          >
            1. Your details
          </li>

          <li
            className={showOtp ? "font-semibold text-accent" : ""}
            aria-current={showOtp ? "step" : undefined}
          >
            2. Verify email
          </li>
        </ol>

        {showOtp ? (
          <OtpForm
            email={details.email}
            otp={otp}
            busy={busy}
            onOtpChange={(value)=>{
              setOtp(value);
              setError("")
            }}
            onBack={handleBack}
            onVerify={handleCreateNewUser}
            error={error}
          />
        ) : (
          <SignUpForm
            details={details}
            fieldErrors={fieldErrors}
            error={error}
            busy={busy}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </AuthLayout>
  );
}
