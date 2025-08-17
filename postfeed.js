import sql from "better-sqlite3";

const db = sql("feeds.db");

// Create user table
function createUser() {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `).run();

  const row = db.prepare("SELECT count(*) AS count FROM user").get();
  if (row.count === 0) {
    insertUser({ name: "arjhu" });
    insertUser({ name: "anu" });

  }
}

// Create likes table
function createLikes() {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS likes (
      postid INTEGER,
      userid INTEGER,
      PRIMARY KEY (postid, userid),
      FOREIGN KEY (postid) REFERENCES feed(id),
      FOREIGN KEY (userid) REFERENCES user(id)
    )
  `).run();
}

// Create feed table
function createFeed() {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS feed (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      image TEXT NOT NULL,
      content TEXT NOT NULL,
      userid INTEGER REFERENCES user(id)
    )
  `).run();

  const row = db.prepare("SELECT count(*) AS count FROM feed").get();
  if (row.count === 0) {
    insertFeed({
      title: "test",
      image: "http://res.cloudinary.com/dnnovzbf2/image/upload/v1755337578/testify/jbq2cnyqflewenfpchy8.png",
      content: "test",
      userid: 1
    });
  }
}

createUser();
createFeed();
createLikes();

// Insert feed
export function insertFeed(info) {
  db.prepare(`
    INSERT INTO feed (title, image, content, userid) 
    VALUES (@title, @image, @content, @userid)
  `).run(info);
}

// Insert user
function insertUser(user) {
  db.prepare("INSERT INTO user (name) VALUES (@name)").run(user);
}

// Toggle like/unlike
export function updateStatusLike(postid, userid) {
  const row = db.prepare(
    "SELECT count(*) AS counts FROM likes WHERE postid=@postid AND userid=@userid"
  ).get({ postid, userid });

  if (row.counts === 0) {
    db.prepare("INSERT INTO likes (postid, userid) VALUES (@postid, @userid)").run({ postid, userid });
  } else {
    db.prepare("DELETE FROM likes WHERE postid=@postid AND userid=@userid").run({ postid, userid });
  }
}

// Get feed + user details with like info
export function getDetails(currentUserId = 1) {
  const data = db.prepare(`
    SELECT 
      feed.id,
      feed.title,
      feed.image,
      feed.content,
      user.id AS userId,
      user.name AS userName,
      COUNT(likes.postid) AS likes,
      EXISTS (
        SELECT * FROM likes 
        WHERE likes.postid = feed.id 
          AND likes.userid = 2
      ) AS isLike
    FROM feed
    LEFT JOIN user ON user.id = feed.userid
    LEFT JOIN likes ON likes.postid = feed.id
    GROUP BY feed.id
  `).all();

  return data;
}
