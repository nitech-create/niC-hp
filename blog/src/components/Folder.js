import React, { Component } from 'react'
import FolderItem from './FolderItem.js'

class Folder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      data: this.props.data,
      component: this.props.component,
      folderCount: 0,
      windowArray: [],
    }
  }
  render() {

    const { title, file, component } = this.props;
    let ChildComponent = component || FolderItem;
    console.log(title)
    return (

      <div>
        <button type='button' onClick={() => {
          this.setState({ windowArray: [...this.state.windowArray, this.state.folderCount] })
          this.setState({ folderCount: this.state.folderCount + 1 })
        }}>{title}</button>
        {this.state.windowArray.map((i) => {

          return React.createElement(ChildComponent, { key: title + i, file, title })

        })}
      </div>
    );
  }
}

export default Folder