import React, { Component } from "react"
import FileIcon from "../img/FileIcon.png"
import LinkIcon from "../img/Link.png"
class File extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      title: props.title,
      inFolder: props.inFolder,
      windowCount: 0,
      windowArray: []
    }
  }
  render() {
    const title = this.state.title
    if (this.state.inFolder) {
      return (
        <li className="file">
          <button type='button' onClick={() => {
            this.props.setWindowArray([...this.props.windowArray,{title:title,inFolder:this.props.inFolder}])
            this.setState({ windowCount: this.state.windowCount + 1 })
          }}>
            {this.props.thumbnail?<div className="thumbnailwrapper"><img className="thumbnail" src={this.props.thumbnail} alt="FileIcon"></img><img className="linkicon" src={LinkIcon} alt="linkIcon"></img></div>:<img className="thumbnail" src={FileIcon} alt="FileIcon"></img>}
            {title}
            </button>

        </li>
      )
    } else {
      return (
        <div className="file">
          <button
          style={{
            color: "white",
            textShadow:"1px 1px 3px black"
          }}
          type='button' onClick={() => {
            this.props.setWindowArray([...this.props.windowArray,{title:title,inFolder:this.props.inFolder}])
            this.setState({ windowCount: this.state.windowCount + 1 })
          }}><img src={FileIcon} alt="FileIcon" /><br/>
          {title}</button>
        </div>
      )
    }

  }
}

export default File