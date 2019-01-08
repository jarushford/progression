import React from 'react'
import { clearError } from '../../actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import '../../main.scss'

export function Error({ error, clearError }) {
  return (
    <section className="error">
      <h2>{error}</h2>
      <h2>Something seems to have gone wrong!</h2>
      <button onClick={clearError}>Return to site</button>
    </section>
  )
}

export const mapStateToProps = (state) => ({
  error: state.error
})

export const mapDispatchToProps = (dispatch) => ({
  clearError: () => dispatch(clearError())
})

export default connect(mapStateToProps, mapDispatchToProps)(Error)

Error.propTypes = {
  error: PropTypes.string.isRequired,
  clearError: PropTypes.func.isRequired
}