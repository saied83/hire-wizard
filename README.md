# Hire Wizard

Hire Wizard is a job finder web application built using `Express.js` and `Node.js`. It connects job seekers (Job Hunters) and recruiters, enabling job applications, posting of new job offers, and management of job applications. It implements secure authentication using `bcryptjs` and `JWT` for session management and includes MySQL for database management.

## Features

- Job Hunters can create profiles, showcase skills, and apply for jobs.
- Recruiters can post job offers, set required skills, and manage applications.
- Secure authentication for users with encrypted passwords.
- Database relationships to store and manage complex data like user profiles, job posts, and applications.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL, MySQL2
- **Authentication**: bcryptjs, jsonwebtoken (JWT)
- **Logging**: Morgan
- **Environment**: dotenv
- **Utilities**: colors

## Run Locally

Clone this directory

```bash
git clone https://github.com/saied83/hire-wizard/
```

Go to the client directory

```bash
cd hire-wizard
```

Install dependencies

```bash
npm install
```

## Create and setup MySQL database

Login to MySQL

```bash
  sudo mysql -u root -p
```

Create database named **hire_wizard** and follow these query

```bash

CREATE DATABASE hire_wizard;
USE hire_wizard;

CREATE TABLE User (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(255),
    bio TEXT,
    email VARCHAR(100),
    phone_no VARCHAR(20),
    time_stamp TIMESTAMP,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    dob DATE,
    profile_pic VARCHAR(155),
    gender VARCHAR(10)
);

CREATE TABLE JobHunter (
    h_username VARCHAR(50) PRIMARY KEY,
    h_city VARCHAR(50),
    h_street VARCHAR(100),
    h_zip_code VARCHAR(20),
    h_country VARCHAR(50),
    h_working_role VARCHAR(50),
    FOREIGN KEY (h_username) REFERENCES User(username) ON DELETE CASCADE
);

CREATE TABLE H_Skill (
    h_username VARCHAR(50),
    skill_name VARCHAR(50),
    years_exp INT,
    PRIMARY KEY (h_username, skill_name),
    FOREIGN KEY (h_username) REFERENCES JobHunter(h_username) ON DELETE CASCADE
);

CREATE TABLE H_Project (
    h_username VARCHAR(50),
    title VARCHAR(100),
    p_link VARCHAR(200),
    p_desc TEXT,
    technology VARCHAR(255),
    PRIMARY KEY (h_username, title),
    FOREIGN KEY (h_username) REFERENCES JobHunter(h_username) ON DELETE CASCADE
);

CREATE TABLE JobPost (
    job_id INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(50),
    job_title VARCHAR(100),
    location VARCHAR(100),
    salary DECIMAL,
    year_exp INT,
    apply_limit INT,
    r_username VARCHAR(50),
    deadline DATE,
    time_stamp TIMESTAMP
    FOREIGN KEY (r_username) REFERENCES Recruiter(r_username) ON DELETE CASCADE
);

CREATE TABLE Apply (
    job_id INT,
    h_username VARCHAR(50),
    is_decline BOOLEAN NOT NULL DEFAULT 0,
    is_accepted  BOOLEAN NOT NULL DEFAULT 0,
    name VARCHAR(100),
    email VARCHAR(100),
    CV TEXT,
    PRIMARY KEY (job_id, h_username),
    FOREIGN KEY (job_id) REFERENCES JobPost(job_id),
    FOREIGN KEY (h_username) REFERENCES JobHunter(h_username) ON DELETE CASCADE
);

CREATE TABLE Jp_Skill_Required (
    job_id INT,
    skill_name VARCHAR(50),
    PRIMARY KEY (job_id, skill_name),
    FOREIGN KEY (job_id) REFERENCES JobPost(job_id) ON DELETE CASCADE
);

CREATE TABLE Recruiter (
    r_username VARCHAR(50) PRIMARY KEY,
    designation VARCHAR(50),
    c_name VARCHAR(100),
    c_city VARCHAR(50),
    c_street VARCHAR(100),
    c_country VARCHAR(50),
    c_zip VARCHAR(20)
    FOREIGN KEY (r_username) REFERENCES User(username) ON DELETE CASCADE
);

```

Insert some dummy data

