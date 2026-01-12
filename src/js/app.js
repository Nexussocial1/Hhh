
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
 apiKey: "AIzaSyD8pCEwiDHWvb4vju9vtsXvxFvB29SM6VM",
 authDomain: "nexus-social-dce76.firebaseapp.com",
 projectId: "nexus-social-dce76",
 storageBucket: "nexus-social-dce76.firebasestorage.app",
 messagingSenderId: "172694934932",
 appId: "1:172694934932:web:62bb46749dd0c062bfab81"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

signup.onclick = async()=>{
 const cred = await createUserWithEmailAndPassword(auth,email.value,password.value);
 await updateProfile(cred.user,{displayName:username.value,photoURL:`https://ui-avatars.com/api/?name=${username.value}`});
 alert("Signed up!");
};

login.onclick = ()=>signInWithEmailAndPassword(auth,email.value,password.value);
logout.onclick = ()=>signOut(auth);

postBtn.onclick = ()=>addDoc(collection(db,"posts"),{
 text:postInput.value,
 user:auth.currentUser.displayName,
 avatar:auth.currentUser.photoURL,
 createdAt:serverTimestamp()
});

onSnapshot(query(collection(db,"posts"),orderBy("createdAt","desc")),snap=>{
 feed.innerHTML="";
 snap.forEach(d=>{
  const p=d.data();
  feed.innerHTML+=`
  <div class="post-card">
   <img src="${p.avatar}">
   <div><b>${p.user}</b><p>${p.text}</p></div>
  </div>`;
 });
});
