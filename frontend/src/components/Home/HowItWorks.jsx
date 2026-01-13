import React from "react"
import { FaUserPlus } from "react-icons/fa"
import { MdFindInPage } from "react-icons/md"
import { IoMdSend } from "react-icons/io"
import { useScrollAnimation } from "../../hooks/useScrollAnimation"

const HowItWorks = () => {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div className="howitworks">
      <div className="container">
        <h3 className={isVisible ? 'fade-in-up' : ''} ref={ref}>How Workit Works!</h3>
        <div className={`banner ${isVisible ? 'fade-in-up' : ''}`}>
          <div className="card">
            <FaUserPlus />
            <p>Create Account</p>
            <p>
              Sign up as a job seeker or employer and create your profile to get started.
            </p>
          </div>
          <div className="card">
            <MdFindInPage />
            <p>Find a Job/Post a Job</p>
            <p>
              Browse through available positions or post your job openings to find the perfect match.
            </p>
          </div>
          <div className="card">
            <IoMdSend />
            <p>Apply For Job/Recruit Suitable Candidates</p>
            <p>
              Submit your applications or review candidates to build your dream team.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
