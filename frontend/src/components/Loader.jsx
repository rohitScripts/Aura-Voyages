export default function Loader() {
  return (
    <div className="flex min-h-[320px] items-center justify-center">
      <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm">
        <span className="h-3 w-3 animate-bounce rounded-full bg-sky-500" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-sky-500 [animation-delay:120ms]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-sky-500 [animation-delay:240ms]" />
      </div>
    </div>
  )
}
