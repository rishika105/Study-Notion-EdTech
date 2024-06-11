import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import Button from '../HomePage/Button'

const LearningGrid = () => {
  return (
    <div className='flex justify-center items-center'>
      <div className=' grid grid-cols-4 mt-[80px]'>

        <div className='w-[500px] col-span-2 space-y-3'>
       <div className='text-4xl font-semibold'>
       World-Class Learning for
        <HighlightText text = "Anyone, Anywhere"/>
       </div>

       <div>
       <p className='text-richblack-300 opacity-90 pb-6 text-[17px] font-medium'>Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>
       </div>

        <div className= "w-fit">
        <Button active = {true} linkto ={"/signup"}>
              Learn More
        </Button>
        </div>
        </div>

        <div className='h-[280px] w-[300px] bg-richblack-700 flex flex-col gap-7 text-[18px] py-[25px] px-[40px]'>
          <h1 className=''>Curriculum Based on Industry Needs</h1>
          <p className='text-richblack-300 opacity-90 pb-6 text-[15px] font-medium'>Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.</p>
        </div>

        <div className='h-[280px] w-[300px] bg-richblack-800 flex flex-col gap-7 text-[18px] py-[25px] px-[40px]'>
          <h1 className=''>Our Learning Methods</h1>
          <p className='text-richblack-300 opacity-90 pb-6 text-[15px] font-medium'>The learning process uses the namely online and offline.</p>
        </div>

        <div className='col-span-1'>

        </div>


        <div className='h-[280px] w-[300px] bg-richblack-700 flex flex-col gap-7 text-[18px] py-[25px] px-[40px]'>
          <h1 className=''>Certification</h1>
          <p className='text-richblack-300 opacity-90 pb-6 text-[15px] font-medium'>You will get a certificate that can be used as a certification during job hunting.</p>
        </div>

        <div className='h-[280px] w-[300px] bg-richblack-800 flex flex-col gap-7 text-[18px] py-[25px] px-[40px]'>
          <h1 className=''>Rating "Auto-grading"</h1>
          <p className='text-richblack-300 opacity-90 pb-6 text-[15px] font-medium'>You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.</p>
        </div>

        <div className='h-[280px] w-[300px] bg-richblack-700 flex flex-col gap-7 text-[18px] py-[25px] px-[40px]'>
          <h1 className=''>Ready to Work</h1>
          <p className='text-richblack-300 opacity-90 pb-6 text-[15px] font-medium'>Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.</p>
        </div>
      </div>
    </div>
  )
}

export default LearningGrid
