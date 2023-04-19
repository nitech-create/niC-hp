import React, { useState, useEffect } from "react"
import Folder from "./Folder.js"
import File from "./File.js"
import axios from "axios"
import Window from "./Window.js"
const headers = {
  "X-MICROCMS-API-KEY": "38a97b930fe94fb181f45abfb215f4886c60"
}
const baseUrl = "https://nitech-create.microcms.io/api/v1/"


function App() {
  const [windowArray, setWindowArray] = useState([])
  const [blog, setBlog] = useState(null)
  const [post, setPost] = useState(null)
  useEffect(() => {
    axios.get(baseUrl + "others", { headers: headers }).then((response) => {
      setPost(response.data)
    }).catch(error => console.log(error))
  }, [])

  useEffect(() => {
    axios.get(baseUrl + "blogs", { headers: headers }).then((response) => {
      setBlog(response.data)
    }).catch(error => console.log(error))
  },[])
  

  if (!post) return null
  if (!blog) return null
  var folderArray = Object.entries(post)
  const itemBlackList = ["createdAt", "publishedAt", "revisedAt", "updatedAt"]
  folderArray = folderArray.filter((item) => {
    if (itemBlackList.includes(item[0])) {
      return false
    } else {
      return true
    }
  })

  return (
    <div className="App">
      <h1>Hello React</h1>
      {folderArray.map((element, i) => {
        return Array.isArray(element[1]) ? <Folder windowArray={windowArray} setWindowArray={setWindowArray} title={element[0]} file={element[1]} key={i} /> : <File title={element[0]} inFolder={false} key={i} />
      })}
      {windowArray.map((element, i) => {
        return <Window key={element.title + i + element.inFolder[0]} title={element.title} inFolder={element.inFolder} />
      })}

      <Folder windowArray={windowArray} setWindowArray={setWindowArray} title={"Blog"} file={blog.contents} />
    </div>
  );
}

export default App