import React from "react"
import { FaMicrosoft, FaApple } from "react-icons/fa"
import { SiTesla } from "react-icons/si"
import { useScrollAnimation } from "../../hooks/useScrollAnimation"

const PopularCompanies = () => {
  const [ref, isVisible] = useScrollAnimation()

  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Millennium City Centre, Gurugram",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Millennium City Centre, Gurugram",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Millennium City Centre, Gurugram",
      openPositions: 20,
      icon: <FaApple />,
    },
  ]

  return (
    <div className="companies">
      <div className="container">
        <h3 className={isVisible ? 'fade-in-up' : ''} ref={ref}>TOP COMPANIES</h3>
        <div className={`banner ${isVisible ? 'fade-in-up' : ''}`}>
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Open Positions {element.openPositions}</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PopularCompanies
