import { existsSync, readFileSync, writeFileSync } from "fs";
const path = "./db/posts.json";

function savePost(post) {
  let posts = [];
  if (existsSync(path)) {
    posts = JSON.parse(readFileSync(path));
  }
  posts.push(post);
  writeFileSync(path, JSON.stringify(posts, null, 2));
}

export default { savePost };
