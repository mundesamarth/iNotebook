import { PasswordField } from "../AuthLayout";

const inputClass =
  "h-11.5 w-full min-w-0 rounded-md border border-[#cfc8bf] bg-white px-3 py-2.5 text-ink focus:outline-2 focus:outline-offset-2 focus:outline-accent";

const buttonClass =
  "flex min-h-12 w-full items-center justify-between rounded-md bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-[#493b30] disabled:cursor-not-allowed disabled:opacity-50";

function FieldError({ id, message }) {
  if (!message) return null;

  return (
    <p id={id} className="text-sm text-red-700" role="alert">
      {message}
    </p>
  );
}

const fields = [
  {
    name: "name",
    label: "Full name",
    type: "text",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "phonenumber",
    label: "Phone number",
    type: "tel",
    autoComplete: "tel",
  },
];

export default function SignUpForm({
  details,
  fieldErrors,
  error,
  busy,
  onChange,
  onSubmit,
}) {
  return (
    <section>
      <h1 className="mb-3 text-[32px] font-semibold tracking-tight">
        Create your account
      </h1>

      <p className="mb-8 text-[15px] text-muted">
        A fresh page starts here.
      </p>

      <form
        noValidate
        onSubmit={onSubmit}
        className="flex flex-col gap-5"
      >
        {fields.map((field) => (
          <div key={field.name} className="flex min-w-0 flex-col gap-2">
            <label
              htmlFor={field.name}
              className="text-[13px] font-semibold"
            >
              {field.label}
            </label>

            <input
              id={field.name}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              required
              value={details[field.name]}
              onChange={onChange}
              disabled={busy}
              className={inputClass}
              aria-invalid={Boolean(fieldErrors[field.name])}
              aria-describedby={
                fieldErrors[field.name]
                  ? `${field.name}-error`
                  : undefined
              }
            />

            <FieldError
              id={`${field.name}-error`}
              message={fieldErrors[field.name]}
            />
          </div>
        ))}

        <div className="grid grid-cols-2 gap-4 max-[1050px]:grid-cols-1 max-md:grid-cols-2 max-[390px]:grid-cols-1">
          <div className="flex min-w-0 flex-col gap-2">
            <PasswordField
              id="password"
              value={details.password}
              onChange={onChange}
              disabled={busy}
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby="password-error"
            />

            <FieldError
              id="password-error"
              message={fieldErrors.password}
            />
          </div>

          <div className="flex min-w-0 flex-col gap-2">
            <PasswordField
              id="confirmPassword"
              label="Confirm password"
              value={details.confirmPassword}
              onChange={onChange}
              disabled={busy}
              aria-invalid={Boolean(fieldErrors.confirmPassword)}
              aria-describedby="confirmPassword-error"
            />

            <FieldError
              id="confirmPassword-error"
              message={fieldErrors.confirmPassword}
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        <button type="submit" disabled={busy} className={buttonClass}>
          {busy ? "Sending OTP…" : "Create new account"}
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-muted">
        Next, verify your email with a one-time code.
      </p>
    </section>
  );
}