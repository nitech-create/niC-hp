import React, { Component } from "react"
import Window from "./Window.js"
class File extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      title: props.title,
      inFolder: props.inFolder,
      windowCount: 0,
      windowArray: []
    }
  }
  render() {
    const { component } = this.props;
    let ChildComponent = component || Window
    const title = this.state.title
    if (this.state.inFolder) {
      return (
        <li>
          <button type='button' onClick={() => {
            this.setState({ windowArray: [...this.state.windowArray, this.state.windowCount] })
            this.setState({ windowCount: this.state.windowCount + 1 })
          }}>{title}</button>
          {this.state.windowArray.map((i) => {
            return React.createElement(ChildComponent, { key: title + i + this.state.inFolder[0], title, inFolder: this.props.inFolder })
          })}
        </li>
      )
    } else {
      return (
        <div>
          <button type='button' onClick={() => {
            this.setState({ windowArray: [...this.state.windowArray, this.state.windowCount] })
            this.setState({ windowCount: this.state.windowCount + 1 })
          }}>{title}</button>
          {this.state.windowArray.map((i)=>{
            return React.createElement(ChildComponent, { key:title+i, title, inFolder: this.props.inFolder })
          })}
        </div>
      )
    }
  }
}

export default File