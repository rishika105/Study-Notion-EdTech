import { useEffect, useState, useRef } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack, IoIosMenu } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import IconBtn from "../../common/IconBtn"
import useOnClickOutside from "../../../hooks/useOnClickOutside"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  const sidebarRef = useRef()

  // Close sidebar when clicked outside
  useOnClickOutside(sidebarRef, () => setMobileSidebarOpen(false))

  useEffect(() => {
    const setActiveMenu = () => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    }
    setActiveMenu()
  }, [courseSectionData, courseEntireData, location.pathname])

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileSidebarOpen(false)
  }, [location.pathname])

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed left-4 top-4 z-30 rounded-md bg-richblack-700 p-2 text-richblack-200 md:hidden"
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      >
        <IoIosMenu size={24} />
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed overflow-auto z-20 h-screen w-[320px] max-w-[350px] flex-shrink-0 flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 transition-all duration-300 md:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between">
            <div
              onClick={() => navigate(`/dashboard/enrolled-courses`)}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
              title="back"
            >
              <IoIosArrowBack size={30} />
            </div>
            <IconBtn
              text="Add Review"
              customClasses="ml-auto hidden md:block"
              onclick={() => setReviewModal(true)}
            />
          </div>
          <div className="flex flex-col">
            <p className="truncate">{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        <div className="h-[calc(100vh-140px)] overflow-y-auto">
          {courseSectionData.map((section, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onClick={() => setActiveStatus(activeStatus === section._id ? "" : section._id)}
              key={index}
            >
              {/* Section */}
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] truncate font-semibold">
                  {section?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`transition-all duration-500 ${
                      activeStatus === section._id ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* Sub Sections */}
              {activeStatus === section._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {section.subSection.map((topic, i) => (
                    <div
                      className={`flex gap-3 px-5 py-2 ${
                        videoBarActive === topic._id
                          ? "bg-yellow-200 font-semibold text-richblack-800"
                          : "hover:bg-richblack-900"
                      }`}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                        )
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => {}}
                        className="h-4 w-4 rounded border-richblack-300 bg-richblack-700 text-yellow-50 focus:ring-yellow-50"
                      />
                      <span className="truncate">{topic.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Add Review Button */}
      {!mobileSidebarOpen && (
        <div className="fixed bottom-8 left-6 z-30 md:hidden">
          <button
            onClick={() => setReviewModal(true)}
            className="flex items-start gap-x-1 rounded-full bg-yellow-50 px-4 py-2 font-medium text-richblack-900 shadow-lg hover:scale-95"
          >
            Add Review
          </button>
        </div>
      )}
    </>
  )
}