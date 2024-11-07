import MainPage from '@/pages/main-page'
import { lazy, memo, ReactNode, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Dashboard = lazy(() => import('@/pages/dashboard'))
const Sub = lazy(() => import('@/pages/sub'))

export const PRIVATE_ROUTES = {
  MAIN: '/',
  SUB: '/sub',
  HIEU: '/hieu'
}

type PrivateRoutesType = { path: string; element: ReactNode }[]

const privateRoutes: PrivateRoutesType = [
  { path: PRIVATE_ROUTES.MAIN, element: <Dashboard /> },
  { path: PRIVATE_ROUTES.SUB, element: <Sub /> },
  { path: PRIVATE_ROUTES.HIEU, element: <MainPage /> }
]

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {privateRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        <Route path='*' element={<Navigate to={PRIVATE_ROUTES.MAIN} />} />
      </Routes>
    </Suspense>
  )
}

export default memo(AppRouter)