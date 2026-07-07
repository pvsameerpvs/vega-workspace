export function LoadingLogo() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center">
        <img
          src="/images/logo/logo.jpeg"
          alt="Vega"
          className="h-16 w-auto animate-[gentle-bounce_2s_ease-in-out_infinite] opacity-60"
        />
        <div className="mt-5 flex items-center gap-1.5">
          <span className="h-2 w-2 animate-[dot-bounce_1.4s_ease-in-out_infinite] rounded-full bg-[#1F3A93]" />
          <span className="h-2 w-2 animate-[dot-bounce_1.4s_ease-in-out_0.2s_infinite] rounded-full bg-[#FFD400]" />
          <span className="h-2 w-2 animate-[dot-bounce_1.4s_ease-in-out_0.4s_infinite] rounded-full bg-[#1F3A93]" />
        </div>
      </div>
    </div>
  );
}