```bash
INSERT INTO User (username, password, bio, email, phone_no, time_stamp, first_name, last_name, dob, gender)
VALUES
('johndoe', 'password123', 'Passionate software developer.', 'johndoe@example.com', '555-1234', '2023-09-10 14:32:05', 'John', 'Doe', '1990-05-15', 'Male'),
('janedoe', 'securePass456', 'Digital marketer and content creator.', 'janedoe@example.com', '555-5678', '2023-09-11 09:15:30', 'Jane', 'Doe', '1992-07-22', 'Female'),
('mike1991', 'mikepassword789', 'Freelance graphic designer.', 'mike@example.com', '555-9876', '2023-09-12 11:45:12', 'Michael', 'Smith', '1991-02-18', 'Male'),
('emily_b', 'Emily#Pass321', 'Web developer with 5 years of experience.', 'emily_b@example.com', '555-6543', '2023-09-13 16:20:40', 'Emily', 'Brown', '1993-11-30', 'Female'),
('robertX', 'robertPass999', 'IT consultant and systems administrator.', 'robertX@example.com', '555-4321', '2023-09-14 10:05:55', 'Robert', 'Johnson', '1985-04-25', 'Male');


INSERT INTO JobHunter (h_username, h_city, h_street, h_zip_code, h_country, h_working_role)
VALUES
('johndoe', 'New York', '123 Broadway St', '10001', 'USA', 'Software Developer'),
('mike1991', 'Chicago', '789 Lakeshore Dr', '60601', 'USA', 'Graphic Designer'),
('emily_b', 'Austin', '101 Congress Ave', '73301', 'USA', 'Web Developer');


INSERT INTO Recruiter (r_username, designation, c_name, c_city, c_street, c_country, c_zip)
VALUES
('janedoe', 'Marketing Manager', 'Tech Innovations Inc.', 'Los Angeles', '456 Sunset Blvd', 'USA', '90001'),
('robertX', 'Senior IT Consultant', 'Tech Solutions LLC', 'Seattle', '202 Pike St', 'USA', '98101');


INSERT INTO H_Skill (h_username, skill_name, years_exp)
VALUES
('johndoe', 'Python', 5),
('johndoe', 'JavaScript', 4),
('mike1991', 'Photoshop', 6),
('mike1991', 'Illustrator', 5),
('emily_b', 'HTML/CSS', 4),
('emily_b', 'JavaScript', 3);

INSERT INTO H_Project (h_username, title, p_link, p_desc, technology)
VALUES
('johndoe', 'Weather App', 'http://example.com/weather', 'A weather forecasting application.', 'Python, Flask'),
('mike1991', 'Brand Identity', 'http://example.com/brand-identity', 'Redesigned the brand identity for a startup.', 'Photoshop, Illustrator'),
('emily_b', 'Portfolio Website', 'http://example.com/portfolio', 'A personal portfolio website showcasing my work.', 'HTML, CSS, JavaScript');



INSERT INTO JobPost ( description, job_title, location, salary, year_exp, apply_limit, r_username, deadline, time_stamp)
VALUES
('Develop and maintain web applications.', 'Web Developer', 'New York', 80000.00, 3, 5, 'janedoe', '2024-10-15', '2024-09-10 14:32:05'),
('Design marketing materials and manage brand.', 'Graphic Designer', 'Chicago', 70000.00, 4, 3, 'robertX', '2024-11-01', '2024-09-11 09:15:30');


INSERT INTO Apply (job_id, h_username, name, email, CV)
VALUES
(1, 'johndoe', 'John Doe', 'johndoe@example.com', 'http://example.com/cv-johndoe'),
(2, 'mike1991', 'Michael Smith', 'mike@example.com', 'http://example.com/cv-mike1991');


INSERT INTO Jp_Skill_Required (job_id, skill_name)
VALUES
(1, 'Python'),
(1, 'JavaScript'),
(2, 'Photoshop'),
(2, 'Illustrator');

```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`=8000

`DB_HOST`=localhost

`DB_USER`=root

`DB_PASSWORD`= **Your MySQL Root Password**

`DB_NAME`=hire_wizard

`JWT_SECRET`=Y8hxiWObFzYOIepLVQoR5RBuQChQ20coFrhkPMqzGQw=

`NODE_ENV`=development

## Run Locally

```bash
npm run server
```

** Now It will show up at **

```bash
http://localhost:8000

```

## Database Schema

![](https://github.com/saied83/hire-wizard/blob/main/hire-wizerd-schema-v2.png?raw=true)
