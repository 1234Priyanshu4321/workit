import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { Context } from "../../main"
import { useScrollAnimation } from "../../hooks/useScrollAnimation"

const Jobs = () => {
  const [jobs, setJobs] = useState([])
  const { isAuthorized } = useContext(Context)
  const navigateTo = useNavigate()
  const [ref, isVisible] = useScrollAnimation()

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        setJobs(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchJobs()
  }, [])

  if (!isAuthorized) {
    navigateTo("/")
    return null
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h1 className={isVisible ? 'fade-in-up' : ''} ref={ref}>ALL AVAILABLE JOBS</h1>
        <div className={`banner ${isVisible ? 'fade-in-up' : ''}`}>
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}

export default Jobs
