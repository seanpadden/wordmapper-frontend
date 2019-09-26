import React, { Component } from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Tracker = styled.div`
  width: 100%;
  height: 20px,
  margin: 15px auto;

  border-radius: 10px;

`

const Thumb = styled.div`
  width: ${props => props.percentage}%;
  height: 100%;
  background-color: white
  border-radius: 8px;
  transition: width 0.3s ease-in-out;
`

export default class ProgressBar extends Component {

  clamp = (min, value, max) => {
    return Math.min(Math.max(min, value), max)
  }

  render() {

    return (
      <Tracker>
        <Thumb percentage={this.clamp(0, this.props.percentage, 100)}>

          {this.clamp(0, this.props.percentage, 100)}%

        </Thumb> 
      </Tracker>
    )
  }
}

ProgressBar.propTypes = {
  percentage: PropTypes.number
};
