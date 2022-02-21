-- pre built Departments Table
INSERT INTO departments (name)
VALUES
('Rehab'),
('Nursing'),
('Billing'),
('HR');

-- pre built Role Table
INSERT INTO roles (title, salary, dept_id)
VALUES
('Rehab Director', 90000, 1),
('Physical Therapist', 83000, 1),
('RN', 60000, 2),
('CNA', 28000, 2),
('Coding Specialist', 49000, 3),
('HR Manager', 55000, 4),
('Staffing Coordinator', 36000, 4),
('Associate', 48000, 4);

-- pre built Employees Table
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Peter', 'Linder', 1, NULL),
('Samantha', 'Burton', 2, 1),
('Charles', 'Smart', 3, NULL),
('Timothy', 'Herd', 4, 3),
('Brenda', 'Johnston', 5, NULL),
('Johnny', 'Pots', 6, NULL),
('Karla', 'McLee', 7, 6),
('Reed', 'Thorn', 8, 6);
