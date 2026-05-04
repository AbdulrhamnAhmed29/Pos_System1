import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

const MainLayout = () => {
  return (
    <div className="flex bg-white min-h-screen text-zinc-100">
      <Sidebar />
      <div className="flex-1 mx-auto ">
        <TopBar />
        <main className="pt-20 ">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
