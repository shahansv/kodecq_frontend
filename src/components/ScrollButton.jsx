import { ArrowUp, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollButton() {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {atTop ? (
        <div className="fixed bottom-6 right-6 px-4 py-2 text-white rounded-full flex items-center gap-2 animate-pulse">
          <span className="text-sm">Scroll to see more</span>
          <ArrowDown className="w-4 h-4" />
        </div>
      ) : (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-neutral-900 text-white hover:bg-gray-800 transition-all hover:text-cyan-400"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}
