import React from 'react'
import '../../main.scss'

export default function Home({ toggleHomeScreen, boulder }) {
  let caption
  if (boulder) {
    caption = (
      <div className="caption">
        <h2>Jimmy Webb | Livin' Large | V15</h2>
        <h3>Rocklands, ZA</h3>
      </div>
    )
  } else {
    caption = (
      <div className="caption">
        <h2>Margo Hayes | La Rambla | 5.15a</h2>
        <h3>Siurana, ES</h3>
      </div>
    )
  }

  return (
    <div className="home">
      <div className="switcher">
        <input
          type="radio"
          name="style"
          id="sport"
          value={false}
          defaultChecked={!boulder}
          onClick={toggleHomeScreen}
        />
        <label htmlFor="sport" className="sport-label">sport</label>
        <input
          type="radio"
          name="style"
          id="boulder"
          value={true}
          defaultChecked={boulder}
          onClick={toggleHomeScreen}/>
        <label htmlFor="boulder" className="boulder-label">boulder</label>
      </div>
      {caption}
    </div>
  )
}