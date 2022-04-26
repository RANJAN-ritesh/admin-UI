import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { EditData, multipleDelete, SearchItem, singleDelete } from "../redux/action"
import "../styles/adminUI.css"
import { EditMappedData } from "./editMappedData"
import { MappingData } from "./mappingData"
import { Pagination } from "./pagination"

export const AdminUI = ()=>{

 const [FetchedData,setFetchedData] = useState([])
 const [currentPage,setCurrentPage] = useState(1)
 const [dataPerPage] = useState(10)
 const [deleteItems,setDeleteItems] = useState([])
 const [name, setName] = useState("")
 const [email,setEmail] = useState("")
 const [role,setRole] = useState("")
 const [rendering,setRendering] = useState(false)
 const [searchInput,setSearchInput] = useState("")
 const [checkedToggle,setCheckedToggle] = useState(false)
 const dispatch = useDispatch()
 const AllDataFromRedux = useSelector((state)=>state.fetchedData)
 const [checked1,setChecked1] = useState(false);
 const [multipleDelete,setMultipleDelete] = useState({first:0 , second:10})
 const revealRef = useRef([])
 const revealRef2 = useRef([])
 const allRef = useRef()
 
 const addrefs = (el)=>{
     if(el && !revealRef.current.includes(el)){
         revealRef.current.push(el);
     }
    //  console.log(revealRef.current);
 }
 
 const addrefs2 = (el) =>{
     if(el && !revealRef2.current.includes(el)){
         revealRef2.current.push(el)
     }
 }
 const paginate = (pageNo) => setCurrentPage(pageNo);

    useEffect(()=>{
        setFetchedData(AllDataFromRedux)
    },[AllDataFromRedux,rendering])

    const LastDataObjectIndex = currentPage*dataPerPage
    const FirstDataObjectIndex = LastDataObjectIndex - dataPerPage
    const currentData = FetchedData.slice(FirstDataObjectIndex,LastDataObjectIndex)

function handleMultipleChange(change,id,_id){
//   let m = document.getElementById("some")
//   console.log("m",m)
    // console.log(itemss)
    // console.log(_id)
    revealRef.current[_id].style.backgroundColor = "whitesmoke"
    
    let status = change.target.checked
    let items = [...deleteItems]
    // console.log(status,id)
    // console.log(items)
    if(status === true){
        items.push(id)
    }else if(status === false && items.length > 0){
        for(let i = 0 ; i<items.length ;i++){
            if(items[i] === id){
                items[i] = "*"
            }
        }
    }
    setDeleteItems(items)
 
}

function handleSingleDelete(id){
    dispatch(singleDelete(id))
    revealRef.current.map((e)=>{
        e.style.backgroundColor = "white"
    })
    revealRef2.current.map((e)=>{
        e.checked = false
    })
 }
 
function handleDeleteMultiple(){
   deleteItems.map((e)=>{
    //    console.log(e)
       dispatch(singleDelete(e))
   })
   revealRef.current.map((e)=>{
    e.style.backgroundColor = "white"
   
})
revealRef2.current.map((e)=>{
    e.checked = false
})
allRef.current.checked = false
console.log("allRef",allRef.current.checked)
}

const [editData,setEditData] = useState(null)

const handleEditClick = (element)=>{
    setEditData(element.id);
  }

  function handleEditedData(element){
    const payload = {
        "id" : element.id,
        "name" : name != "" ? name : element.name ,
        "email" : email != "" ? email : element.email,
        "role" : role != "" ? role : element.role
    }
    // console.log(payload)
    let editedData = EditData(payload)
    dispatch(editedData)
    setEditData(null)
    setRendering(true)
}

function HandleSearchInput(){
    let searched = SearchItem(searchInput)
    dispatch(searched)
}

function DeleteAllPageItems(check){
    console.log(check)
    let first = multipleDelete.first
    let second = multipleDelete.second
  if(check === true){
      setChecked1(true)
      let items = [...deleteItems]
      console.log("fist",first,"sec",second)
      for(let i = first ;i<=second ; i++){
          items.push(i.toString())
      }
      setDeleteItems(items)
      let nfirst = first+10
      let nsecond = second+10
      setMultipleDelete({first:nfirst,second:nsecond})
  }else{
      setChecked1(false)
  }
  
}

    return(
        <div className="adminParentDiv">
            <div className="SearchDiv">
              <input type="text"  placeholder="Search by Name,Email or Role" onChange={(e)=>setSearchInput(e.target.value)}/>
              <button onClick={HandleSearchInput}>Search</button>
            </div>
            
            <div>
            <div className="TableHeadingDiv">
       
                <table>
                    <thead>
                        <tr className="TableHeadingRow">
                           <td><input type="checkbox" ref={allRef} checked={checked1}  onChange={(e)=>{ 
                           DeleteAllPageItems(e.target.checked)}}/><span style={{fontSize:"1rem",width:"2rem",color:"red"}}>(Select all)</span></td>
                           <td>Name</td>
                           <td>Email</td>
                           <td>Role</td>
                           <td>Actions</td>
                        </tr>
                    </thead>
                   </table>
                   </div>
                        {
                            currentData.map((element,i)=>
                                (
                                    <>
                                    
                                    {editData == element.id ?   
                                     (<EditMappedData element={element} handleEditedData={handleEditedData}
                                      setEmail={setEmail}
                                       setName={setName}
                                        setRole={setRole} /> ) :

                                     (<MappingData element={element}
                                      handleMultipleChange={handleMultipleChange}
                                      handleSingleDelete={handleSingleDelete}
                                       handleEditClick={handleEditClick}
                                      checkedToggle={checkedToggle}
                                      setCheckedToggle={setCheckedToggle}
                                      _id={i}
                                      addrefs={addrefs}
                                      addrefs2={addrefs2}
                                       />)}
                                    
                               </>
                                )
                               
                            )
                        }
                    
            </div>
            <div className="PaginationAndDeleteDiv">
            <button onClick={handleDeleteMultiple}>Delete Selected</button>
            <Pagination dataPerPage={dataPerPage} totalData={FetchedData.length} paginate={paginate} />
            </div>
            
        </div>
    )
}