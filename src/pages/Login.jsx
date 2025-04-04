import loginImg from "../assets/Images/login.webp"
import Chatbot from "../components/common/Chatbot"
import NavBar from "../components/common/NavBar"
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <>
      <NavBar />
      <Chatbot/>
      <Template
        title="Welcome Back"
        description1="Build skills for today, tomorrow, and beyond."
        description2="Education to future-proof your career."
        image={loginImg}
        formType="login"
      /></>
  )
}

export default Login