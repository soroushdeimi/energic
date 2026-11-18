/**
 * Page container matching the archive header/footer shell:
 * max 390px + 20px padding on mobile, max 1440px + 120px padding on md+.
 */
export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[390px] px-[20px] md:max-w-[1440px] md:px-[120px]">
      {children}
    </div>
  );
}
