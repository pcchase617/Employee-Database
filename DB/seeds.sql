USE wework;
INSERT INTO department (name)
VALUES ("Operations"),
       ("Sales"),
       ("Marketing"),
       ("Finance"),
       ("Executives");

INSERT INTO role (title, salary, department_id)
VALUES ("Senior Quality Control", 100000, 1),
       ("Head of Sales", 150000, 2),
       ("Senior Marketing Lead", 90000, 3),
       ("Adminstrator of Finance", 120000, 4),
       ("CEO", 200000, 5);

INSERT INTO employee (first_name, last_name, department, salary, role_id, manager_id)
VALUES ("Jim", "Hartford", "Executives", 200000, 5, NULL),
	   ("Kevin", "Mann", "Operations", 100000, 1, 1),
       ("Sara", "Lane", "Sales", 150000, 2, 1),
       ("James", "Parker", "Marketing", 90000, 3, 1),
       ("Taylor", "Senior", "Finance", 120000, 4, 1);
       