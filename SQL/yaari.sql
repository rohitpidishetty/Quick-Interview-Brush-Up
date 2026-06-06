create database yaari;

use yaari;

create table users (
    user_id bigint primary key auto_increment,
    user_name varchar(50) not null,
    email_address varchar(255) unique not null,
    email_verified boolean default false,
    user_password varchar(255) not null,
    profile_picture varchar(500),
    background_image varchar(500),
    date_of_creation date,
    time_of_creation time,
    bio_status text,
    live_location varchar(255),
    notification_id varchar(255),
    otp varchar(10),
    phone_number varchar(20),
    portfolio_link varchar(500),
    user_activity varchar(100),
    user_location varchar(255),
    private_account boolean default false
);


-- select * from users;


create table posts (
    post_id varchar(64) primary key,
    post_description text,
    post_link text,
    post_location varchar(255),
    post_date_of_upload int,
    post_day_of_upload int,
    post_month_of_upload int,
    post_year_of_upload int,
    post_time_of_upload bigint,
    post_owner varchar(100) references users(user_name)
);

-- select * from posts;

    
