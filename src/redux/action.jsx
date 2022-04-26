import { EDIT, SAVE_FETCHED_DATA, SEARCH_ITEM, SINGLE_DELETE } from "./actionTypes"

export const saveFetchedData=(payload)=>{
return{
    type:SAVE_FETCHED_DATA,
    payload
}
}

export const singleDelete = (payload)=>{
    return{
        type:SINGLE_DELETE,
        payload
    }
}

export const EditData = (payload)=>{
    return{
        type:EDIT,
        payload
    }
}

export const SearchItem = (payload)=>{
    return{
        type:SEARCH_ITEM,
        payload
    }
}