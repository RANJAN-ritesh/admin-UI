import { useState } from "react"

export const MappingData = ({element,handleMultipleChange,handleSingleDelete,handleEditClick,checkedToggle,setCheckedToggle,_id,addrefs,addrefs2})=>{
    // let [toggle,setToggle] = useState(false)
    return(
        <div className="FetchedDataDiv" >
        <table>
        <tbody>
        <tr className="FetchedDataRow" ref={addrefs}>
        <td><input type="checkbox"  ref={addrefs2}   onChange={(change)=>{
            // setCheckedToggle(true)
            handleMultipleChange(change,element.id,_id)
         
           }}/></td>
        <td  >{element.name}</td>
        <td>{element.email}</td>
        <td>{element.role}</td>
        <td>
            <div onClick={()=>handleEditClick(element)}><img src="https://img.icons8.com/external-tanah-basah-detailed-outline-tanah-basah/48/000000/external-edit-user-interface-tanah-basah-detailed-outline-tanah-basah.png" alt=""/></div>
            <div onClick={()=>handleSingleDelete(element.id)}><img src="https://img.icons8.com/fluency-systems-regular/48/000000/filled-trash.png" alt=""/></div>
        </td>
    </tr>
    </tbody>
    </table>
    </div>
    )
}