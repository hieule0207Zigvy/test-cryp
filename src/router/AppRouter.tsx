import { lazy, memo, ReactNode, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Dashboard = lazy(() => import('@/pages/dashboard'))
const Sub = lazy(() => import('@/pages/sub'))
const MainPage = lazy(() => import('@/pages/main-page'))
const Config = lazy(() => import('@/pages/config-page'))

export const PRIVATE_ROUTES = {
  MAIN: '/',
  SUB: '/sub',
  HIEU: '/hieu',
  CONFIG: '/config'
}

type PrivateRoutesType = { path: string; element: ReactNode }[]

const privateRoutes: PrivateRoutesType = [
  { path: PRIVATE_ROUTES.MAIN, element: <MainPage /> },
  { path: PRIVATE_ROUTES.SUB, element: <Sub /> },
  { path: PRIVATE_ROUTES.CONFIG, element: <Config /> }
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
