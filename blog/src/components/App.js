import React, {useState,useEffect} from "react"
import Folder from "./Folder.js"
import axios from "axios"

const headers={
  "X-MICROCMS-API-KEY":"38a97b930fe94fb181f45abfb215f4886c60"
}
const baseUrl="https://nitech-create.microcms.io/api/v1/others"


function App() {
  const [post, setPost] = useState(null)
  useEffect(()=>{
      axios.get(baseUrl,{headers:headers}).then((response)=>{
          setPost(response.data)
      }).catch(error => console.log(error))
  },[])

  if (!post) return null
  var folderArray = Object.entries(post)
  const itemBlackList=["createdAt","publishedAt","revisedAt","updatedAt"]
  folderArray=folderArray.filter((item)=>{
    if(itemBlackList.includes(item[0])){
      return false
    }else{
      return true
    }
  })
  console.log(folderArray)
  const data = folderArray.map(element => element[0])

  return (
    <div className="App">
      <h1>Hello React</h1>
      <Folder data={data} />
    </div>
  );
}

export default App;