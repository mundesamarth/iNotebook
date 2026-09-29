import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import AuthLayout, { PasswordField } from '../components/AuthLayout'

// Connect these callbacks to your existing authentication API.
const SignUpPage = ({ onCreateAccount, onVerifyOtp, onResendOtp }) => {
  const [step, setStep] = useState('details')
  const [details, setDetails] = useState({ name: '', email: '', phonenumber: '', password: '', confirmPassword: '' })
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [sent, setSent] = useState(false)
  const heading = useRef(null)

  useEffect(() => {
    if (step !== 'details') heading.current?.focus()
  }, [step])
  useEffect(() => {
    if (!cooldown) return
    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldown])

  function update(event) {
    setDetails({ ...details, [event.target.name]: event.target.value })
    setError('')
  }

  async function createAccount(event) {
    event.preventDefault()
    if (!details.name.trim()) return setError('Please enter your name.')
    if (details.phonenumber.replace(/\D/g, '').length < 7) return setError('Please enter a valid phone number.')
    if (details.password !== details.confirmPassword) return setError('Your passwords don’t match. Please try again.')
    setBusy(true)
    setError('')
    try {
      if (onCreateAccount) {
        await onCreateAccount({ name: details.name.trim(), email: details.email.trim(), phonenumber: details.phonenumber.trim(), password: details.password })
        setSent(true)
        setCooldown(30)
      }
      setStep('otp')
    } catch (err) {
      setError(err.message || 'We couldn’t create your account. Please try again.')
    } finally { setBusy(false) }
  }

  async function verify(event) {
    event.preventDefault()
    if (!onVerifyOtp) return
    setBusy(true)
    setError('')
    try {
      await onVerifyOtp({ email: details.email.trim(), otp })
      setDetails({ ...details, password: '', confirmPassword: '' })
      setStep('complete')
    } catch (err) {
      setError(err.message || 'That code couldn’t be verified. Please try again.')
    } finally { setBusy(false) }
  }

  async function resend() {
    setBusy(true)
    setError('')
    try {
      await onResendOtp({ email: details.email.trim() })
      setSent(true)
      setCooldown(30)
    } catch (err) {
      setError(err.message || 'We couldn’t resend the code. Please try again.')
    } finally { setBusy(false) }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w105 max-md:max-w-110 [&_h1]:mb-3 [&_h1]:text-[32px] [&_h1]:leading-[1.2] [&_h1]:font-semibold [&_h1]:tracking-[-1.2px] max-md:[&_h1]:text-3xl">
        {step !== 'complete' && <ol className="mb-10 flex list-none gap-6 p-0 text-xs text-muted [&>li]:flex [&>li]:items-center [&>li]:gap-2 [&>li>span]:grid [&>li>span]:size-5.5 [&>li>span]:place-items-center [&>li>span]:rounded-full [&>li>span]:border [&>li>span]:border-[#c8bfb3] [&>li[aria-current]]:font-semibold [&>li[aria-current]]:text-accent [&>li[aria-current]>span]:border-accent [&>li[aria-current]>span]:bg-accent [&>li[aria-current]>span]:text-white" aria-label="Account creation progress"><li aria-current={step === 'details' ? 'step' : undefined}><span>{step === 'otp' ? '✓' : '1'}</span> Your details</li><li aria-current={step === 'otp' ? 'step' : undefined}><span>2</span> Verify email</li></ol>}
        {step === 'details' ? <>
          <h1>Create your account</h1>
          <p className="mb-8 text-[15px] leading-[1.7] wrap-break-words text-muted [&_strong]:font-medium [&_strong]:text-ink">A fresh page starts here.</p>
          <form onSubmit={createAccount} className="flex flex-col gap-5">
            <div className="flex min-w-0 flex-col gap-2 [&>label]:text-[13px] [&>label]:font-semibold [&_input]:h-11.5 [&_input]:w-full [&_input]:min-w-0 [&_input]:rounded-md [&_input]:border [&_input]:border-[#cfc8bf] [&_input]:bg-white [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-ink [&_input]:transition-colors [&_input]:duration-150 [&_input:hover]:border-[#9b8d7f] [&_input:focus]:border-transparent [&_input:focus]:outline-2 [&_input:focus]:outline-offset-2 [&_input:focus]:outline-accent motion-reduce:[&_input]:transition-none"><label htmlFor="name">Full name</label><input id="name" name="name" autoComplete="name" required maxLength={100} value={details.name} onChange={update}/></div>
            <div className="flex min-w-0 flex-col gap-2 [&>label]:text-[13px] [&>label]:font-semibold [&_input]:h-11.5 [&_input]:w-full [&_input]:min-w-0 [&_input]:rounded-md [&_input]:border [&_input]:border-[#cfc8bf] [&_input]:bg-white [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-ink [&_input]:transition-colors [&_input]:duration-150 [&_input:hover]:border-[#9b8d7f] [&_input:focus]:border-transparent [&_input:focus]:outline-2 [&_input:focus]:outline-offset-2 [&_input:focus]:outline-accent motion-reduce:[&_input]:transition-none"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" required value={details.email} onChange={update}/></div>
            <div className="flex min-w-0 flex-col gap-2 [&>label]:text-[13px] [&>label]:font-semibold [&_input]:h-11.5 [&_input]:w-full [&_input]:min-w-0 [&_input]:rounded-md [&_input]:border [&_input]:border-[#cfc8bf] [&_input]:bg-white [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-ink [&_input]:transition-colors [&_input]:duration-150 [&_input:hover]:border-[#9b8d7f] [&_input:focus]:border-transparent [&_input:focus]:outline-2 [&_input:focus]:outline-offset-2 [&_input:focus]:outline-accent motion-reduce:[&_input]:transition-none"><label htmlFor="phonenumber">Phone number</label><input id="phonenumber" name="phonenumber" type="tel" autoComplete="tel" required pattern="[+0-9() .\-]{7,25}" maxLength={25} value={details.phonenumber} onChange={update}/></div>
            <div className="grid grid-cols-2 gap-4 max-[1050px]:grid-cols-1 max-[1050px]:gap-5 max-md:grid-cols-2 max-md:gap-4 max-[390px]:grid-cols-1 max-[390px]:gap-5 [&+p]:-mt-3"><PasswordField id="password" minLength={8} value={details.password} onChange={update} aria-describedby="password-hint"/><PasswordField id="confirmPassword" label="Confirm password" minLength={8} value={details.confirmPassword} onChange={update}/></div>
            <p id="password-hint" className="text-xs leading-[1.6] text-muted">Use at least 8 characters.</p>
            {error && <p role="alert" className="text-[13px] leading-[1.6] text-[#a02b22]">{error}</p>}
            <button className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-md border border-ink bg-ink px-4 py-3 text-sm font-semibold text-white no-underline transition-colors duration-150 hover:enabled:bg-[#493b30] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none [&>span]:text-xl [&>span]:font-normal" disabled={busy}>{busy ? 'Creating account…' : 'Create new account'}<span aria-hidden="true">→</span></button>
          </form>
          <p className="mt-5 text-center text-xs leading-[1.6] text-muted">Next, verify your email with a one-time code.</p>
        </> : step === 'otp' ? <>
          <h1 ref={heading} tabIndex={-1}>Check your email</h1>
          <p className="mb-8 text-[15px] leading-[1.7] wrap-break-words text-muted [&_strong]:font-medium [&_strong]:text-ink">Enter the verification code for<br/><strong>{details.email}</strong></p>
          <form onSubmit={verify} className="flex flex-col gap-5">
            <div className="flex min-w-0 flex-col gap-2 [&>label]:text-[13px] [&>label]:font-semibold [&_input]:h-11.5 [&_input]:w-full [&_input]:min-w-0 [&_input]:rounded-md [&_input]:border [&_input]:border-[#cfc8bf] [&_input]:bg-white [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-ink [&_input]:transition-colors [&_input]:duration-150 [&_input:hover]:border-[#9b8d7f] [&_input:focus]:border-transparent [&_input:focus]:outline-2 [&_input:focus]:outline-offset-2 [&_input:focus]:outline-accent motion-reduce:[&_input]:transition-none"><label htmlFor="otp">Verification code</label><input className="h-16! pl-6! text-center text-[28px] tracking-[.55em] tabular-nums" id="otp" name="otp" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} minLength={6} required value={otp} onChange={(event) => { setOtp(event.target.value.replace(/\D/g, '')); setError('') }} aria-describedby="otp-hint"/><p className="text-xs leading-[1.6] text-muted" id="otp-hint">Enter your 6-digit code.</p></div>
            {error && <p role="alert" className="text-[13px] leading-[1.6] text-[#a02b22]">{error}</p>}
            <button className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-md border border-ink bg-ink px-4 py-3 text-sm font-semibold text-white no-underline transition-colors duration-150 hover:enabled:bg-[#493b30] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none [&>span]:text-xl [&>span]:font-normal" disabled={busy || otp.length !== 6 || !onVerifyOtp}>{busy ? 'Verifying…' : 'Verify email'}<span aria-hidden="true">→</span></button>
          </form>
          <p className="mt-6 mb-2 text-[13px] text-muted [&>button]:cursor-pointer [&>button]:border-0 [&>button]:bg-transparent [&>button]:py-1 [&>button]:font-semibold [&>button]:text-accent [&>button]:underline-offset-4 [&>button:hover]:underline [&>button:disabled]:cursor-not-allowed [&>button:disabled]:text-muted [&>button:disabled]:no-underline">Didn’t receive a code? <button type="button" disabled={busy || cooldown > 0 || !onResendOtp} onClick={resend}>{cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend code'}</button></p>
          <p className="text-xs leading-[1.6] text-muted" role="status">{sent ? 'Code sent. Check your inbox and spam folder.' : ''}</p>
          <button className="mt-7 cursor-pointer border-0 bg-transparent py-1 text-[13px] font-semibold text-accent underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-50" type="button" disabled={busy} onClick={() => { setStep('details'); setOtp(''); setError(''); setSent(false) }}>← Back to your details</button>
        </> : <>
          <div className="mb-6 text-[40px] text-accent" aria-hidden="true">✓</div>
          <h1 ref={heading} tabIndex={-1}>You’re all set.</h1>
          <p className="mb-8 text-[15px] leading-[1.7] wrap-break-words text-muted [&_strong]:font-medium [&_strong]:text-ink">Your email is verified. Sign in to open your notebook.</p>
          <Link className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-md border border-ink bg-ink px-4 py-3 text-sm font-semibold text-white no-underline transition-colors duration-150 hover:enabled:bg-[#493b30] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none [&>span]:text-xl [&>span]:font-normal" to="/signin">Continue to sign in <span aria-hidden="true">→</span></Link>
        </>}
      </div>
    </AuthLayout>
  )
}

export default SignUpPage
