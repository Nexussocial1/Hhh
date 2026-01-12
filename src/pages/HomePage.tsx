import {useEffect,useState} from "react";
import {collection,addDoc,getDocs,orderBy,query} from "firebase/firestore";import {db} from "../firebase";
export default function HomePage(){const[text,setText]=useState("");const[posts,setPosts]=useState<any[]>([]);
const loadPosts=async()=>{const q=query(collection(db,"posts"),orderBy("created","desc"));const s=await getDocs(q);setPosts(s.docs.map(d=>d.data()));};
useEffect(()=>{loadPosts();},[]);
const addPost=async()=>{if(!text)return;await addDoc(collection(db,"posts"),{text,created:Date.now()});setText("");loadPosts();};
return(<div style={{maxWidth:480,margin:"0 auto",padding:10}}>
<h3 style={{textAlign:"center"}}>Nexus Feed</h3>
<div style={{display:"flex",gap:6,marginBottom:10}}>
<input value={text} onChange={e=>setText(e.target.value)} placeholder="What's happening?" style={{flex:1,padding:10,borderRadius:6,border:"1px solid #ccc"}}/>
<button onClick={addPost} style={{padding:"10px 14px",borderRadius:6,background:"#1877f2",color:"#fff",border:"none"}}>Post</button>
</div>
{posts.map((p,i)=>(<div key={i} style={{background:"#fff",padding:12,borderRadius:10,marginBottom:10,boxShadow:"0 2px 6px rgba(0,0,0,.1)"}}>{p.text}</div>))}
</div>);}