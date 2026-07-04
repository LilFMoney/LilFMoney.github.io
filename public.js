import { db } from "./firebase-config.js";
import { collection, query, where, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const reviewsQuery = query(collection(db, "reviews"), where("status", "==", "published"), orderBy("createdAt", "desc"));
onSnapshot(reviewsQuery, (snapshot) => {
  const reviews = [];
  snapshot.forEach((doc) => reviews.push({ id: doc.id, ...doc.data() }));
  renderReviews(reviews);
});

function renderReviews(reviews) {
  const books = document.getElementById("booksReviews"), movies = document.getElementById("moviesReviews"), shows = document.getElementById("showsReviews"), recent = document.getElementById("recentReviews");
  books.innerHTML = ""; movies.innerHTML = ""; shows.innerHTML = ""; recent.innerHTML = "";
  reviews.forEach((review) => {
    const card = createCard(review);
    if (review.type === "books") books.insertAdjacentHTML("beforeend", card);
    if (review.type === "movies") movies.insertAdjacentHTML("beforeend", card);
    if (review.type === "shows") shows.insertAdjacentHTML("beforeend", card);
  });
  reviews.slice(0, 6).forEach((review) => recent.insertAdjacentHTML("beforeend", createCard(review)));
  addEmptyMessage(books, "No book reviews yet."); addEmptyMessage(movies, "No movie reviews yet."); addEmptyMessage(shows, "No show reviews yet."); addEmptyMessage(recent, "No recent reviews yet.");
}

function createCard(review) {
  const image = review.image || "https://via.placeholder.com/400x600?text=Review";
  const genres = review.genres ? `<p class="tags">${escapeHTML(review.genres)}</p>` : "";
  const spoiler = review.spoilerText ? `<details><summary>Spoilers</summary><p>${escapeHTML(review.spoilerText)}</p></details>` : "";
  return `<div class="card review"><img src="${escapeHTML(image)}" alt="${escapeHTML(review.title || "Review image")}"><h3>${escapeHTML(review.title || "Untitled")}</h3><p class="rating">${escapeHTML(review.rating || "")}</p><p class="meta">${escapeHTML(review.creator || "")}</p>${genres}<p>${escapeHTML(review.reviewText || "")}</p>${spoiler}</div>`;
}

function addEmptyMessage(section, message) { if (!section.innerHTML.trim()) section.innerHTML = `<p class="empty">${message}</p>`; }
window.searchReviews = function() { const input = document.getElementById("searchInput").value.toLowerCase(); const reviews = document.getElementsByClassName("review"); for (let i = 0; i < reviews.length; i++) { reviews[i].style.display = reviews[i].innerText.toLowerCase().includes(input) ? "" : "none"; } };
function escapeHTML(text) { return String(text).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"); }