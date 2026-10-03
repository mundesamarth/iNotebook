import { useState } from 'react'
import AuthLayout, { PasswordField } from '../components/AuthLayout'

const SignUpPage = () => {
  const [showOtp, setShowOtp] = useState(false)



  
  return (
    <AuthLayout>
      <div className="w-full max-w-420px max-md:max-w-440px">
        <ol className="mb-10 flex gap-6 text-xs text-muted" aria-label="Account creation progress">
          <li className={!showOtp ? 'font-semibold text-accent' : ''} aria-current={!showOtp ? 'step' : undefined}>1. Your details</li>
          <li className={showOtp ? 'font-semibold text-accent' : ''} aria-current={showOtp ? 'step' : undefined}>2. Verify email</li>
        </ol>

        <section hidden={showOtp}>
          <h1 className="mb-3 text-[32px] leading-tight font-semibold tracking-[-1.2px] max-md:text-3xl">Create your account</h1>
          <p className="mb-8 text-[15px] leading-relaxed text-muted">A fresh page starts here.</p>
          <form className="flex flex-col gap-5" onSubmit={(event) => event.preventDefault()}>
            <div className="flex min-w-0 flex-col gap-2 [&>label]:text-[13px] [&>label]:font-semibold [&_input]:h-11.5 [&_input]:w-full [&_input]:min-w-0 [&_input]:rounded-md [&_input]:border [&_input]:border-[#cfc8bf] [&_input]:bg-white [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-ink [&_input]:transition-colors [&_input]:duration-150 [&_input:hover]:border-[#9b8d7f] [&_input:focus]:border-transparent [&_input:focus]:outline-2 [&_input:focus]:outline-offset-2 [&_input:focus]:outline-accent motion-reduce:[&_input]:transition-none">
              <label htmlFor="name">Full name</label>
              <input id="name" name="name" autoComplete="name" />
            </div>
            <div className="flex min-w-0 flex-col gap-2 [&>label]:text-[13px] [&>label]:font-semibold [&_input]:h-11.5 [&_input]:w-full [&_input]:min-w-0 [&_input]:rounded-md [&_input]:border [&_input]:border-[#cfc8bf] [&_input]:bg-white [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-ink [&_input]:transition-colors [&_input]:duration-150 [&_input:hover]:border-[#9b8d7f] [&_input:focus]:border-transparent [&_input:focus]:outline-2 [&_input:focus]:outline-offset-2 [&_input:focus]:outline-accent motion-reduce:[&_input]:transition-none">
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" />
            </div>
            <div className="flex min-w-0 flex-col gap-2 [&>label]:text-[13px] [&>label]:font-semibold [&_input]:h-11.5 [&_input]:w-full [&_input]:min-w-0 [&_input]:rounded-md [&_input]:border [&_input]:border-[#cfc8bf] [&_input]:bg-white [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-ink [&_input]:transition-colors [&_input]:duration-150 [&_input:hover]:border-[#9b8d7f] [&_input:focus]:border-transparent [&_input:focus]:outline-2 [&_input:focus]:outline-offset-2 [&_input:focus]:outline-accent motion-reduce:[&_input]:transition-none">
              <label htmlFor="phone_no">Phone number</label>
              <input id="phone_no" name="phone_no" type="tel" autoComplete="tel" />
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1050px]:grid-cols-1 max-md:grid-cols-2 max-[390px]:grid-cols-1">
              <PasswordField id="password" />
              <PasswordField id="confirm_password" label="Confirm password" />
            </div>
            <button type="button" className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-md border border-ink bg-ink px-4 py-3 text-sm font-semibold text-white no-underline transition-colors duration-150 hover:enabled:bg-[#493b30] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none [&>span]:text-xl [&>span]:font-normal" onClick={() => setShowOtp(true)}>
              Create new account <span aria-hidden="true">→</span>
            </button>
          </form>
          <p className="mt-5 text-center text-xs leading-relaxed text-muted">Next, verify your email with a one-time code.</p>
        </section>

        <section hidden={!showOtp}>
          <h1 className="mb-3 text-[32px] leading-tight font-semibold tracking-[-1.2px] max-md:text-3xl">Check your email</h1>
          <p className="mb-8 text-[15px] leading-relaxed text-muted">Enter the verification code for your email address.</p>
          <form className="flex flex-col gap-5" onSubmit={(event) => event.preventDefault()}>
            <div className="flex min-w-0 flex-col gap-2 [&>label]:text-[13px] [&>label]:font-semibold [&_input]:h-11.5 [&_input]:w-full [&_input]:min-w-0 [&_input]:rounded-md [&_input]:border [&_input]:border-[#cfc8bf] [&_input]:bg-white [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-ink [&_input]:transition-colors [&_input]:duration-150 [&_input:hover]:border-[#9b8d7f] [&_input:focus]:border-transparent [&_input:focus]:outline-2 [&_input:focus]:outline-offset-2 [&_input:focus]:outline-accent motion-reduce:[&_input]:transition-none">
              <label htmlFor="otp">Verification code</label>
              <input className="h-16! pl-6! text-center text-[28px] tracking-[.55em] tabular-nums" id="otp" name="otp" inputMode="numeric" autoComplete="one-time-code" maxLength={6} aria-describedby="otp-hint" />
              <p id="otp-hint" className="text-xs leading-relaxed text-muted">Enter your 6-digit code.</p>
            </div>
            {/* Connect verification and resend when adding your backend requests. */}
            <button type="button" className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-md border border-ink bg-ink px-4 py-3 text-sm font-semibold text-white no-underline transition-colors duration-150 hover:enabled:bg-[#493b30] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none [&>span]:text-xl [&>span]:font-normal">Verify email <span aria-hidden="true">→</span></button>
          </form>
          <p className="mt-6 text-[13px] text-muted">
            Didn’t receive a code? <button type="button" className="cursor-pointer font-semibold text-accent hover:underline">Resend code</button>
          </p>
          <button type="button" className="mt-7 cursor-pointer text-[13px] font-semibold text-accent hover:underline" onClick={() => setShowOtp(false)}>← Back to your details</button>
        </section>
      </div>
    </AuthLayout>
  )
}

export default SignUpPage
