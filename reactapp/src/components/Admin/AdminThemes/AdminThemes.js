import React, {  useRef, useState } from 'react'
import AdminNavigation from '../AdminNavigation/AdminNavigation'
import AddTheme from './AddTheme'
import Themes from "./Theme"
import EditTheme from "./EditTheme"
import { useEffect } from 'react'
import axios from 'axios'
import Preloader from '../AdminGifts/Preloader'
import { useAuthenticationAdmin } from '../../Routing/routing'

const AdminThemes = () => {
  useAuthenticationAdmin()
  const themeId = ['enterThemeName','enterThemePrice','enterThemeDescription','ADD']

 const themeDelete= (id) =>{
  const filteredThemes  = themesContainer.filter((theme)=> theme.themeId !== id);
  setThemes(filteredThemes)
  setThemesContainer(filteredThemes)
<<<<<<< HEAD
  axios.delete(`https://8080-dcbafaeadabbbccbebafcdcbccefeddcbcbaffb.project.examly.io/deleteTheme/${id}`,{
=======
  axios.delete(`https://8080-bdedccbceacfdedbebafcdcbccefeddcbcbaffb.project.examly.io/deleteTheme/${id}`,{
>>>>>>> b6722a79642f1576f3d410b9f6825133a3ada782
    "themeId": id
  }).then(response=>{
    console.log(response);
  })
}

const searchQuery = useRef(null)
const [search, setSearch] = useState("")
const searchHandler = (e) =>{
  // setSearch(searchQuery.current.value)
  setSearch(e.target.value)
  const term = searchQuery.current.value
  console.log(term)

  setTimeout(()=>{
    performSearch(term)
  },500)

}

const [beingUpdate, setBeingUpdate] = useState(null)
const [addOrUpdate, setAddOrUpdate] = useState(true)

const editTheme = (editTheme) =>{
  const theme = {
    "themeId" : editTheme.themeId,
    "themeName" : editTheme.themeName,
    "themePrice" : editTheme.themePrice,
    "themeDetails" : editTheme.themeDetails
  }
  // const filteredLists = themesContainer.filter(theme=> theme.themeId !== editTheme.themeId)
  // const newLists = [...filteredLists, theme];
  // setThemes(newLists)
  // setThemesContainer(newLists)
  console.log(theme)
  setBeingUpdate(theme)
  console.log(beingUpdate)
  setAddOrUpdate(false)
}

 
  

const updateCompleted = (theme,bool) =>{

<<<<<<< HEAD
  axios.put(`https://8080-dcbafaeadabbbccbebafcdcbccefeddcbcbaffb.project.examly.io/editTheme/${theme.themeId}`,
=======
  axios.put(`https://8080-bdedccbceacfdedbebafcdcbccefeddcbcbaffb.project.examly.io/editTheme/${theme.themeId}`,
>>>>>>> b6722a79642f1576f3d410b9f6825133a3ada782
  {
    "themeId" : theme.themeId,
    "themeName" : theme.themeName,
    "themePrice" : theme.themePrice,
    "themeDetails" : theme.themeDetails
  }).then(()=>{
<<<<<<< HEAD
    axios.get("https://8080-dcbafaeadabbbccbebafcdcbccefeddcbcbaffb.project.examly.io/admin/getTheme")
=======
    axios.get("https://8080-bdedccbceacfdedbebafcdcbccefeddcbcbaffb.project.examly.io/admin/getTheme")
>>>>>>> b6722a79642f1576f3d410b9f6825133a3ada782
    .then(response=>{
      setThemes(response.data.themes)
      setThemesContainer(response.data.themes)
      console.log(response)
    })
  })


setAddOrUpdate(bool)
}
 const performSearch = (search) =>{
    const searchThemes = themesContainer.filter((theme)=>theme.themeName.toLowerCase().includes(search.toLowerCase()));
    setThemes(searchThemes);
}

 const themeAdd = (name, price, description) =>{
        const theme = {
          "themeName" : name,
          "themePrice" : price,
          "themeDetails" : description
        }
      
       
<<<<<<< HEAD
        axios.post("https://8080-dcbafaeadabbbccbebafcdcbccefeddcbcbaffb.project.examly.io/admin/addTheme",{
=======
        axios.post("https://8080-bdedccbceacfdedbebafcdcbccefeddcbcbaffb.project.examly.io/admin/addTheme",{
>>>>>>> b6722a79642f1576f3d410b9f6825133a3ada782
          "ThemeName" : name,
          "ThemePrice" : price,
          "ThemeDetails" : description
        })
        .then(response=>{
          console.log(response)
          const updatedThemes = [...themes, response.data.theme]
            setThemes(updatedThemes)
            setThemesContainer(updatedThemes)
        })
 }

  const [themes, setThemes] = useState([])
 const [themesContainer, setThemesContainer] = useState(null)
 const serachstyle={width: '70%',
  padding: '10px',
  border: '1px solid #ccc',
  'border-radius': '10px',
  'margin-top':'10px'
  }
 
  useEffect(()=>{
<<<<<<< HEAD
    axios.get("https://8080-dcbafaeadabbbccbebafcdcbccefeddcbcbaffb.project.examly.io/admin/getTheme")
=======
    axios.get("https://8080-bdedccbceacfdedbebafcdcbccefeddcbcbaffb.project.examly.io/admin/getTheme")
>>>>>>> b6722a79642f1576f3d410b9f6825133a3ada782
    .then(response=>{
      setThemes(response.data.themes)
      setThemesContainer(response.data.themes)
      console.log(response)
    })
  },[])

  if(!themes){
    return <Preloader/>
  }
  return (
    <div>
      <AdminNavigation active = 'themes'/>
      <div className='adminTheme-wrapper'>
      <div className='theme-wrapper'>
      <div className='form-input'>
        <input type="text" value= {search} ref = {searchQuery} onInput = {searchHandler} placeholder="Type here to search theme" style={serachstyle}/>
        <button style={{'marginLeft':'10px'}}>SEARCH</button>
      </div>
    {themes.length === 0 ? <p style={{'textAlign':'center','margin':'10px', 'fontSize':'1.5rem'}}>No themes found</p> : ( 
     themes.map((theme,index)=>{
        return(
          <Themes key = {theme.themeId} id = {theme.themeId} onDelete = {themeDelete} themes = {theme} editThemeHandler = {editTheme}/>
        )
      })
     
    )}
      </div>
      <div className='addTheme-container'>
      {addOrUpdate ? (
      <AddTheme themeId = {themeId} onAddOrUpdate = {themeAdd}/>
      ) : ( <EditTheme editTheme= {editTheme} backToHome = {updateCompleted} updatedValue = {beingUpdate}/>)
    }
      </div>
      </div>
    </div>
  )
}

export default AdminThemes
