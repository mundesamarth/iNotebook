import { useState } from 'react'
import { Link } from 'react-router'

export function PasswordField({ id, label = 'Password', autoComplete = 'new-password', ...props }) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="flex min-w-0 flex-col gap-2 [&>label]:text-[13px] [&>label]:font-semibold [&_input]:h-11.5 [&_input]:w-full [&_input]:min-w-0 [&_input]:rounded-md [&_input]:border [&_input]:border-[#cfc8bf] [&_input]:bg-white [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-ink [&_input]:transition-colors [&_input]:duration-150 [&_input:hover]:border-[#9b8d7f] [&_input:focus]:border-transparent [&_input:focus]:outline-2 [&_input:focus]:outline-offset-2 [&_input:focus]:outline-accent motion-reduce:[&_input]:transition-none">
      <label htmlFor={id}>{label}</label>
      <div className="relative [&_input]:pr-14 [&>button]:absolute [&>button]:top-0 [&>button]:right-0.5 [&>button]:h-11.5 [&>button]:cursor-pointer [&>button]:border-0 [&>button]:bg-transparent [&>button]:px-2.5 [&>button]:text-[11px] [&>button]:text-muted">
        <input id={id} name={id} type={visible ? 'text' : 'password'} autoComplete={autoComplete} {...props} />
        <button type="button" onClick={() => setVisible(!visible)} aria-label={`${visible ? 'Hide' : 'Show'} ${label.toLowerCase()}`} aria-pressed={visible}>{visible ? 'Hide' : 'Show'}</button>
      </div>
    </div>
  )
}


export default function AuthLayout({ children, mode = 'signup' }) {
  const signingIn = mode === 'signin'
  return (
    <div className="flex min-h-svh flex-col bg-paper font-sans text-ink">
      <header className="flex min-h-25 items-center justify-between gap-6 border-b border-[#e4dfd8] px-[6%] py-6 max-md:min-h-20 max-md:px-6 max-md:py-5 [&>p]:text-sm [&>p]:text-muted max-md:[&>p]:text-[0px] [&>p>a]:ml-3 [&>p>a]:font-semibold [&>p>a]:text-ink [&>p>a]:underline [&>p>a]:underline-offset-4 max-md:[&>p>a]:ml-0 max-md:[&>p>a]:text-[13px]">
        <Link className="inline-flex items-center gap-2.5 text-2xl font-semibold tracking-[-1px] no-underline max-md:text-[22px]" to="/signup" aria-label="iNotebook home">
          <svg width="26" height="28" viewBox="0 0 26 28" fill="none" aria-hidden="true"><rect x="4" y="2" width="20" height="24" rx="3" stroke="currentColor" strokeWidth="1.7"/><path d="M9 2v24M1 8h5M1 14h5M1 20h5M13 9h7M13 14h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
          iNotebook<span className="-ml-2.25 text-accent">.</span>
        </Link>
        <p>{signingIn ? 'New here?' : 'Already a member?'} <Link to={signingIn ? '/signup' : '/signin'}>{signingIn ? 'Create an account' : 'Sign in'} <span aria-hidden="true">↗</span></Link></p>
      </header>
      <main className="mx-auto grid w-full max-w-360 flex-1 grid-cols-2 max-md:grid-cols-1">
        <aside className="relative my-10 ml-[12%] flex min-h-115 flex-col justify-center bg-[#eee9e1] p-12 max-[1050px]:ml-[8%] max-[1050px]:p-8 max-md:hidden min-[1500px]:min-h-170 [&_h2]:mt-10 [&_h2]:mb-5 [&_h2]:text-[clamp(30px,3vw,44px)] [&_h2]:leading-[1.15] [&_h2]:font-medium [&_h2]:tracking-[-1.8px] [&_p]:text-[15px] [&_p]:leading-[1.8] [&_p]:text-[#675e54]">
          <div className="m-auto max-w-90">
            <div className="relative flex h-52.5 w-44 rounded-l-[3px] rounded-r-lg border border-[#8a4020] bg-[#ae5528] text-[#fff1df] shadow-[4px_4px_0_#d3cabe] after:absolute after:-inset-y-px after:right-4.5 after:w-1.5 after:bg-[#743819] after:content-['']" aria-hidden="true"><div className="w-4.25 shrink-0 border-r border-[#853e1f] bg-[#984820]"/><div className="px-3.5 py-5.75 text-[13px]"><span>iNotebook</span><div className="mt-3 mb-12 w-10 border-t border-[#dca07b]"/><span className="text-[11px] leading-[1.6]">A little space<br/>for your thoughts.</span></div></div>
            <h2>Your thoughts.<br/>A place of their own.</h2>
            <p>Notes, ideas, and everything in between.<br/>Keep them together in iNotebook.</p>
          </div>
          <span className="mt-9 text-xs text-[#756c61]">Make room for your next idea.</span>
        </aside>
        <section className="flex items-center justify-center px-[12%] py-14 max-[1050px]:px-[8%] max-[1050px]:py-12 max-md:px-6 max-md:pt-10 max-md:pb-14">{children}</section>
      </main>
      <footer className="flex justify-between gap-5 px-[6%] py-5 text-xs text-muted max-md:border-t max-md:border-[#e4dfd8] max-md:px-6 max-[390px]:[&>span:last-child]:hidden"><span>© {new Date().getFullYear()} iNotebook</span><span>A space to think clearly.</span></footer>
    </div>
  )
}