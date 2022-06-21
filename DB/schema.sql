DROP DATABASE IF EXISTS wework;

CREATE DATABASE wework;
USE wework;


CREATE TABLE department( 
	id INT auto_increment PRIMARY KEY NOT NULL,
    name VARCHAR(30)
);

CREATE TABLE role( 
	id INT auto_increment PRIMARY KEY NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    foreign key (department_id)
    references department(id)
    ON DELETE CASCADE
);

CREATE TABLE employee( 
	id INT auto_increment PRIMARY KEY NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    department VARCHAR(30),
    salary VARCHAR(30),
    role_id INT,
	foreign key (role_id)
    references role(id)
    ON DELETE SET NULL,
    manager_id INT,
	foreign key (manager_id)
    references employee(id)
    ON DELETE SET NULL
);
