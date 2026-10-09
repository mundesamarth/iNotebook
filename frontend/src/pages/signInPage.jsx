import { useState } from "react";
import AuthLayout, { PasswordField } from "../components/AuthLayout";
import { gooeyToast } from "goey-toast";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const SignInPage = () => {
  const navigation = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [busy, setBusy] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const handleChange = (event) => {
    setFieldErrors({});
    setCredentials((cred) => ({
      ...cred,
      [event.target.name]: event.target.value,
    }));
    setFieldErrors((current) => ({
      ...current,
      [event.target.name]: "",
    }));
  };

  const handleSubmit = async (event) => {
    setFieldErrors({});
    event.preventDefault();
    if (busy) return;

    setBusy(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/login_user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email.trim(),
            password: credentials.password,
          }),
        },
      );

      const data = await response.json();

      if (!data.success || !response.ok) {
        if (data.code === "EMAIL_NOT_FOUND") {
          setFieldErrors({ email: "Email does not exist." });
          return;
        }

        if (data.code === "INVALID_PASSWORD") {
          setFieldErrors({ password: "Wrong password." });
          return;
        }
        throw new Error(data.message || "Could not sign in");
      }

      gooeyToast.success("Login Successfull");
      sessionStorage.setItem("token", data.token);
      navigation("/", { replace: true });
    } catch (error) {
      gooeyToast.error(
        error.message || "Something went wrong, please try again later",
      );
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      navigation("/", { replace: true });
    }
  }, [navigation]);
  return (
    <AuthLayout mode="signin">
      <div className="w-full max-w-105 max-md:max-w-110">
        <h1 className="mb-3 text-[32px] leading-tight font-semibold tracking-[-1.2px] max-md:text-3xl">
          Welcome back.
        </h1>
        <p className="mb-8 text-[15px] leading-relaxed text-muted">
          Pick up where you left off.
        </p>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex min-w-0 flex-col gap-2 [&>label]:text-[13px] [&>label]:font-semibold [&_input]:h-11.5 [&_input]:w-full [&_input]:min-w-0 [&_input]:rounded-md [&_input]:border [&_input]:border-[#cfc8bf] [&_input]:bg-white [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-ink [&_input]:transition-colors [&_input]:duration-150 [&_input:hover]:border-[#9b8d7f] [&_input:focus]:border-transparent [&_input:focus]:outline-2 [&_input:focus]:outline-offset-2 [&_input:focus]:outline-accent motion-reduce:[&_input]:transition-none">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={handleChange}
              value={credentials.email}
              required
            />
            {fieldErrors.email && (
              <p className="text-sm text-red-700" role="alert">
                {fieldErrors.email}
              </p>
            )}
          </div>
          <PasswordField
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={credentials.password}
            required
            minLength={6}
            maxLength={26}
          />
          {fieldErrors.password && (
            <p className="text-sm text-red-700" role="alert">
              {fieldErrors.password}
            </p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-md border border-ink bg-ink px-4 py-3 text-sm font-semibold text-white no-underline transition-colors duration-150 hover:enabled:bg-[#493b30] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none [&>span]:text-xl [&>span]:font-normal"
          >
            {busy ? "Signing In..." : "Sign In"}
            <span aria-hidden="true">→</span>
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignInPage;
