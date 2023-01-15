drop database if exists project1;
create database project1;
use project1;

create table `account`(
id int primary key auto_increment,
username varchar(255),
`password` varchar(255),
status_lock int default 0
);

create table lock_account(
id int primary key auto_increment,
account_id int,
start_day date,
end_day date,
reason varchar(255),
foreign key (account_id) references account(id)
);

create table address(
id int primary key auto_increment,
detail_address varchar(255),
town varchar(255),
district varchar(255),
city varchar(255),
country varchar(255)
);

create table user_type(
id int primary key auto_increment,
`name` varchar(255)
 );
 
create table `user`(
id int primary key auto_increment,
first_name varchar(255),
last_name varchar(255),
address_id int,
email varchar(10),
phone varchar(15),
point_dedication double,
birthday date,
id_card varchar(15),
avatar varchar(255),
user_type_id int,
account_id int,
foreign key (address_id) references address(id),
foreign key (account_id) references account(id),
foreign key(user_type_id) references user_type(id)
);

create table payment(
id int primary key auto_increment,
shipping_description text,
payment_status bit default 0,
user_id int,
foreign key(user_id) references user(id)
);

create table category (
id int primary key auto_increment,
name varchar(45)
);

create table auction_status (
id int primary key auto_increment,
name varchar(45)
);

create table review_status (
id int primary key auto_increment,
name varchar(45)
);

create table price_step (
id int primary key auto_increment,
step double
);

create table product (
id int primary key auto_increment,
name varchar(255),
initial_price double,
start_time datetime,
end_time datetime,
`description` text,
delete_stauts bit,
price_step_id int,
review_status_id int,
auction_status_id int,
seller_id int,
category_id int,
foreign key (price_step_id) references price_step (id),
foreign key (review_status_id) references review_status (id),
foreign key (auction_status_id) references auction_status (id),
foreign key (seller_id) references `user` (id),
foreign key (category_id) references category (id)
);

create table img_url_product (
id int primary key auto_increment,
url varchar(255),
product_id int,
foreign key (product_id) references product (id)
);

create table auction(
id int primary key auto_increment,
buyer_id int,
product_id int,
current_price double,
auction_time date,
pay_status bit,
auction_status bit,
foreign key (buyer_id) references user(id),
foreign key (product_id) references product(id)
);

CREATE TABLE guide (
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(255),
content TEXT
);

create table img_url_guide (
id int primary key auto_increment,
url varchar(255),
guide_id int,
foreign key (guide_id) references guide (id)
);
