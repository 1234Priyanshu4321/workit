import React, { useContext } from 'react'
import { Context } from "../../main"
import { Link } from "react-router-dom"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { SiLeetcode } from "react-icons/si"
import { RiInstagramFill } from "react-icons/ri"

function Footer() {
  const { isAuthorized } = useContext(Context)
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>Made with ❤️ by Priyanshu Chaturvedi • &copy; {new Date().getFullYear()} All Rights Reserved.</div>
      <div>
        <Link to={'https://github.com'} target='_blank' rel="noopener noreferrer"><FaGithub /></Link>
        <Link to={'https://leetcode.com'} target='_blank' rel="noopener noreferrer"><SiLeetcode /></Link>
        <Link to={'https://www.linkedin.com'} target='_blank' rel="noopener noreferrer"><FaLinkedin /></Link>
        <Link to={'https://www.instagram.com'} target='_blank' rel="noopener noreferrer"><RiInstagramFill /></Link>
      </div>
    </footer>
  )
}

export default Footer