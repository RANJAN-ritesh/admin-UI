import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { AdminUI } from './components/adminUI';
import { saveFetchedData } from './redux/action';

function App() {
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    const FetchData = ()=>{
       fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
       .then((res)=>res.json())
       .then((res)=>{
          //  console.log(res)
           dispatch(saveFetchedData(res))
           setLoading(false)
       })
       .catch((err)=>{console.log(err)
      setLoading(true)})
    }

    FetchData()

   },[])

  return (
    <div className="App">
      {
        loading ? 
        <h1 className='loading'>Loading Please Wait ....</h1>
        : <AdminUI/>
      }
      
    </div>
  );
}

export default App;
