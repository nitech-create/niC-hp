import React, { Component } from 'react'
import File from './File.js'

class Folder extends Component {    
  constructor(props){
  super(props)
  this.state = {
      visible:false,
      data:this.props.data,
      component:this.props.component,
  }
}
  render() {

    const { title,file,component } = this.props;

    let ChildComponent = component || File;

    return(

      <ul>
      <button type='button' onClick={()=>{this.setState({visible:!this.state.visible})}}>{title}</button>
        {this.state.visible&&file.map(((element,i)=>{
          return React.createElement(ChildComponent,{key:title+i,title:element.title,inFolder:[title,i]})
        }))
        }
      </ul>
    );
  }
}

export default Folder