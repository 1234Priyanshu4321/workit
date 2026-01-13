import React from "react"
import { AiOutlineClose } from "react-icons/ai"

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className="resume-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>
          <AiOutlineClose />
        </span>
        <img src={imageUrl} alt="resume" />
      </div>
    </div>
  )
}

export default ResumeModal
