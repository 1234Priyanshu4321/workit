import axios from "axios"
import React, { useContext, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import { Context } from "../../main"
import { useScrollAnimation } from "../../hooks/useScrollAnimation"

const Application = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [coverLetter, setCoverLetter] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fileError, setFileError] = useState("")

  const { isAuthorized, user } = useContext(Context)
  const navigateTo = useNavigate()
  const { id } = useParams()
  const [ref, isVisible] = useScrollAnimation()

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setFileError("")
    
    if (!file) {
      setResume(null)
      return
    }
    
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      setFileError("Please select a valid image file (PNG, JPEG, or WEBP)")
      setResume(null)
      return
    }
    
    if (file.size > 2 * 1024 * 1024) {
      setFileError("File size should be less than 2MB")
      setResume(null)
      return
    }
    
    setResume(file)
  }

  const handleApplication = async (e) => {
    e.preventDefault()
    
    if (!name || !email || !phone || !address || !coverLetter) {
      toast.error("Please fill in all fields")
      return
    }
    
    if (!resume) {
      setFileError("Please upload your resume")
      return
    }
    
    setLoading(true)
    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("phone", phone)
    formData.append("address", address)
    formData.append("coverLetter", coverLetter)
    formData.append("resume", resume)
    formData.append("jobId", id)

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      setName("")
      setEmail("")
      setCoverLetter("")
      setPhone("")
      setAddress("")
      setResume(null)
      toast.success(data.message)
      navigateTo("/job/getall")
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
        "Something went wrong. Please try again later."
      toast.error(errorMessage)
      
      if (errorMessage.includes("Cloudinary") || errorMessage.includes("api_key")) {
        toast.error("File upload service is currently unavailable. Please try again later.")
      }
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/")
    return null
  }

  return (
    <section className="application">
      <div className="container">
        <h3 className={isVisible ? 'fade-in-up' : ''} ref={ref}>Application Form</h3>
        <form onSubmit={handleApplication} className={isVisible ? 'fade-in-up' : ''}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <textarea
            placeholder="Cover Letter..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
          />
          <div>
            <label style={{ textAlign: "start", display: "block", fontSize: "18px", color: "var(--text-light)", marginBottom: "8px" }}>
              Upload Resume 
              <p style={{ color: "var(--accent-brown)", fontSize: "14px", margin: "8px 0", fontWeight: "400" }}>
                (Supported formats: PNG, JPEG, WEBP. Max size: 2MB)
              </p>
            </label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.webp"
              onChange={handleFileChange}
              style={{ width: "100%", padding: "8px", color: "var(--text-light)" }}
            />
            {fileError && (
              <p style={{ color: "#d9534f", fontSize: "14px", marginTop: "8px" }}>
                {fileError}
              </p>
            )}
          </div>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer" 
            }}
          >
            {loading ? "Submitting..." : "Send Application"}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Application