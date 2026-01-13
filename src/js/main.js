document.addEventListener("DOMContentLoaded", () => {
  const postBtn = document.getElementById("postBtn");
  const postText = document.getElementById("postText");
  const feed = document.getElementById("feed");

  postBtn.addEventListener("click", () => {
    const text = postText.value.trim();
    if (!text) return;

    const card = document.createElement("div");
    card.className = "glass";
    card.innerHTML = `
      <b style="color:cyan">@guest</b>
      <p>${text}</p>
    `;

    feed.prepend(card);
    postText.value = "";
  });
});
