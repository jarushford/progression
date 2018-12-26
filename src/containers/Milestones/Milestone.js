import React from 'react'

export default function Milestone({ milestone_date, caption }) {
  return (
    <article className="milestone">
      <div>
        <h3>{milestone_date}</h3>
        <i className="fas fa-times"></i>
      </div>
      <p>{caption}</p>
    </article>
  )
}