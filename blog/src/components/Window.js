import React, { Component } from "react"
import axios from "axios"
import { Rnd } from "react-rnd"
const baseUrl = "https://nitech-create.microcms.io/api/v1/others/"

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
            visible: true
        }
        axios.get(baseUrl, { headers: headers }).then((response) => {
            this.setState({ post: response.data })
        }).catch(error => console.log(error))
    }

    render() {
        if (this.state.visible) {
            const offsetHeight=500
            const offsetWidth=0
            if (!this.state.post) return null
            if (this.props.inFolder) {
                const blackList = ["fieldId"]
                const postObj = this.state.post[this.props.inFolder[0]][this.props.inFolder[1]]
                return (
                    <Rnd
                        className="window"
                        style={{ visibility: "visible", position: "fixed" }}
                        default={{x: Math.floor(Math.random()*(window.innerWidth/2-offsetWidth)), y: Math.floor(Math.random()*(window.innerHeight-offsetHeight)), width: 300, height: 300 }}
                        minHeight={300}
                        minWidth={300}
                        enableResizing={{ top: true, right: true, bottom: true, left: true, topRight: true, bottomRight: true, bottomLeft: false, topLeft: true }}
                    >

                        <div >
                            <button className="deletebutton" type='button' onClick={() => {
                                this.setState({ visible: false })
                            }}>Delete</button>
                            <h2>{this.state.title} {String(this.props.inFolder)}</h2>
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

                    </Rnd>
                )
            } else {
                return (

                    <Rnd
                        className="window"
                        style={{ visibility: "visible", position: "fixed" }}
                        default={{ x: Math.floor(Math.random()*(window.innerWidth/2-offsetWidth)), y: Math.floor(Math.random()*(window.innerHeight-offsetHeight)), width: 300, height: 300 }}
                        enableResizing={{ top: true, right: true, bottom: true, left: true, topRight: true, bottomRight: true, bottomLeft: false, topLeft: true }}
                
                        minHeight={300}
                        minWidth={300}
                    >

                        <div >
                            <button className="deletebutton" type='button' onClick={() => {
                                this.setState({ visible: false })
                            }}>Delete</button>
                            <h2>{this.state.title} {String(this.props.inFolder)}</h2>
                            <div dangerouslySetInnerHTML={{ __html: this.state.post[this.state.title] }}></div>
                        </div>

                    </Rnd>

                )
            }
        } else {
            return null
        }
    }
}

export default Window