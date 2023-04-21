import React, { useState, useEffect } from "react"
import Folder from "./Folder.js"
import File from "./File.js"
import axios from "axios"
import Window from "./Window.js"
import LogoImg from "../img/LogoImg.png"
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
      FromUrl2Window(response.data,null)
    }).catch(error => console.log(error))
    
    //eslint無効
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    axios.get(baseUrl + "blogs", { headers: headers }).then((response) => {
      setBlog(response.data)
      
      FromUrl2Window(null,response.data)
    }).catch(error => console.log(error))
    
    //eslint無効
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


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
    <div className="App" style={{ backgroundImage: `url(${LogoImg})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "30%" }}>
      {folderArray.map((element, i) => {
        return Array.isArray(element[1]) ? <Folder windowArray={windowArray} setWindowArray={setWindowArray} title={element[0]} file={element[1]} key={i} /> : <File windowArray={windowArray} setWindowArray={setWindowArray} title={element[0]} inFolder={false} key={i} />
      })}
      {windowArray.map((element, i) => {
        return <Window key={element.title + i + element.inFolder[0]} title={element.title} inFolder={element.inFolder} />
      })}

      <Folder windowArray={windowArray} setWindowArray={setWindowArray} title={"blog"} file={blog.contents} />
    </div>
  );

  function FromUrl2Window(post,blog) {
    const pathArr = window.location.pathname.split("/").filter((element)=>{
      return element!==""
    })
    if(pathArr.length === 1){
      setWindowArray([...windowArray,{title:decodeURI(pathArr[0]),inFolder:false}])
    }else if(pathArr.length === 2&&post!==null&&pathArr[0]!=="blog"){
      setWindowArray([...windowArray,{title:decodeURI(pathArr[1]),inFolder:[decodeURI(pathArr[0]),
        post[pathArr[0]].map((element)=>{
        return element.title === decodeURI(pathArr[1])
      }).indexOf(true)]}])
    }else if(pathArr.length === 2&&blog!==null&&pathArr[0]==="blog"){
      console.log()

      setWindowArray([...windowArray,{
        title:
        blog.contents.filter((element)=>{
        return element.id === pathArr[1]
      })[0].title,
       inFolder:[decodeURI(pathArr[1])]}])
    }else{
      //do nothing
    }
  }
  
}




export default App