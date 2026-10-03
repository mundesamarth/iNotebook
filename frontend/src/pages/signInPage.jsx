import AuthLayout, { PasswordField } from '../components/AuthLayout'

const SignInPage = () => {
  return (
    <AuthLayout mode="signin">
      <div className="w-full max-w-[420px] max-md:max-w-[440px]">
        <h1 className="mb-3 text-[32px] leading-tight font-semibold tracking-[-1.2px] max-md:text-3xl">Welcome back.</h1>
        <p className="mb-8 text-[15px] leading-relaxed text-muted">Pick up where you left off.</p>
        <form className="flex flex-col gap-5" onSubmit={(event) => event.preventDefault()}>
          <div className="flex min-w-0 flex-col gap-2 [&>label]:text-[13px] [&>label]:font-semibold [&_input]:h-11.5 [&_input]:w-full [&_input]:min-w-0 [&_input]:rounded-md [&_input]:border [&_input]:border-[#cfc8bf] [&_input]:bg-white [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-ink [&_input]:transition-colors [&_input]:duration-150 [&_input:hover]:border-[#9b8d7f] [&_input:focus]:border-transparent [&_input:focus]:outline-2 [&_input:focus]:outline-offset-2 [&_input:focus]:outline-accent motion-reduce:[&_input]:transition-none">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" autoComplete="email" />
          </div>
          <PasswordField id="password" autoComplete="current-password" />
          {/* Connect sign-in when adding your backend request. */}
          <button type="button" className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-md border border-ink bg-ink px-4 py-3 text-sm font-semibold text-white no-underline transition-colors duration-150 hover:enabled:bg-[#493b30] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none [&>span]:text-xl [&>span]:font-normal">Sign in <span aria-hidden="true">→</span></button>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignInPage
