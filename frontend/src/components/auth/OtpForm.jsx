export default function OtpForm({
  email,
  otp,
  busy,
  onOtpChange,
  onBack,
  onVerify,
  error,
  onResend,
}) {
  return (
    <section>
      <h1 className="mb-3 text-[32px] font-semibold tracking-tight">
        Check your email
      </h1>

      <p className="mb-8 text-[15px] leading-relaxed text-muted">
        Enter the verification code sent to{" "}
        <strong className="break-all text-ink">{email}</strong>.
      </p>

      <form
        className="flex flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          onVerify?.();
        }}
      >
        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="otp" className="text-[13px] font-semibold">
            Verification code
          </label>

          <input
            id="otp"
            name="otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            pattern="[0-9]{6}"
            maxLength={6}
            value={otp}
            disabled={busy}
            onChange={(event) =>
              onOtpChange(event.target.value.replace(/\D/g, ""))
            }
            aria-describedby="otp-hint"
            className="h-16 w-full rounded-md border border-[#cfc8bf] bg-white px-4 text-center text-[28px] tracking-[0.55em] tabular-nums focus:outline-2 focus:outline-offset-2 focus:outline-accent"
          />

          <p id="otp-hint" className="text-xs text-muted">
            Enter your 6-digit code.
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy || otp.length !== 6 || !onVerify}
          className="flex min-h-12 w-full items-center justify-between rounded-md bg-ink px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
         {busy ? "Verifying...." : "Verify Email"}
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <p className="mt-6 text-[13px] text-muted">
        Didn’t receive a code?{" "}
        <button
          type="button"
          onClick={onResend}
          disabled={busy || !onResend}
          className="font-semibold text-accent hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          Resend code
        </button>
      </p>

      <button
        type="button"
        onClick={onBack}
        disabled={busy}
        className="mt-7 text-[13px] font-semibold text-accent hover:underline"
      >
        ← Back to your details
      </button>
    </section>
  );
}
