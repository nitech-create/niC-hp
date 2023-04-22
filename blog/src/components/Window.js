import React, { Component } from "react"
import axios from "axios"
import { Rnd } from "react-rnd"
import CloseIcon from "../img/CloseIcon.svg"
import FullScreenIcon from "../img/FullScreen.svg"
import NormalScreenIcon from "../img/NormalScreen.svg"
import FileIcon from "../img/FileIcon.png"
import InternetIcon from "../img/Internet.png"
import Share from "../img/Share.png"
const baseUrl = "https://nitech-create.microcms.io/api/v1/"

const headers = {
    "X-MICROCMS-API-KEY": "38a97b930fe94fb181f45abfb215f4886c60"
}
class Window extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: null,
            title: props.title,
            inFolder: props.inFolder,
            visible: true,
            zIndex: window.zIndex
        }
        if (this.props.inFolder.length === 2 || this.props.inFolder.length === undefined) {
            axios.get(baseUrl + "others", { headers: headers }).then((response) => {
                this.setState({ post: response.data })
            }).catch(error => console.log(error))
        } else if (this.props.inFolder.length === 1) {
            axios.get(baseUrl + "blogs", { headers: headers }).then((response) => {
                this.setState({ post: response.data })
            }).catch(error => console.log(error))
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
        this.rnd.updateSize({ width: this.rnd.props.default.width, height: this.rnd.props.default.height })
        this.rnd.updatePosition({ x: Math.random() * (window.innerWidth - 500), y: Math.random() * (window.innerHeight - 500) })
        this.setState({ fullScreen: false })
    }
    isExist(title, inFolder) {

        if (inFolder.length === 2) {
            if (this.state.post[this.state.inFolder[0]].filter((element) => {
                return element.title === this.state.title
            }).length === 0) {
                return false
            } else {
                return true
            }
        } else if (inFolder.length === 1) {
            return title
        } else {
            if (typeof this.state.post[this.state.title][0] === "object") {
                return false
            } else {
                return this.state.post[this.state.title]
            }
        }
    }

    render() {
        if (this.state.visible) {
            const offsetHeight = 500
            const offsetWidth = 0
            if (!this.state.post) return null
            if (this.props.inFolder.length === 2) {
                const blackList = ["fieldId", "title"]
                const postObj = this.state.post[this.props.inFolder[0]][this.props.inFolder[1]]
                if (this.isExist(this.state.title, this.state.inFolder)) {
                    return (
                        <div>

                            <Rnd ref={c => { this.rnd = c }}
                                className="window"
                                style={{ zIndex: this.state.zIndex, visibility: "visible", position: "fixed" }}
                                default={{ x: Math.floor(Math.random() * (window.innerWidth / 2 - offsetWidth)), y: Math.floor(Math.random() * (window.innerHeight / 2 - offsetHeight)), width: "400", height: "300" }}
                                minHeight={300}
                                minWidth={300}
                                enableResizing={{ top: true, right: true, bottom: true, left: true, topRight: true, bottomRight: true, bottomLeft: false, topLeft: true }}
                                onClick={this.onClick}
                                onResizeStart={this.onClick}
                                bounds={"window"}
                                cancel=".windowcontent,.windowurl"
                            >
                                <div className='topframe'>
                                    <div className='topframeleft'>
                                        <img src={FileIcon} alt="foldericon" />
                                        <p>{this.state.title}</p>
                                    </div>
                                    <div>

                                        {!this.state.fullScreen ?
                                            <button className='screenbutton' type='button' onClick={() => {
                                                this.fullScreen()
                                            }}
                                                onTouchStart={() => {
                                                    this.fullScreen()
                                                }}><img src={FullScreenIcon} alt="FullScreenIcon" /></button>

                                            :

                                            <button className='screenbutton' type='button' onClick={() => {
                                                this.normalScreen()
                                            }}
                                                onTouchStart={() => {
                                                    this.normalScreen()
                                                }}><img src={NormalScreenIcon} alt="NormalScreenIcon" /></button>}
                                        <button className='deletebutton' type='button' onClick={() => {
                                            this.setState({ visible: false })
                                        }}
                                            onTouchStart={() => {
                                                this.setState({ visible: false })
                                            }}><img src={CloseIcon} alt="CloseIcon" /></button>
                                    </div>
                                </div>
                                <div className="windowurl">
                                    <p style={{ color: "gray" }}>Address</p>
                                    <img src={InternetIcon} alt="InternetIcon" />
                                    <input size={1} type="text" value={"https://nitech-create.com/?window=" + this.props.inFolder[0] + "/" + encodeURI(this.state.title)} readOnly />
                                    <button className="sharebutton" onClick={() => {
                                        window.open(encodeURI("http://twitter.com/intent/tweet?url=https://nitech-create.com/?window=" + this.props.inFolder[0] + "/" + encodeURI(this.state.title)))
                                    }}>
                                        <img src={Share} alt="shareImg" />
                                        <p>Share</p>
                                    </button>
                                </div>
                                <div className="windowcontent">
                                    <div className="postcontent">
                                        <div className="windowinnner">
                                            <h1>{this.state.title}</h1>
                                            {Object.keys(postObj).filter((item) => {
                                                return !blackList.includes(item)
                                            }).map((element, i) => {
                                                if (postObj[element] !== null && typeof postObj[element] === 'object') {
                                                    return React.createElement("div", { key: i }, <img src={postObj[element].url} alt="profile"></img>)
                                                } else {
                                                    return React.createElement("div", { key: i }, <div dangerouslySetInnerHTML={{ __html: postObj[element] }}></div>)
                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>

                            </Rnd>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <Rnd ref={c => { this.rnd = c }}
                                className="window"
                                style={{ zIndex: this.state.zIndex, visibility: "visible", position: "fixed" }}
                                default={{ x: Math.floor(Math.random() * (window.innerWidth / 2 - offsetWidth)), y: Math.floor(Math.random() * (window.innerHeight / 2 - offsetHeight)), width: 400, height: 300 }}
                                enableResizing={{ top: true, right: true, bottom: true, left: true, topRight: true, bottomRight: true, bottomLeft: false, topLeft: true }}
                                minHeight={300}
                                minWidth={300}
                                onClick={this.onClick}
                                onResizeStart={this.onClick}
                                bounds={"window"}
                                cancel=".windowcontent,.windowurl"
                            >
                                <div className='topframe'>
                                    <div className='topframeleft'>
                                        <img src={FileIcon} alt="foldericon" />
                                        <p>{this.state.title}</p>
                                    </div>
                                    <div className="topframeright">
                                        <button className='deletebutton' type='button' onClick={() => {
                                            this.setState({ visible: false })
                                        }}
                                            onTouchStart={() => {
                                                this.setState({ visible: false })
                                            }}><img src={CloseIcon} alt="CloseIcon" /></button>

                                    </div>
                                </div>
                                <div className="windowurl">
                                    <p style={{ color: "gray" }}>Address</p>
                                    <img src={InternetIcon} alt="InternetIcon" />
                                    <input size={1} type="text" value={window.location.href} readOnly />
                                    <button className="sharebutton" onClick={() => {
                                    }}>
                                        <img src={Share} alt="shareImg" />
                                        <p>Share</p>
                                    </button>
                                </div>
                                <div className="windowcontent">
                                    <div className="postcontent">
                                        <div className="windowinnner">
                                            <h1>ERROR 404 Not Found</h1>
                                            <p>https://nitech-create.com/?window={this.state.inFolder[0] + "/" + encodeURI(this.state.title)} は見つかりませんでした。</p>
                                            <p>URLを確認してください。</p>
                                        </div>
                                    </div>
                                </div>
                            </Rnd>

                        </div>
                    )

                }
            } else if (this.props.inFolder.length === 1) {
                if (this.isExist(this.state.title, this.state.inFolder)) {
                    return (
                        <div>

                            <Rnd ref={c => { this.rnd = c }}
                                className="window"
                                style={{ zIndex: this.state.zIndex, visibility: "visible", position: "fixed" }}
                                default={{ x: Math.floor(Math.random() * (window.innerWidth / 2 - offsetWidth)), y: Math.floor(Math.random() * (window.innerHeight / 2 - offsetHeight)), width: "400", height: "300" }}
                                minHeight={300}
                                minWidth={300}
                                enableResizing={{ top: true, right: true, bottom: true, left: true, topRight: true, bottomRight: true, bottomLeft: false, topLeft: true }}
                                onClick={this.onClick}
                                onResizeStart={this.onClick}
                                resizeHandleClasses={{
                                    bottom: "resizeHandle",
                                    bottomLeft: "resizeHandle",
                                    bottomRight: "resizeHandle",
                                    left: "resizeHandle",
                                    right: "resizeHandle",
                                    top: "resizeHandle",
                                    topLeft: "resizeHandle",
                                    topRight: "resizeHandle",
                                }}
                                bounds={"window"}
                                cancel=".windowcontent,.windowurl"
                            >
                                <div className='topframe'>
                                    <div className='topframeleft'>
                                        <img src={FileIcon} alt="foldericon" />
                                        <p>{this.state.title}</p>
                                    </div>
                                    <div className="topframeright">
                                        {!this.state.fullScreen ?
                                            <button className='screenbutton' type='button' onClick={() => {
                                                this.fullScreen()
                                            }}
                                                onTouchStart={() => {
                                                    this.fullScreen()
                                                }}><img src={FullScreenIcon} alt="FullScreenIcon" /></button>

                                            :

                                            <button className='screenbutton' type='button' onClick={() => {
                                                this.normalScreen()
                                            }}
                                                onTouchStart={() => {
                                                    this.normalScreen()
                                                }}><img src={NormalScreenIcon} alt="NormalScreenIcon" /></button>}
                                        <button className='deletebutton' type='button' onClick={() => {
                                            this.setState({ visible: false })
                                        }}
                                            onTouchStart={() => {
                                                this.setState({ visible: false })
                                            }}><img src={CloseIcon} alt="CloseIcon" /></button>

                                    </div>
                                </div>
                                <div className="windowurl">
                                    <p style={{ color: "gray" }}>Address</p>
                                    <img src={InternetIcon} alt="InternetIcon" />
                                    <input size={1} type="text" value={"https://nitech-create.com/?window=blog/" + encodeURI(this.props.inFolder[0])} readOnly />
                                    <button className="sharebutton" onClick={() => {
                                        window.open("http://twitter.com/intent/tweet?url=https://nitech-create.com/?window=blog/" + encodeURI(this.props.inFolder[0]))
                                    }}>
                                        <img src={Share} alt="shareImg" />
                                        <p>Share</p>
                                    </button>
                                </div>
                                <div className="windowcontent">
                                    <div className="postcontent">
                                        <div className="windowinnner">
                                            <h1>{this.state.title}</h1>
                                            <div dangerouslySetInnerHTML={{
                                                __html: this.state.post.contents.filter((element) => {
                                                    return element.id === this.props.inFolder[0]
                                                })[0].content
                                            }}></div>
                                        </div>
                                    </div>

                                </div>

                            </Rnd>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <Rnd ref={c => { this.rnd = c }}
                                className="window"
                                style={{ zIndex: this.state.zIndex, visibility: "visible", position: "fixed" }}
                                default={{ x: Math.floor(Math.random() * (window.innerWidth / 2 - offsetWidth)), y: Math.floor(Math.random() * (window.innerHeight / 2 - offsetHeight)), width: 400, height: 300 }}
                                enableResizing={{ top: true, right: true, bottom: true, left: true, topRight: true, bottomRight: true, bottomLeft: false, topLeft: true }}
                                minHeight={300}
                                minWidth={300}
                                onClick={this.onClick}
                                onResizeStart={this.onClick}
                                bounds={"window"}
                                cancel=".windowcontent,.windowurl"
                            >
                                <div className='topframe'>
                                    <div className='topframeleft'>
                                        <img src={FileIcon} alt="foldericon" />
                                        <p>blog</p>
                                    </div>
                                    <div className="topframeright">
                                        <button className='deletebutton' type='button' onClick={() => {
                                            this.setState({ visible: false })
                                        }}
                                            onTouchStart={() => {
                                                this.setState({ visible: false })
                                            }}><img src={CloseIcon} alt="CloseIcon" /></button>

                                    </div>
                                </div>
                                <div className="windowurl">
                                    <p style={{ color: "gray" }}>Address</p>
                                    <img src={InternetIcon} alt="InternetIcon" />
                                    <input size={1} type="text" value={window.location.href} readOnly />
                                    <button className="sharebutton" onClick={() => {
                                    }}>
                                        <img src={Share} alt="shareImg" />
                                        <p>Share</p>
                                    </button>
                                </div>
                                <div className="windowcontent">
                                    <div className="postcontent">
                                        <div className="windowinnner">
                                            <h1>ERROR 404 Not Found</h1>
                                            <p>https://nitech-create.com{window.location.pathname} は見つかりませんでした。</p>
                                            <p>URLを確認してください。</p>
                                        </div>
                                    </div>
                                </div>
                            </Rnd>

                        </div>
                    )
                }
            } else {
                if (this.isExist(this.state.title, this.state.inFolder)) {
                    return (
                        <div>

                            <Rnd ref={c => { this.rnd = c }}
                                className="window"
                                style={{ zIndex: this.state.zIndex, visibility: "visible", position: "fixed" }}
                                default={{ x: Math.floor(Math.random() * (window.innerWidth / 2 - offsetWidth)), y: Math.floor(Math.random() * (window.innerHeight / 2 - offsetHeight)), width: 400, height: 300 }}
                                enableResizing={{ top: true, right: true, bottom: true, left: true, topRight: true, bottomRight: true, bottomLeft: false, topLeft: true }}
                                minHeight={300}
                                minWidth={300}
                                onClick={this.onClick}
                                onResizeStart={this.onClick}
                                bounds={"window"}
                                cancel=".windowcontent,.windowurl"
                            >
                                <div className='topframe'>
                                    <div className='topframeleft'>
                                        <img src={FileIcon} alt="foldericon" />
                                        <p>{this.state.title}</p>
                                    </div>
                                    <div className="topframeright">
                                        {!this.state.fullScreen ?
                                            <button className='screenbutton' type='button' onClick={() => {
                                                this.fullScreen()
                                            }}
                                                onTouchStart={() => {
                                                    this.fullScreen()
                                                }}><img src={FullScreenIcon} alt="FullScreenIcon" /></button>

                                            :

                                            <button className='screenbutton' type='button' onClick={() => {
                                                this.normalScreen()
                                            }}
                                                onTouchStart={() => {
                                                    this.normalScreen()
                                                }}><img src={NormalScreenIcon} alt="NormalScreenIcon" /></button>}
                                        <button className='deletebutton' type='button' onClick={() => {
                                            this.setState({ visible: false })
                                        }}
                                            onTouchStart={() => {
                                                this.setState({ visible: false })
                                            }}><img src={CloseIcon} alt="CloseIcon" /></button>

                                    </div>
                                </div>
                                <div className="windowurl">
                                    <p style={{ color: "gray" }}>Address</p>
                                    <img src={InternetIcon} alt="InternetIcon" />
                                    <input size={1} type="text" value={"https://nitech-create.com/?window=" + encodeURI(this.state.title)} readOnly />
                                    <button className="sharebutton" onClick={() => {
                                        window.open("http://twitter.com/intent/tweet?url=https://nitech-create.com/?window=" + encodeURI(this.state.title))
                                    }}>
                                        <img src={Share} alt="shareImg" />
                                        <p>Share</p>
                                    </button>
                                </div>
                                <div className="windowcontent">
                                    <div className="postcontent">
                                        <div className="windowinnner">
                                            <h1>{this.state.title}</h1>
                                            <div dangerouslySetInnerHTML={{ __html: this.state.post[this.state.title] }}></div>
                                        </div>
                                    </div>
                                </div>
                            </Rnd>

                        </div>
                    )
                } else {
                    return (
                        <div>
                            <Rnd ref={c => { this.rnd = c }}
                                className="window"
                                style={{ zIndex: this.state.zIndex, visibility: "visible", position: "fixed" }}
                                default={{ x: Math.floor(Math.random() * (window.innerWidth / 2 - offsetWidth)), y: Math.floor(Math.random() * (window.innerHeight / 2 - offsetHeight)), width: 400, height: 300 }}
                                enableResizing={{ top: true, right: true, bottom: true, left: true, topRight: true, bottomRight: true, bottomLeft: false, topLeft: true }}
                                minHeight={300}
                                minWidth={300}
                                onClick={this.onClick}
                                onResizeStart={this.onClick}
                                bounds={"window"}
                                cancel=".windowcontent,.windowurl"
                            >
                                <div className='topframe'>
                                    <div className='topframeleft'>
                                        <img src={FileIcon} alt="foldericon" />
                                        <p>{this.state.title}</p>
                                    </div>
                                    <div className="topframeright">
                                        <button className='deletebutton' type='button' onClick={() => {
                                            this.setState({ visible: false })
                                        }}
                                            onTouchStart={() => {
                                                this.setState({ visible: false })
                                            }}><img src={CloseIcon} alt="CloseIcon" /></button>

                                    </div>
                                </div>
                                <div className="windowurl">
                                    <p style={{ color: "gray" }}>Address</p>
                                    <img src={InternetIcon} alt="InternetIcon" />
                                    <input size={1} type="text" value={"https://nitech-create.com/?window=" + encodeURI(this.state.title)} readOnly />
                                    <button className="sharebutton" onClick={() => {
                                    }}>
                                        <img src={Share} alt="shareImg" />
                                        <p>Share</p>
                                    </button>
                                </div>
                                <div className="windowcontent">
                                    <div className="postcontent">
                                        <div className="windowinnner">
                                            <h1>ERROR 404 Not Found</h1>
                                            <p>https://nitech-create.com/?window={encodeURI(this.state.title)} は見つかりませんでした。</p>
                                            <p>URLを確認してください。</p>
                                        </div>
                                    </div>
                                </div>
                            </Rnd>

                        </div>
                    )
                }
            }
        } else {
            return null
        }
    }
}

export default Window