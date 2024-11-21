import { createContext, useCallback, useState } from 'react'
import { isEmpty } from 'lodash-es'

export const MockDataContext = createContext<any>(null)

export const MockDataProvider = (props: { children: React.ReactNode }) => {
  const { children } = props

  const [mockData, setMockData] = useState()

  const isAlreadySetDataToContext = !isEmpty(mockData)

  return (
    <MockDataContext.Provider value={{ mockData, setMockData, isAlreadySetDataToContext }}>
      {children}
    </MockDataContext.Provider>
  )
}
