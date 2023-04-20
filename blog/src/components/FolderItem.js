import React, { Component } from 'react'
import File from './File.js'
import { Rnd } from 'react-rnd'
import CloseIcon from "../img/CloseIcon.svg"
import FolderIcon from '../img/FolderIcon.png'
import fullScreenIcon from "../img/FullScreen.svg"
import NormalScreenIcon from "../img/NormalScreen.svg"
import MyComputer from "../img/MyComputer.png"
import GoIcon from "../img/Go.png"
class FolderItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true,
            data: this.props.data,
            component: this.props.component,
            zIndex: window.zIndex,
            fullScreen: false
        }
    }
    onClick = () => {
        window.zIndex += 100
        this.setState({ zIndex: window.zIndex })
        window.zIndex += 100

    }
    fullScreen = () => {
        this.rnd.updateSize({ width: "100%", height: "100%" })
        this.rnd.updatePosition({ x: 0, y: 0 })
        this.setState({ fullScreen: true })
    }

    normalScreen = () => {
        console.log(this.rnd)
        this.rnd.updateSize({ width: this.rnd.props.default.width, height: this.rnd.props.default.height })
        this.rnd.updatePosition({ x: Math.random() * (window.innerWidth - 500), y: Math.random() * (window.innerHeight - 500) })
        this.setState({ fullScreen: false })
    }

    render() {
        const offsetHeight = 500
        const offsetWidth = 0
        const { title, file, component } = this.props;
        let ChildComponent = component || File;
        return (
            <div>

                <Rnd ref={c => { this.rnd = c }}
                    className='folderwindow'
                    style={{ zIndex: this.state.zIndex, visibility: this.state.visible ? "visible" : "hidden", position: "absolute" }}
                    default={{ x: Math.floor(Math.random() * (window.innerWidth / 2 - offsetWidth)), y: Math.floor(Math.random() * (window.innerHeight / 2 - offsetHeight)), width: "400", height: "300" }}
                    enableResizing={{ top: true, right: true, bottom: true, left: true, topRight: true, bottomRight: true, bottomLeft: false, topLeft: true }}
                    minHeight={300}
                    minWidth={300}
                    onClick={this.onClick}
                    onResizeStart={this.onClick}
                    cancel={"ul,.windowurl"}
                    bounds={"window"}
                >
                    <div className='topframe'>
                        <div className='topframeleft'>
                            <img src={FolderIcon} alt="foldericon" />
                            <p>{title}</p>
                        </div>
                        <div>
                            {!this.state.fullScreen ?
                                <button className='screenbutton' type='button' onClick={() => {
                                    this.fullScreen()
                                }}
                                onTouchStart={()=>{
                                    this.fullScreen()
                                }}
                                ><img src={fullScreenIcon} alt="FullScreenIcon" /></button>

                                :

                                <button className='screenbutton' type='button' onClick={() => {
                                    this.normalScreen()
                                }}
                                onTouchStart={()=>{
                                    this.normalScreen()
                                }}
                                ><img src={NormalScreenIcon} alt="NormalScreenIcon" /></button>}
                            <button className='deletebutton' type='button' onClick={() => {
                                this.setState({ visible: false })
                            }}
                            onTouchStart={()=>{
                                this.setState({visible:false})
                            }}
                            ><img src={CloseIcon} alt="CloseIcon" /></button>

                        </div>
                    </div>
                    <div className="windowurl">
                                <p style={{color:"gray"}}>Address</p>
                                <img src={MyComputer} alt="Mycomputer"/>
                                <input type="text" value={"C:\\Users\\niC\\"+title} readOnly />
                                <button className="sharebutton">
                                    <img src={GoIcon} alt="Go"></img>
                                    <p>Go</p>
                                </button>
                            </div>
                    <div className='windowcontent'>
                        <ul>
                            {file.map(((element, i) => {
                                if (title === "Blog") {
                                    return React.createElement(ChildComponent, { windowArray: this.props.windowArray, setWindowArray: this.props.setWindowArray, key: element.id, title: element.title, inFolder: [element.id] })
                                } else if (title === "member") {
                                    return React.createElement(ChildComponent, { windowArray: this.props.windowArray, setWindowArray: this.props.setWindowArray, key: title + i, title: element.title, inFolder: [title, i], thumbnail: element.picture.url })

                                } else {
                                    return React.createElement(ChildComponent, { windowArray: this.props.windowArray, setWindowArray: this.props.setWindowArray, key: title + i, title: element.title, inFolder: [title, i] })
                                }
                            }))
                            }
                        </ul>
                    </div>


                </Rnd>
            </div>

        );
    }
}

export default FolderItem