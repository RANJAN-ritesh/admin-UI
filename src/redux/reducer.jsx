import { EDIT, MULTIPLE_DELETE, SAVE_FETCHED_DATA, SEARCH_ITEM, SINGLE_DELETE } from "./actionTypes"

const initState = {
  fetchedData:[]
}
export const reducer = (state = initState , {type,payload})=>{
 switch(type){
     case SAVE_FETCHED_DATA:{
         return{
             ...state,
             fetchedData:payload
         }
     }
     case SINGLE_DELETE:{
         return{
              ...state,
              fetchedData:state.fetchedData.filter((e)=>e.id !== payload)
         }
     }
   
     case EDIT:{
        let narr = []
         function editing(){
             
            state.fetchedData.map((e)=>{
                // console.log(payload.id,e.id)
                if(e.id == payload.id){
                   e = payload
                }
                narr.push(e)
            })
         }
         editing()
         return{
             ...state,
             fetchedData:narr
         }
     }
     case SEARCH_ITEM:{
         let narr = []

         function searching(){
             
            state.fetchedData.map((e)=>{
                if(payload.toUpperCase() == e.name.toUpperCase() || payload.toUpperCase() == e.email.toUpperCase() || payload.toUpperCase() == e.role.toUpperCase()){
                    narr.push(e)
                }else if(payload.toUpperCase() == e.name.split(" ")[0].toUpperCase() ){
                    narr.push(e)
                }else if(payload.toUpperCase() == e.name.split(" ")[1].toUpperCase() ){
                    narr.push(e)
                }
            })
         }
         searching()
         return{
             ...state,
             fetchedData:narr
         }
     }
     default:
        return state;
 }
}