const reviews = [
  {
    type: "books",
    title: "An Academic Affair",
    rating: "★★★★★ 5/5",
    image: "https://via.placeholder.com/400x600?text=An+Academic+Affair",
    creator: "Author: Jodi McAlister",
    reviewText: "A contemporary romance with academic rivalry, tension, banter, and a marriage-of-convenience setup."
  }
];

function createCard(review) {
  const image = review.image || "https://via.placeholder.com/400x600?text=Review";
  return `
    <div class="card review">
      <img src="${escapeHTML(image)}" alt="${escapeHTML(review.title)}">
      <h3>${escapeHTML(review.title)}</h3>
      <p class="rating">${escapeHTML(review.rating)}</p>
      <p class="meta">${escapeHTML(review.creator)}</p>
      <p>${escapeHTML(review.reviewText)}</p>
    </div>
  `;
}

function renderReviews() {
  const books = document.getElementById("booksReviews");
  const movies = document.getElementById("moviesReviews");
  const shows = document.getElementById("showsReviews");
  const recent = document.getElementById("recentReviews");

  books.innerHTML = "";
  movies.innerHTML = "";
  shows.innerHTML = "";
  recent.innerHTML = "";

  reviews.forEach(review => {
    const card = createCard(review);
    if (review.type === "books") books.insertAdjacentHTML("beforeend", card);
    if (review.type === "movies") movies.insertAdjacentHTML("beforeend", card);
    if (review.type === "shows") shows.insertAdjacentHTML("beforeend", card);
  });

  reviews.slice(0, 6).forEach(review => {
    recent.insertAdjacentHTML("beforeend", createCard(review));
  });

  addEmptyMessage(books, "No book reviews yet.");
  addEmptyMessage(movies, "No movie reviews yet.");
  addEmptyMessage(shows, "No show reviews yet.");
  addEmptyMessage(recent, "No recent reviews yet.");
}

function addEmptyMessage(section, message) {
  if (!section.innerHTML.trim()) {
    section.innerHTML = `<p class="empty">${message}</p>`;
  }
}

function searchReviews() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const reviewCards = document.getElementsByClassName("review");

  for (let i = 0; i < reviewCards.length; i++) {
    const text = reviewCards[i].innerText.toLowerCase();
    reviewCards[i].style.display = text.includes(input) ? "" : "none";
  }
}

function escapeHTML(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

renderReviews();
