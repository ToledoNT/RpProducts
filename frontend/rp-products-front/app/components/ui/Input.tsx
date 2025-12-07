interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-black">{label}</label>
      
      <input
        {...props}
        className="
          w-full rounded-md border border-zinc-300 px-3 py-2 text-sm
          bg-white
          text-black                     /* 🖤 TEXTO PRETO */
          placeholder:text-zinc-500       /* placeholder cinza suave */
          focus:border-primary
          focus:outline-none
          transition
        "
      />
    </div>
  );
}
