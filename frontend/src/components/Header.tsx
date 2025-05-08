export default function Header() {
  return (
    <header className="sticky top-0 py-4 px-10 w-full bg-background border-2 z-40">
      <div className="flex max-w-[70rem] items-center justify-center mx-auto md:flex-row flex-col gap-4 ">
        <div className="text-2xl font-bold md:w-1/3 w-full text-center">
          Apollo Clone
        </div>
      </div>
    </header>
  );
}
