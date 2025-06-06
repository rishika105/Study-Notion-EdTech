import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/core/Dashboard/Commons/Sidebar"
import { useState, useEffect } from "react"
import Chatbot from "../components/common/Chatbot"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setSidebarOpen(false)
      }
    }

    handleResize() // Set initial value
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen">
      <Chatbot />
      {/* Mobile Sidebar Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed left-4 top-4 z-50 p-2 md:hidden text-richblack-300 text-2xl"
        >
          ☰
        </button>
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isMobile={isMobile} />

      <div className={`min-h-screen flex-1 overflow-auto ${isMobile && sidebarOpen ? 'ml-0' : 'md:ml-[222px]'}`}>
        <div className="mx-auto lg:mx-0 lg:ml-16 w-11/12 max-w-[85%] py-10 mt-5">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard