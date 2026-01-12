import { initializeApp } from "firebase/app";
import { getAuth,onAuthStateChanged,signOut } from "firebase/auth";
import { getFirestore,collection,addDoc,onSnapshot,serverTimestamp,query,orderBy } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8pCEwiDHWvb4vju9vtsXvxFvB29SM6VM",
  authDomain: "nexus-social-dce76.firebaseapp.com",
  projectId: "nexus-social-dce76",
  storageBucket: "nexus-social-dce76.firebasestorage.app",
  messagingSenderId: "172694934932",
  appId: "1:172694934932:web:62bb46749dd0c062bfab81"
};

const app=initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

const postBtn=document.getElementById("postBtn");
const postInput=document.getElementById("postInput");
const feed=document.getElementById("feed");
const logoutBtn=document.getElementById("logoutBtn");

postBtn.onclick=async()=>{
 if(!postInput.value) return;
 await addDoc(collection(db,"posts"),{text:postInput.value,time:serverTimestamp()});
 postInput.value="";
};

const q=query(collection(db,"posts"),orderBy("time","desc"));
onSnapshot(q,s=>{
 feed.innerHTML="";
 s.forEach(d=>feed.innerHTML+=`<div>${d.data().text}</div>`);
});

logoutBtn.onclick=()=>signOut(auth);
