"use client";

import { createContext, useContext } from "react";
import type { Grid } from "@/data/types";

const ScheduleContext = createContext<Grid>({ programs: [], slots: [] });

// A grade é lida do banco no layout (servidor) e compartilhada com os componentes do navegador.
export function ScheduleProvider({ grid, children }: { grid: Grid; children: React.ReactNode }) {
  return <ScheduleContext value={grid}>{children}</ScheduleContext>;
}

export function useGrid() {
  return useContext(ScheduleContext);
}
