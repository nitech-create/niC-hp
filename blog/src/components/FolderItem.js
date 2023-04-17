import React, { Component } from 'react'
import File from './File.js'

class FolderItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true,
            data: this.props.data,
            component: this.props.component,
            folderCount: 0,
            windowArray: []
        }
    }
    render() {

        const { title, file, component } = this.props;
        let ChildComponent = component || File;
        return (
            <ul style={{ visibility: this.state.visible ? "visible" : "hidden" }}>
                <button type='button' onClick={() => {
                    this.setState({ visible: false })
                }}>Delete</button>
                {file.map(((element, i) => {
                    return React.createElement(ChildComponent, { key: title + i, title: element.title, inFolder: [title, i] })
                }))
                }
            </ul>
        );
    }
}

export default FolderItem