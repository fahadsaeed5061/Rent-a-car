import Image from "next/image";

export function OptimizedImage({
  src,
  alt,
  className,
  sizes = "(max-width: 700px) 100vw, (max-width: 980px) 50vw, 33vw",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return <Image src={src} alt={alt} className={className} width={1600} height={1000} sizes={sizes} quality={75} />;
}
