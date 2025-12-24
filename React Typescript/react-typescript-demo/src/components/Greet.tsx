type GreetProps={
    name:string
    age:number
    isloggedin:boolean
}
export const Greet= (props:GreetProps) =>{
    return(
        <div>
            <h2>
                {props.isloggedin ? ' Welcome ${props.name}! ' : 'Welcome Guest!'}
                </h2>
            <p>age:{props.age}</p>
        </div>
    )
}
