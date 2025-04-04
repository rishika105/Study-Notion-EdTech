import signupImg from "../assets/Images/signup.webp"
import Chatbot from "../components/common/Chatbot"
import NavBar from "../components/common/NavBar"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <>
      <NavBar />
      <Chatbot/>
      <Template
        title="Join the millions learning to code with StudyNotion for free"
        description1="Build skills for today, tomorrow, and beyond."
        description2="Education to future-proof your career."
        image={signupImg}
        formType="signup"
      /></>
  )
}

export default Signup