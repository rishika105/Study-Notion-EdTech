import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import "video-react/dist/video-react.css"
import { useLocation } from "react-router-dom"
import { BigPlayButton, Player } from "video-react"
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import IconBtn from "../../common/IconBtn"

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const playerRef = useRef(null)
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState([])
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchVideoData = async () => {
      if (!courseSectionData.length) return
      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`)
      } else {
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        )
        const filteredVideoData = filteredData?.[0]?.subSection.filter(
          (data) => data._id === subSectionId
        )
        if (filteredVideoData) {
          setVideoData(filteredVideoData[0])
        }
        setPreviewSource(courseEntireData.thumbnail)
        setVideoEnded(false)
      }
    }
    fetchVideoData()
  }, [courseSectionData, courseEntireData, location.pathname])


  // check if the lecture is the first video of the course
  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
      return true
    } else {
      return false
    }
  }

  // go to the next video
  const goToNextVideo = () => {
    // console.log(courseSectionData)

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    // console.log("no of subsections", noOfSubsections)

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx + 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      )
    } else {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
      const nextSubSectionId =
        courseSectionData[currentSectionIndx + 1].subSection[0]._id
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      )
    }
  }

  // check if the lecture is the last video of the course
  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    if (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    ) {
      return true
    } else {
      return false
    }
  }

  // go to the previous video
  const goToPrevVideo = () => {
    // console.log(courseSectionData)

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      )
    } else {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
      const prevSubSectionLength =
        courseSectionData[currentSectionIndx - 1].subSection.length
      const prevSubSectionId =
        courseSectionData[currentSectionIndx - 1].subSection[
          prevSubSectionLength - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      )
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    )
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }
  return (
    <div className="flex-1 overflow-auto mt-10 lg:mt-5">
      <div className="md:ml-[320px] md:mr-6">
        {/* Course Heading */}
        <h1 className="my-4 text-2xl font-bold text-richblack-5 md:text-2xl">
          {courseEntireData?.courseName}
        </h1>

        {/* Video Player */}
        <div className="aspect-video w-full h-full overflow-hidden rounded-sm bg-richblack-800">
          {!videoData ? (
            <img
              src={previewSource}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <Player
              ref={playerRef}
              aspectRatio="16:9"
              playsInline
              onEnded={() => setVideoEnded(true)}
              src={videoData?.videoUrl}
            >
              <BigPlayButton position="center" />
              {videoEnded && (
                <div className="absolute inset-0 z-[100] flex h-full w-full flex-col items-center justify-center bg-gradient-to-t from-black to-transparent p-4 text-center">
                  {!completedLectures.includes(subSectionId) && (
                    <IconBtn
                      disabled={loading}
                      onclick={() => handleLectureCompletion()}
                      text={!loading ? "Mark As Completed" : "Loading..."}
                      customClasses="text-xl max-w-max px-4 mx-auto mb-2"
                    />
                  )}
                  <IconBtn
                    disabled={loading}
                    onclick={() => {
                      if (playerRef?.current) {
                        playerRef?.current?.seek(0)
                        setVideoEnded(false)
                      }
                    }}
                    text="Rewatch"
                    customClasses="text-xl max-w-max px-4 mx-auto mb-6"
                  />
                  <div className="flex flex-wrap justify-center gap-4">
                    {!isFirstVideo() && (
                      <button
                        disabled={loading}
                        onClick={goToPrevVideo}
                        className="rounded-md bg-richblack-700 px-4 py-2 font-medium text-richblack-5 hover:bg-richblack-600"
                      >
                        Previous Lecture
                      </button>
                    )}
                    {!isLastVideo() && (
                      <button
                        disabled={loading}
                        onClick={goToNextVideo}
                        className="rounded-md bg-yellow-50 px-4 py-2 font-medium text-richblack-900 hover:bg-yellow-100"
                      >
                        Next Lecture
                      </button>
                    )}
                  </div>
                </div>
              )}
            </Player>
          )}
        </div>

        {/* Video Details */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-richblack-5 md:text-2xl">
            {videoData?.title}
          </h2>
          <p className="mt-2 text-richblack-100">{videoData?.description}</p>
        </div>
      </div>
    </div>
  )
}

export default VideoDetails