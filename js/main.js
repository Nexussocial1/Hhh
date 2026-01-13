const userArea = document.getElementById("userArea");

onAuthStateChanged(auth, user => {
  if (user) {
    userArea.innerHTML = `
      <span>${user.displayName}</span>
      <button onclick="logout()">Logout</button>
    `;
  } else {
    userArea.innerHTML = `<button onclick="login()">Login with Google</button>`;
  }
});

window.login = () => signInWithPopup(auth, provider);
window.logout = () => signOut(auth);

window.showPage = (id) => {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
};
