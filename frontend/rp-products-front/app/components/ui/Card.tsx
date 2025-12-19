interface CardProps {
  title?: string;
  children: React.ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-zinc-200">
      {title && (
        <h2 className="text-xl font-semibold text-black mb-4">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}