import React, { Component } from "react"
import {connect} from 'react-redux'
import WordMap from "../components/WordMap";
import Sidebar from './Sidebar.js'
import Word from "../components/Word";


class WordMapContainer extends Component {
  // componentDidMount() {
  //   if (!localStorage.token || !this.props.state.currentUser.username) {
  //     this.props.history.push('/login')
  //   } 
  // }
  render() {
    
    return (
      <div >
        <Sidebar/>
        <Word/>
        <div className="mapParent?" style={{display: `flex`, position: `fixed`, top: 0, bottom: 0, left: 0, right: 0}}>
        <WordMap 
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
          loadingElement={<div style={{ height: `100%`, }} />}
          containerElement={<div style={{ display: `flex`, position: `fixed`, height: `100%`, width: `100%` }} />}
          mapElement={<div style={{ 
            height: '95%',  
            width: '60%',
            position: 'relative',
            marginTop: '1%',
            marginLeft: '38%',
            border: 'solid 2px black',
            }}
            />}
        />
        </div>
        <div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}
  
export default connect(mapStateToProps, null)(WordMapContainer)