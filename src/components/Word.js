import React, { Component } from 'react';
import {connect} from 'react-redux';


class Word extends Component {
  render(){
    return(
      <div>
        Your word is...{this.props.state.word}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state 
  }
}

export default connect(mapStateToProps, null)(Word)