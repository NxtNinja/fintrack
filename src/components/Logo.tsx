import { Landmark } from "lucide-react";

const Logo = () => {
  return (
    <>
      <a href="/" className="flex items-center gap-2">
        <Landmark className="stroke h-11 w-11 font-bold stroke-emerald-500 stroke-[1.5]" />
        <p className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
          Fintrack
        </p>
      </a>
    </>
  );
};

export default Logo;
