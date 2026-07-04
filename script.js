const defaultReviews = [
  {
    type: "books",
    title: "An Academic Affair",
    rating: "★★★★★ 5/5",
    image: "https://via.placeholder.com/400x600?text=An+Academic+Affair",
    creator: "Author: Jodi McAlister",
    reviewText: "A contemporary romance with academic rivalry, tension, banter, and a marriage-of-convenience setup."
  }
];

function getSavedReviews() {
  const saved = localStorage.getItem("reviews");
  return saved ? JSON.parse(saved) : [];
}

function saveReviews(reviews) {
  localStorage.setItem("reviews", JSON.stringify(reviews));
}

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
  const savedReviews = getSavedReviews();
  const allReviews = [...savedReviews, ...defaultReviews];

  const books = document.getElementById("booksReviews");
  const movies = document.getElementById("moviesReviews");
  const shows = document.getElementById("showsReviews");
  const recent = document.getElementById("recentReviews");

  books.innerHTML = "";
  movies.innerHTML = "";
  shows.innerHTML = "";
  recent.innerHTML = "";

  allReviews.forEach(review => {
    const card = createCard(review);
    if (review.type === "books") books.insertAdjacentHTML("beforeend", card);
    if (review.type === "movies") movies.insertAdjacentHTML("beforeend", card);
    if (review.type === "shows") shows.insertAdjacentHTML("beforeend", card);
  });

  allReviews.slice(0, 6).forEach(review => {
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

function addReview() {
  const review = {
    type: document.getElementById("type").value,
    title: document.getElementById("title").value.trim(),
    rating: document.getElementById("rating").value.trim(),
    image: document.getElementById("image").value.trim(),
    creator: document.getElementById("creator").value.trim(),
    reviewText: document.getElementById("reviewText").value.trim()
  };

  if (!review.title || !review.rating || !review.reviewText) {
    alert("Please add at least a title, rating, and review.");
    return;
  }

  const savedReviews = getSavedReviews();
  savedReviews.unshift(review);
  saveReviews(savedReviews);

  document.getElementById("title").value = "";
  document.getElementById("rating").value = "";
  document.getElementById("image").value = "";
  document.getElementById("creator").value = "";
  document.getElementById("reviewText").value = "";

  renderReviews();
  alert("Review added! It is saved in this browser.");
}

function clearSavedReviews() {
  if (confirm("Clear only the reviews saved in this browser?")) {
    localStorage.removeItem("reviews");
    renderReviews();
  }
}

function searchReviews() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const reviews = document.getElementsByClassName("review");

  for (let i = 0; i < reviews.length; i++) {
    const text = reviews[i].innerText.toLowerCase();
    reviews[i].style.display = text.includes(input) ? "" : "none";
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
