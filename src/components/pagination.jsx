import React, { useState } from 'react'

export const Pagination = ({dataPerPage,totalData,paginate}) => {
  let [toggle,setToggle] = useState(true)
  let [no,setNo] = useState(1)
  let totalPage = Math.ceil(totalData / dataPerPage)
  // console.log("total pages",totalPage)
    const pageNo = [];
    for(let i = 1; i<= Math.ceil(totalData / dataPerPage);i++){
        pageNo.push(i)
    }
    // console.log("page no ",no)
  return (
    <div className='PaginationParent'>
    <button className='paginateBtns' onClick={()=>{paginate(1)
    setNo(1)}}>First</button>
    <button  className='paginateBtns' onClick={()=>{if(no > 1){
      paginate(no-1)
      setNo((no)=>no - 1)
      console.log(no)}

      if(no === 1){
        setNo((no)=>no+1)
      }
    }}>Prev.</button>
    <div className="PaginationDiv">
          {pageNo.map((e)=>{
            return ( <div >
                  <button className="PageNumbersDiv"  onClick={()=>{
                    
                    paginate(e)
                    setNo(e)
                  setToggle(true ? false : true)}}>
                      {e}
                  </button>
                  </div>
              )
          })}
          </div>
      <button  className='paginateBtns'  onClick={()=>{
        if(no < totalPage){
     
      // console.log(no)
      paginate(no+1)
      setNo((no)=> no + 1)
      console.log(no)}

      if(no === totalPage){
      setNo((no=>no-1))
    }

    }
   }>Next</button>
   <button  className='paginateBtns' onClick={()=>{paginate(totalPage)
   setNo(totalPage)}}>Last</button>
    </div>
  )
}
