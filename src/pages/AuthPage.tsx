import {useState} from "react";import {auth} from "../firebase";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
export default function AuthPage(){const[email,setEmail]=useState("");const[password,setPassword]=useState("");
return(<div><h2>Nexus Social Login</h2><input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
<input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
<button onClick={()=>createUserWithEmailAndPassword(auth,email,password)}>Sign Up</button>
<button onClick={()=>signInWithEmailAndPassword(auth,email,password)}>Login</button></div>);}