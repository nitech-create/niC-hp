import React, { useState, useEffect } from "react"
import Folder from "./Folder.js"
import File from "./File.js"
import axios from "axios"
import Window from "./Window.js"
import LogoImg from "../img/LogoImg.png"
import {Helmet} from "react-helmet"
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
      FromUrl2Window(response.data, null)
    }).catch(error => console.log(error))

    //eslint無効
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    axios.get(baseUrl + "blogs", { headers: headers }).then((response) => {
      setBlog(response.data)

      FromUrl2Window(null, response.data)
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
      <Helmet
      title="niC-HP"
      meta={[
        { name: 'twitter:card', content: 'summary' },
        { property: 'og:image', content: `url(${LogoImg})` },
        { property: 'og:title', content: 'niC-HP' },
        { property: 'og:description', content: 'nitechCreate 名工大生からなる団体のホームページです。' }
      ]}
      />
      {folderArray.map((element, i) => {
        return Array.isArray(element[1]) ? <Folder windowArray={windowArray} setWindowArray={setWindowArray} title={element[0]} file={element[1]} key={i} /> : <File windowArray={windowArray} setWindowArray={setWindowArray} title={element[0]} inFolder={false} key={i} />
      })}
      {windowArray.map((element, i) => {
        return <Window key={element.title + i + element.inFolder[0]} title={element.title} inFolder={element.inFolder} />
      })}

      <Folder windowArray={windowArray} setWindowArray={setWindowArray} title={"blog"} file={blog.contents} />
    </div>
  );

  function FromUrl2Window(post, blog) {
    
    const url =new URL(window.location.href)
    const params =new URLSearchParams(url.search)
    const pathArr = decodeURI(params.get("window")).split("/").filter((element) => {
      return element !== "" && element !== "null"
    })

  if(pathArr.length === 0){
    //do nothing
  }else if (pathArr.length < 3) {

      if (isFirstExist(pathArr[0], post, blog)) {
        if (pathArr.length === 1) {
          setWindowArray([...windowArray, { title: decodeURI(pathArr[0]), inFolder: false }]) 
        } else if (pathArr.length === 2 && post !== null && pathArr[0] !== "blog") {
          if(Array.isArray(post[pathArr[0]])){
            setWindowArray([...windowArray, {
              title: decodeURI(pathArr[1]), inFolder: [decodeURI(pathArr[0]),
              post[pathArr[0]].map((element) => {
                return element.title === decodeURI(pathArr[1])
              }).indexOf(true)]
            }])
          }else{
            setWindowArray([...windowArray, {
              title: null,
              inFolder: [window.location.path]
            }])
          }

        } else if (pathArr.length === 2 && blog !== null && pathArr[0] === "blog") {
          if (blog.contents.filter((element) => {
            return element.id === pathArr[1]
          })[0] === undefined) {


            setWindowArray([...windowArray, {
              title: null,
              inFolder: [decodeURI(pathArr[1])]
            }])

          } else {
            setWindowArray([...windowArray, {
              title:
                blog.contents.filter((element) => {
                  return element.id === pathArr[1]
                })[0].title,
              inFolder: [decodeURI(pathArr[1])]
            }])
          }
        } else {
          //do nothing
        }
      } else {
        setWindowArray([...windowArray, {
          title: null,
          inFolder: [window.location.path]
        }])
      }
    } else {
      setWindowArray([...windowArray, {
        title: null,
        inFolder: [window.location.path]
      }])
    }

  }

  function isFirstExist(path, post, blog) {
    if (post) {
      return post[path]
    } else if (blog) {
      return true
    }
  }

}

export default App