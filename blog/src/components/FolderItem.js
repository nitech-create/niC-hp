import React, { Component } from 'react'
import File from './File.js'
import Draggable from 'react-draggable';
class FolderItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true,
            data: this.props.data,
            component: this.props.component,
        }
    }
    render() {
        
        const { title, file, component } = this.props;
        let ChildComponent = component || File;
        return (
            <Draggable
            defaultPosition={{x: 0, y: 0}}
            >
            <ul style={{ visibility: this.state.visible ? "visible" : "hidden" , position:"absolute"}}>
                <button type='button' onClick={() => {
                    this.setState({ visible: false })
                }}>Delete</button>
                {file.map(((element, i) => {
                    return React.createElement(ChildComponent, { windowArray:this.props.windowArray,setWindowArray:this.props.setWindowArray,key: title + i, title: element.title, inFolder: [title, i] })
                }))
                }
            </ul>
            </Draggable>

        );
    }
}

export default FolderItem