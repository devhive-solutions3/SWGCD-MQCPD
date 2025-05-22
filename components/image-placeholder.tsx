interface ImagePlaceholderProps {
  className?: string;
  text?: string;
}

export function ImagePlaceholder({ className = "", text = "Image" }: ImagePlaceholderProps) {
  return (
    <div
      className={`bg-[#1E3D32]/5 flex items-center justify-center text-[#1E3D32]/40 ${className}`}
    >
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
} 