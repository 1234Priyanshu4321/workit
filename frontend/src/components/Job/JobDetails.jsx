import React, { useContext, useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Context } from "../../main"
import { useScrollAnimation } from "../../hooks/useScrollAnimation"
import api from "../../api"
const JobDetails = () => {
  const { id } = useParams()
  const [job, setJob] = useState({})
  const navigateTo = useNavigate()
  const { isAuthorized, user } = useContext(Context)
  const [ref, isVisible] = useScrollAnimation()

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/api/v1/job/${id}`, {
          withCredentials: true,
        })
        setJob(res.data.job)
      } catch (error) {
        navigateTo("/notfound")
      }
    }
    fetchJob()
  }, [id, navigateTo])

  if (!isAuthorized) {
    navigateTo("/login")
    return null
  }

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3 className={isVisible ? 'fade-in-up' : ''} ref={ref}>Job Details</h3>
        <div className={`banner ${isVisible ? 'fade-in-up' : ''}`}>
          <p>
            Title: <span>{job.title}</span>
          </p>
          <p>
            Category: <span>{job.category}</span>
          </p>
          <p>
            Country: <span>{job.country}</span>
          </p>
          <p>
            City: <span>{job.city}</span>
          </p>
          <p>
            Location: <span>{job.location}</span>
          </p>
          <p>
            Description: <span>{job.description}</span>
          </p>
          <p>
            Job Posted On: <span>{job.jobPostedOn}</span>
          </p>
          <p>
            Salary:{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          {user && user.role !== "Employer" && (
            <Link to={`/application/${job._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default JobDetails
