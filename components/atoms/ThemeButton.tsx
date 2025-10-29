import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { MoonIcon, Sun } from "lucide-react";

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className="relative z-10"
      onClick={() => {
        console.log("Current", theme);
        theme === "light" ? setTheme("dark") : setTheme("light");
      }}
    >
      {theme === "light" ? <MoonIcon /> : <Sun />}
    </Button>
  );
};
