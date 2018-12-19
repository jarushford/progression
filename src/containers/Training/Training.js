import React from 'react'
import { connect }  from 'react-redux';
import '../../main.scss'

function Training({ trainingData }) {
  return (
    <div className="training">
      
    </div>
  )
}

const mapStateToProps = (state) => ({
  trainingData: state.trainingData
})

export default connect(mapStateToProps)(Training)