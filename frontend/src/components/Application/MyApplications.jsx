import React, { useContext, useEffect, useState } from "react"
import { Context } from "../../main"
import api from "../../api"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import ResumeModal from "./ResumeModal"
import { useScrollAnimation } from "../../hooks/useScrollAnimation"
import api from "../../api"

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context)
  const [applications, setApplications] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [resumeImageUrl, setResumeImageUrl] = useState("")
  const navigateTo = useNavigate()
  const [ref, isVisible] = useScrollAnimation()

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const endpoint = user && user.role === "Employer"
          ? "/api/v1/application/employer/getall"
          : "/api/v1/application/jobseeker/getall"
        
        const res = await api.get(endpoint, {
          withCredentials: true,
        })
        setApplications(res.data.applications)
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch applications")
      }
    }
    fetchApplications()
  }, [isAuthorized, user])

  if (!isAuthorized) {
    navigateTo("/")
    return null
  }

  const deleteApplication = async (id) => {
    try {
      const res = await api.delete(`/api/v1/application/delete/${id}`, {
        withCredentials: true,
      })
      toast.success(res.data.message)
      setApplications((prevApplication) =>
        prevApplication.filter((application) => application._id !== id)
      )
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete application")
    }
  }

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <section className="my_applications page">
      <div className="container">
        <h3 className={isVisible ? 'fade-in-up' : ''} ref={ref}>
          {user && user.role === "Job Seeker" ? "My Applications" : "Applications From Job Seekers"}
        </h3>
        {applications.length <= 0 ? (
          <h4 style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "40px" }}>
            No Applications Found
          </h4>
        ) : (
          <div className={`banner ${isVisible ? 'fade-in-up' : ''}`}>
            {applications.map((element) => {
              return user && user.role === "Job Seeker" ? (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              ) : (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              )
            })}
          </div>
        )}
      </div>
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  )
}

export default MyApplications

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>Address:</span> {element.address}
        </p>
        <p>
          <span>CoverLetter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="btn_area">
        <button onClick={() => deleteApplication(element._id)}>
          Delete Application
        </button>
      </div>
    </div>
  )
}

const EmployerCard = ({ element, openModal }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>Address:</span> {element.address}
        </p>
        <p>
          <span>CoverLetter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  )
}
