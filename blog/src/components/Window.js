import React, { Component } from "react"
import axios from "axios"
const baseUrl = "https://nitech-create.microcms.io/api/v1/others/"

const headers = {
    "X-MICROCMS-API-KEY": "38a97b930fe94fb181f45abfb215f4886c60"
}
class Window extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: null,
            text:props.text
        }
        axios.get(baseUrl, { headers: headers }).then((response) => {
            this.setState({ post: response.data })
        }).catch(error => console.log(error))
    }

    render() {
        if (!this.state.post) return null
        console.log(this.state.post)
        return (
            <div>
                <h2>{this.state.text}</h2>
                <div dangerouslySetInnerHTML={{__html: this.state.post[this.state.text]}}></div>
            </div>
        );
    }
}

export default Window