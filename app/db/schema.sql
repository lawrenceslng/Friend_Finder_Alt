DROP DATABASE IF EXISTS FriendFinder_db;
CREATE DATABASE FriendFinder_db;
USE FriendFinder_db;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL, 
    score INT NOT NULL,
    UNIQUE (full_name),
	UNIQUE (email),
	PRIMARY KEY (id)
)
