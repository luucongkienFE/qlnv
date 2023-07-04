import React, { useEffect, useState } from "react";


function Rating() {
    const [data,setData] = useState(0)
    useEffect(()=>{
    },[data])
    return(
        <div >
            <input style={{width:"90%"}} type="range" min="0" max="100" step="5" value={data} onChange={(e)=>setData(e.target.value)} />
        </div>
    );
}
export default Rating;