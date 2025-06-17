import React from "react"

export function PageContainer({ children }: { children: React.ReactNode }) {
  return <div className={`flex flex-1 flex-col px-[clamp(2rem,-1.7143rem+18.5714vw,15rem)] py-8`}>{children}</div>
}
