import React, {Component} from "react"
import Window from "./Window.js"
class FolderItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            text:props.text
        }
    }
    render() {
        const { component } = this.props;
        let ChildComponent = component || Window
        const text = this.state.text
      return(
        <li>
          <button type='button' onClick={()=>{this.setState({visible:!this.state.visible})}}>{text}</button>
          {this.state.visible&&React.createElement(ChildComponent,{key:text,text})}
        </li>
      );
    }
  }

  export default FolderItem