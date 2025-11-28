// ==== DOM елементи ====
var titleInput = document.getElementById("post-title");
var bodyInput = document.getElementById("post-body");
var addButton = document.getElementById("add-post-btn");
var clearButton = document.getElementById("clear-posts-btn");
var postsContainer = document.getElementById("posts");
var counter = document.getElementById("post-count");
// Масив постів
var posts = [];
var nextId = 1;
// ==== Оновлення лічильника ====
function updateCounter() {
    counter.textContent = "\u0423\u0441\u044C\u043E\u0433\u043E \u043F\u043E\u0441\u0442\u0456\u0432: ".concat(posts.length);
}
// ==== Рендер одного поста ====
function renderPost(post) {
    var div = document.createElement("div");
    div.className = "blog-article";
    div.innerHTML = "\n        <h3>".concat(post.title, "</h3>\n        <p>").concat(post.body, "</p>\n        <small>\u0421\u0442\u0432\u043E\u0440\u0435\u043D\u043E: ").concat(post.createdAt.toLocaleString(), "</small>\n    ");
    return div;
}
// ==== Перемалювати всі пости ====
function rEnderAll() {
    postsContainer.innerHTML = "";
    posts.forEach(function (post) { return postsContainer.appendChild(renderPost(post)); });
    updateCounter();
}
// ==== Додавання поста ====
function addPost() {
    var title = titleInput.value.trim();
    var body = bodyInput.value.trim();
    if (!title || !body) {
        alert("Будь ласка, заповніть всі поля!");
        return;
    }
    var newPost = {
        id: nextId++,
        title: title,
        body: body,
        createdAt: new Date()
    };
    posts.push(newPost);
    rEnderAll();
    titleInput.value = "";
    bodyInput.value = "";
}
// ==== Очищення постів ====
function clearPosts() {
    posts = [];
    rEnderAll();
}
// ==== Обробники ====
addButton.addEventListener("click", addPost);
clearButton.addEventListener("click", clearPosts);
updateCounter();
