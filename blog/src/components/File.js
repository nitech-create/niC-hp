import React, {Component} from "react"
import Window from "./Window.js"
class File extends Component {
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            title:props.title,
            inFolder:props.inFolder
        }
    }
    render() {
        const { component } = this.props;
        let ChildComponent = component || Window
        const title = this.state.title
        if(this.state.inFolder){
            return(
              <li>
                <button type='button' onDoubleClick={()=>{this.setState({visible:!this.state.visible})}}>{title}</button>
                {this.state.visible&&React.createElement(ChildComponent,{key:title+this.state.inFolder[0],title,inFolder:this.props.inFolder})}
              </li>
            );
        }else{
      return(
        <div>
          <button type='button' onDoubleClick={()=>{this.setState({visible:!this.state.visible})}}>{title}</button>
          {this.state.visible&&React.createElement(ChildComponent,{title,inFolder:this.props.inFolder})}
        </div>
      );
        }
    }
  }

  export default File