BEGIN TRANSACTION;

Drop table IF EXISTS users,kids,activity,mascot_selection,mascot,items_store,closet CASCADE;

CREATE TABLE users (
	user_id serial,
	username varchar(50) NOT NULL UNIQUE,
	password_hash varchar(200) NOT NULL,
	role varchar(50) NOT NULL,
	CONSTRAINT PK_user PRIMARY KEY (user_id)
);

Create table kids (
	kids_id int NOT NULL,
	user_id int NOT NULL,
	username varchar(50) NOT NULL,
	password_hash varchar(200) NOT NULL,
	carrots int,
	play_time_seconds int,
	CONSTRAINT PK_kids PRIMARY KEY (kids_id),
	CONSTRAINT FK_kids_id FOREIGN KEY (kids_id) REFERENCES users (user_id),
	CONSTRAINT FK_kids_users FOREIGN KEY (user_id) REFERENCES users (user_id)
);

create table activity (
	kids_id int NOT NULL,
	steps int,
	minutes int,
	CONSTRAINT FK_activity_id FOREIGN KEY (kids_id) REFERENCES users (user_id)
);

Create table items_store (
	item_id int,
	img_url varchar(300),
	CONSTRAINT PK_item_id PRIMARY KEY (item_id)
);

Create table mascot_selection(
	mascot_selection_id int,
	mascot_img_url varchar(300),
	CONSTRAINT PK_mascot_selection_id PRIMARY KEY (mascot_selection_id)
);

Create table mascot (
	mascot_id SERIAL,
	kids_id int NOT NULL,
	shirt int,
	shoes int,
	hat int,
	accessory int,
	background int,
	mascot_selection_id int,
	CONSTRAINT PK_mascot_id PRIMARY KEY (mascot_id),
	CONSTRAINT FK_mascot_kids FOREIGN KEY (kids_id) REFERENCES kids (kids_id),
	CONSTRAINT UQ_mascot_id UNIQUE (mascot_id)
);


Create table closet (
	mascot_id int,
	item_id int,
	CONSTRAINT PK_mascot_id_item_id PRIMARY KEY (mascot_id,item_id),
	CONSTRAINT FK_kids_closet FOREIGN KEY (mascot_id) REFERENCES mascot (mascot_id),
	CONSTRAINT FK_mascot_closet_item_id FOREIGN KEY (item_id) REFERENCES items_store (item_id)
	);

COMMIT TRANSACTION;
