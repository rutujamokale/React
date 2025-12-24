type StatusProps={
    status:string
}
export const Status=(props:StatusProps)=>{
    let message;
    if(props.status==="loading"){
        message="Loading..."
    }
    else if(props.status==="success"){
        message="data fetch sucessfully"    
    }else if(props.status==="error"){
        message="Error fetching data"
    }
    return(
        <div>
            
            <h2>status -{message}</h2>
        </div>
    )
}