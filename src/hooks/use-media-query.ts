import * as React from "react";

export function useMediaQuery(query: string) {
  const [value, setvalue] = React.useState(false);

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setvalue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setvalue(result.matches);

    return () => {
      result.removeEventListener("change", onChange);
    };
  }, [query]);

  return value;
}
