import { auth, db } from "./firebase-config.js";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const loginPanel = document.getElementById("loginPanel"), adminPanel = document.getElementById("adminPanel"), reviewListPanel = document.getElementById("reviewListPanel");
const loginMessage = document.getElementById("loginMessage"), adminMessage = document.getElementById("adminMessage");

document.getElementById("loginBtn").addEventListener("click", async () => {
  loginMessage.textContent = "Logging in...";
  try { await signInWithEmailAndPassword(auth, document.getElementById("email").value, document.getElementById("password").value); loginMessage.textContent = ""; }
  catch (error) { loginMessage.textContent = "Login failed: " + error.message; }
});
document.getElementById("logoutBtn").addEventListener("click", async () => await signOut(auth));

document.getElementById("publishBtn").addEventListener("click", async () => {
  const review = {
    type: document.getElementById("type").value,
    title: document.getElementById("title").value.trim(),
    rating: document.getElementById("rating").value.trim(),
    image: document.getElementById("image").value.trim(),
    creator: document.getElementById("creator").value.trim(),
    genres: document.getElementById("genres").value.trim(),
    reviewText: document.getElementById("reviewText").value.trim(),
    spoilerText: document.getElementById("spoilerText").value.trim(),
    status: document.getElementById("status").value,
    createdAt: serverTimestamp()
  };
  if (!review.title || !review.rating || !review.reviewText) { adminMessage.textContent = "Please add a title, rating, and review."; return; }
  try { await addDoc(collection(db, "reviews"), review); adminMessage.textContent = "Review saved!"; clearForm(); }
  catch (error) { adminMessage.textContent = "Could not save: " + error.message; }
});

onAuthStateChanged(auth, (user) => {
  if (user) { loginPanel.classList.add("hidden"); adminPanel.classList.remove("hidden"); reviewListPanel.classList.remove("hidden"); loadAdminReviews(); }
  else { loginPanel.classList.remove("hidden"); adminPanel.classList.add("hidden"); reviewListPanel.classList.add("hidden"); }
});

function loadAdminReviews() {
  const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
  onSnapshot(q, (snapshot) => {
    const container = document.getElementById("adminReviews"); container.innerHTML = "";
    snapshot.forEach((doc) => {
      const review = doc.data();
      container.insertAdjacentHTML("beforeend", `<article><strong>${escapeHTML(review.title || "Untitled")}</strong><p>${escapeHTML(review.type || "")} | ${escapeHTML(review.rating || "")} | ${escapeHTML(review.status || "")}</p></article>`);
    });
  });
}
function clearForm() { ["title","rating","image","creator","genres","reviewText","spoilerText"].forEach(id => document.getElementById(id).value = ""); }
function escapeHTML(text) { return String(text).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"); }