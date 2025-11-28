interface Post {
    id: number;
    title: string;
    body: string;
    createdAt: Date;
}

// ==== DOM елементи ====
const titleInput = document.getElementById("post-title") as HTMLInputElement;
const bodyInput = document.getElementById("post-body") as HTMLTextAreaElement;
const addButton = document.getElementById("add-post-btn") as HTMLButtonElement;
const clearButton = document.getElementById("clear-posts-btn") as HTMLButtonElement;
const postsContainer = document.getElementById("posts") as HTMLDivElement;
const counter = document.getElementById("post-count") as HTMLParagraphElement;

// Масив постів
let posts: Post[] = [];

let nextId = 1;

// ==== Оновлення лічильника ====
function updateCounter(): void {
    counter.textContent = `Усього постів: ${posts.length}`;
}

// ==== Рендер одного поста ====
function renderPost(post: Post): HTMLDivElement {
    const div = document.createElement("div");
    div.className = "blog-article";
    div.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <small>Створено: ${post.createdAt.toLocaleString()}</small>
    `;
    return div;
}

// ==== Перемалювати всі пости ====
function rEnderAll(): void {
    postsContainer.innerHTML = "";
    posts.forEach(post => postsContainer.appendChild(renderPost(post)));
    updateCounter();
}

// ==== Додавання поста ====
function addPost(): void {
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (!title || !body) {
        alert("Будь ласка, заповніть всі поля!");
        return;
    }

    const newPost: Post = {
        id: nextId++,
        title,
        body,
        createdAt: new Date()
    };

    posts.push(newPost);
    rEnderAll();

    titleInput.value = "";
    bodyInput.value = "";
}

// ==== Очищення постів ====
function clearPosts(): void {
    posts = [];
    rEnderAll();
}

// ==== Обробники ====
addButton.addEventListener("click", addPost);
clearButton.addEventListener("click", clearPosts);

updateCounter();
