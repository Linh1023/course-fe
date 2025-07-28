// components/RandomQueryProvider.tsx
'use client'

import React, { createContext, useContext } from 'react'

const RandomQueryContext = createContext<string | undefined>(undefined)

export const useRandomQuery = () => {
  const context = useContext(RandomQueryContext)
  if (context === undefined) {
    throw new Error('useRandomQuery must be used within RandomQueryProvider')
  }
  return context
}

export function RandomQueryProvider({ value, children }: { value: string; children: React.ReactNode }) {
  return <RandomQueryContext.Provider value={value}>{children}</RandomQueryContext.Provider>
}
