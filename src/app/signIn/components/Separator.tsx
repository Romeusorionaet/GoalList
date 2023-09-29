export function Separator() {
  return (
    <div className="relative my-8 text-center">
      <div className="absolute inset-y-1/2 left-0 w-2/5 border-t border-zinc-300" />
      <strong>OR</strong>
      <div className="absolute inset-y-1/2 right-0 w-2/5 border-t border-zinc-300" />
    </div>
  )
}
