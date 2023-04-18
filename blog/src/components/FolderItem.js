import React, { Component } from 'react'
import File from './File.js'
import { Rnd } from 'react-rnd'
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
        const offsetHeight=0
        const offsetWidth=300
        const { title, file, component } = this.props;
        let ChildComponent = component || File;
        return (
            <Rnd
                className='folderwindow'
                style={{ visibility: this.state.visible ? "visible" : "hidden", position: "absolute" }}
                default={{ x: Math.floor(Math.random()*(window.innerWidth/2-offsetWidth)), y: Math.floor(Math.random()*(window.innerHeight-offsetHeight)), width: 300, height: 300 }}
                enableResizing={{ top: true, right: true, bottom: true, left: true, topRight: true, bottomRight: true, bottomLeft: false, topLeft: true }}
                minHeight={300}
                minWidth={300}
            >
                <ul>
                    <button className='deletebutton' type='button' onClick={() => {
                        this.setState({ visible: false })
                    }}>Delete</button>
                    {file.map(((element, i) => {
                        return React.createElement(ChildComponent, { windowArray: this.props.windowArray, setWindowArray: this.props.setWindowArray, key: title + i, title: element.title, inFolder: [title, i] })
                    }))
                    }
                </ul>
            </Rnd>

        );
    }
}

export default FolderItem