DROP DATABASE IF EXISTS FriendFinder_db;
CREATE DATABASE FriendFinder_db;
USE FriendFinder_db;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL, 
    total_score INT NOT NULL,
    UNIQUE (full_name),
	UNIQUE (email),
	PRIMARY KEY (id)
);

CREATE TABLE scores(
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    score_1 INT NOT NULL,
    score_2 INT NOT NULL,
    score_3 INT NOT NULL,
    score_4 INT NOT NULL,
    score_5 INT NOT NULL,
    score_6 INT NOT NULL,
    score_7 INT NOT NULL,
    score_8 INT NOT NULL,
    score_9 INT NOT NULL,
    score_10 INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE users_2(
    id INT NOT NULL AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL, 
    score INT NOT NULL,
    UNIQUE (full_name),
	UNIQUE (email),
	PRIMARY KEY (id)
);