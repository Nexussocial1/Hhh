const {
  auth, db, provider,
  signInWithPopup, signOut, onAuthStateChanged,
  collection, addDoc, query, orderBy, onSnapshot, serverTimestamp
} = window.firebaseApp;

loginBtn.onclick = () => signInWithPopup(auth, provider);
logoutBtn.onclick = () => signOut(auth);

postBtn.onclick = async () => {
  if (!auth.currentUser) return alert("Login first");
  if (!postText.value.trim()) return;

  await addDoc(collection(db, "posts"), {
    text: postText.value,
    user: auth.currentUser.displayName,
    time: serverTimestamp()
  });

  postText.value = "";
};

const q = query(collection(db, "posts"), orderBy("time", "desc"));
onSnapshot(q, snap => {
  posts.innerHTML = "";
  snap.forEach(doc => {
    const d = doc.data();
    posts.innerHTML += `<p><b>${d.user}</b>: ${d.text}</p>`;
  });
});
