import {useEffect,useState} from "react";
import {collection,addDoc,getDocs} from "firebase/firestore";import {db} from "../firebase";
export default function HomePage(){const[text,setText]=useState("");const[posts,setPosts]=useState<any[]>([]);
const loadPosts=async()=>{const snap=await getDocs(collection(db,"posts"));setPosts(snap.docs.map(d=>d.data()));};
useEffect(()=>{loadPosts();},[]);
const addPost=async()=>{await addDoc(collection(db,"posts"),{text,created:Date.now()});setText("");loadPosts();};
return(<div><h1>Nexus Feed</h1><input value={text} onChange={e=>setText(e.target.value)} placeholder="What's happening?"/>
<button onClick={addPost}>Post</button>{posts.map((p,i)=>(<div key={i}>{p.text}</div>))}</div>);}