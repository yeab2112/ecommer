import react, { useState }  from "react"
import  axios from "axios"
function Post(){
  const[ post ,setpost]=useState({
    title:"",
    body:""
  })
  const handleinput=(event)=>{
setpost({...post ,[event.target.name]:event.target.value})
  }
  function handlesubmit(event) {
    event.preventDefault()
    // axios.post('https://jsonplaceholder.typeicode.come/posts',{post})
    // .then(res=>console.log(res))
    axios.post('https://localhost:3001/contact', {post})
    .then(response => {
      console.log(response.data); 
    })
    .catch(error => {
      console.error(error);
  })}
  return(
    <div>
        <form onSubmit={handlesubmit} >
            tile:<input  type="text" onChange={handleinput} name="title"/>
            post:<input  type="text" onChange={handleinput} name="body"/>
            <button>submit</button>
          </form>
    </div>
  )
  
}
export default Post;