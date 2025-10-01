function InfoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center">
      <p className="text-lg text-gray-900 uppercase tracking-wide">{label}</p>
      <div className="text-lg text-primary uppercase tracking-wide font-medium">
        {children}
      </div>
    </div>
  );
}

export default InfoRow;
