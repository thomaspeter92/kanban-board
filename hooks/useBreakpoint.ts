import { createBreakpoint } from "react-use";
import tailwindConfig from "@/tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

const config = resolveConfig(tailwindConfig);

type Breakpoint = keyof typeof breakpoints;
const breakpoints = {
  sm: parseInt(config.theme.screens.sm),
  md: parseInt(config.theme.screens.md),
  lg: parseInt(config.theme.screens.lg),
  xl: parseInt(config.theme.screens.xl),
  "2xl": parseInt(config.theme.screens["2xl"]),
};

export const useBreakpoint = createBreakpoint(breakpoints) as () => Breakpoint;
