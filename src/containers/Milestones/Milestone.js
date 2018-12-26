import React from 'react'

export default function Milestone({ milestone_date, caption }) {
  return (
    <article className="milestone">
      <h3>{milestone_date}</h3>
      <p>{caption}</p>
    </article>
  )
}