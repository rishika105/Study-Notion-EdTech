import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import image1 from "../assets/Images/aboutus1.webp"
import image2 from "../assets/Images/aboutus2.webp"
import image3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote'
import image4 from "../assets/Images/FoundingStory.png"
import Stats from '../components/core/AboutPage/Stats'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import ReviewSlider from '../components/common/ReviewSlider'
import Footer from '../components/common/Footer'

const AboutUs = () => {
  return (
    <div>
      <div className= "relative mx-auto flex flex-col items-center text-white w-11/12 max-w-maxContent">
           
           {/* first-section */}
          <div className='bg-richblack-700 h-[500px] w-[100vw]'>

         
        {/* heading */}
       <div className='flex flex-col items-center justify-center mt-[90px] gap-3 w-[800px] mx-auto text-center'>
       <div className='font-semibold text-4xl text-white'>
             Driving Innovation in Online Education for a
             <HighlightText text= "Brighter Future"/>
             </div>
             <div className=' text-richblack-200 opacity-90'>
             Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
          </div>
       </div>

          </div>



{/* images */}
    <div className='absolute grid-3 flex flex-row gap-10 mt-[290px] justify-center items-center'>
        <img src= {image1}></img>
        <img src= {image2}></img>
        <img src= {image3}></img>
    </div>

    <Quote/>


{/* thin line */}
    <div className='mt-[10px] bg-richblack-400 h-[1px] w-[100vw] opacity-30'></div>

{/* our founding section */}
    <div className='relative'>
         <div className='flex flex-row gap-15 justify-between items-center mt-[90px]'>

            <div className=' lg:w-[50%] gap-10 flex flex-col'>
                <div className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent  '>
                Our Founding Story
                </div>
                <div className=' text-richblack-200 opacity-90 flex flex-col gap-10'>
                    <p>
                    Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world. 
                    </p>
                    <p>
                    As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                    </p>
                </div>
            </div>



            
            <img src={image4} className='shadow-[0_0_20px_0] shadow-[#FC6767]'></img>
            
         </div>
    </div>

<section>
    <div className='flex flex-row mt-[200px] w-11/12 justify-between max-w-maxContent mx-auto'>
        <div className='flex flex-col gap-10 w-[40%]'>
        <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold text-4xl">
            {" "}
            Our Vision
        </span>
              <p className='text-richblack-200 opacity-90'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
        </div>

        <div className='flex flex-col gap-10 w-[40%]'>
      <HighlightText text = {"Our Mission"}/>
        <p className='text-richblack-200 opacity-90'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
        </div>

    </div>
</section>

        <Stats/>

        <LearningGrid/>

        <ContactFormSection/>

        <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviews from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        {/* <ReviewSlider /> */}
        <ReviewSlider />
      </div>


      </div>

      <Footer/>
    </div>
  )
}

export default AboutUs
