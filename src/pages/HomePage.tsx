import {useEffect,useState} from "react";
import {collection,addDoc,getDocs,orderBy,query,updateDoc,doc} from "firebase/firestore";
import {auth,db} from "../firebase";import {signOut} from "firebase/auth";

export default function HomePage(){
 const[text,setText]=useState("");const[posts,setPosts]=useState<any[]>([]);

 const loadPosts=async()=>{
  const q=query(collection(db,"posts"),orderBy("created","desc"));
  const s=await getDocs(q);
  setPosts(s.docs.map(d=>({id:d.id,...d.data()})));
 };

 useEffect(()=>{loadPosts();},[]);

 const addPost=async()=>{
  if(!text) return;
  await addDoc(collection(db,"posts"),{
    text,created:Date.now(),
    user:auth.currentUser?.displayName||"Anon",
    avatar:auth.currentUser?.photoURL,
    likes:0,comments:[]
  });
  setText("");loadPosts();
 };

 const likePost=async(id:number,current:number)=>{
  await updateDoc(doc(db,"posts",id),{likes:current+1});
  loadPosts();
 };

 return(<div style={{maxWidth:480,margin:"0 auto",padding:10}}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
  <h3>Nexus Feed</h3>
  <button onClick={()=>signOut(auth)}>Sign Out</button>
 </div>

 <div style={{display:"flex",gap:6,marginBottom:10}}>
  <input value={text} onChange={e=>setText(e.target.value)}
   placeholder="What's happening?" style={{flex:1,padding:10,borderRadius:6}}/>
  <button onClick={addPost} style={{padding:"10px 14px",background:"#1877f2",color:"#fff"}}>Post</button>
 </div>

 {posts.map((p:any)=>(
  <div key={p.id} style={{background:"#fff",padding:12,borderRadius:10,marginBottom:10}}>
   <div style={{display:"flex",alignItems:"center",gap:8}}>
    <img src={p.avatar} width="36" height="36" style={{borderRadius:"50%"}}/>
    <b>{p.user}</b>
    <small>{new Date(p.created).toLocaleString()}</small>
   </div>
   <p>{p.text}</p>
   <button onClick={()=>likePost(p.id,p.likes||0)}>❤️ {p.likes||0}</button>
  </div>
 ))}
 </div>);}