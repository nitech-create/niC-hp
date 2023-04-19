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
      folderArray:[]
    }
  }
  render() {
    const { title, file, component } = this.props;
    let ChildComponent = component || FolderItem;
    return (

      <div className='folder'>
        <button  className='folderbutton' type='button' onClick={() => {
          this.setState({ folderArray: [...this.state.folderArray, this.state.folderCount] })
          this.setState({ folderCount: this.state.folderCount + 1 })
        }}>{title}</button>
        {this.state.folderArray.map((i) => {
          return React.createElement(ChildComponent, { windowArray:this.props.windowArray ,setWindowArray:this.props.setWindowArray,key: title + i, file, title })
        })}
      </div>
    );
  }
}

export default Folder