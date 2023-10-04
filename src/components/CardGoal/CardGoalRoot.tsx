export function CardGoalRoot({ ...props }) {
  return (
    <div
      className="flex w-72 flex-col items-center justify-center rounded-lg bg-gradient-to-r from-zinc-300 to-blue-300 pt-4 shadow-md hover:from-slate-400 hover:to-blue-400 dark:bg-gradient-to-r dark:from-slate-600 dark:to-blue-950 dark:text-white dark:duration-700 dark:hover:from-slate-500 dark:hover:to-blue-950"
      {...props}
    />
  )
}
