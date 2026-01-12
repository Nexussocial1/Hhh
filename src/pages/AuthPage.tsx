import {useState} from "react";import {auth} from "../firebase";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
export default function AuthPage(){
 const[email,setEmail]=useState("");const[password,setPassword]=useState("");const[name,setName]=useState("");
 const signup=async()=>{const res=await createUserWithEmailAndPassword(auth,email,password);
  await updateProfile(res.user,{displayName:name,photoURL:`https://i.pravatar.cc/150?u=${email}`});};
 return(<div style={{maxWidth:400,margin:"80px auto",padding:20,background:"#fff",borderRadius:10}}>
 <h2 style={{textAlign:"center"}}>Nexus Social</h2>
 <input placeholder="Username" onChange={e=>setName(e.target.value)} style={{width:"100%",padding:10,marginBottom:10}}/>
 <input placeholder="Email" onChange={e=>setEmail(e.target.value)} style={{width:"100%",padding:10,marginBottom:10}}/>
 <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} style={{width:"100%",padding:10,marginBottom:10}}/>
 <button onClick={signup} style={{width:"100%",padding:10}}>Sign Up</button>
 <button onClick={()=>signInWithEmailAndPassword(auth,email,password)} style={{width:"100%",padding:10,marginTop:6}}>Login</button>
 </div>);}