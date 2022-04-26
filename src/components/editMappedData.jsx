import { useState } from "react"
import { useDispatch } from "react-redux"
import { edit, editData } from "../redux/action"

export const EditMappedData = ({element,handleEditedData,setEmail,setName,setRole}) => {
    // console.log(element.id,"from edit data")

    // const dispatch = useDispatch()

    return(
        <div className="FetchedDataDiv">
        <table>
        <tbody>
<tr className="FetchedDataRow">
    <td><input type="checkbox" /></td>
    <td><input type="text" className="editInput" placeholder="Enter a Name" onChange={(e)=>setName(e.target.value)} /></td>
    <td><input type="text" className="editInput" placeholder="Enter an Email" onChange={(e)=>setEmail(e.target.value)} /></td>
    <td><input type="text" className="editInput" placeholder="Enter a Role" onChange={(e)=>setRole(e.target.value)} /></td>
    <td><button className="editBtn" onClick={()=>handleEditedData(element)}>EDIT</button></td>
</tr>
</tbody>
</table>
</div>
    )
}