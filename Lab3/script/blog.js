const articles = [
  {
    title: "Вступ до JavaScript",
    author: "Олег Кулеш",
    date: "2025-10-10",
    category: "JavaScript",
    content: "JavaScript — це мова програмування, що оживляє сторінки. Дізнаймося, як із нею працювати."
  },
  {
    title: "Основи HTML",
    author: "Олег Кулеш",
    date: "2025-09-28",
    category: "HTML",
    content: "HTML — це каркас будь-якої вебсторінки. У цій статті розглянемо базові теги та принципи."
  },
  {
    title: "Стилі у CSS",
    author: "Олег Кулеш",
    date: "2025-09-30",
    category: "CSS",
    content: "CSS дозволяє створювати красиві інтерфейси, додаючи кольори, відступи, шрифти та інше."
  },
];

const renderArticle = ({ title, author, date, category, content }) => `
  <article class="blog-article">
    <h3>${title}</h3>
    <p><strong>Автор:</strong> ${author}</p>
    <p><strong>Дата:</strong> ${date}</p>
    <p><strong>Категорія:</strong> ${category}</p>
    <p>${content}</p>
  </article>
`;

const renderAll = (articlesList) => {
  const container = document.getElementById("blog-posts");
  container.innerHTML = articlesList.map(renderArticle).join("");

  const countElement = document.getElementById("article-count");
  countElement.textContent = `Кількість статей: ${articlesList.length}`;
};

const filterByCategory = (category) => {
  if (category === "all") {
    renderAll(articles);
  } else {
    const filtered = articles.filter(a => a.category === category);
    renderAll(filtered);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;
      filterByCategory(category);
    });
  });

  const container = document.getElementById("blog-posts");
  container.innerHTML = `<p>Оберіть категорію, щоб переглянути статті.</p>`;
});
