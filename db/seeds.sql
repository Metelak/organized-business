INSERT INTO departments (name)
VALUES
('Rehab'),
('Nursing'),
('Billing'),
('HR');

INSERT INTO roles (title, salary, dept_id)
VALUES
('Occupational Therapist', 78000, 1),
('RN', 60000, 2),
('Coding Specialist', 49000, 3),
('Staffing Coordinator', 36000, 4),
('Physical Therapist', 83000, 1),
('CNA', 28000, 2),
('Associate', 48000, 4),
('Rehab Director', 90000, 1),
('HR Manager', 55000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Peter', 'Linder', 5, 8),
('Samantha', 'Burton', 7, 9),
('Charles', 'Smart', 2, NULL),
('Timothy', 'Herd', 4, 9),
('Brenda', 'Johnston', 3, NULL),
('Karla', 'McLee', 1, 8),
('Reed', 'Thorn', 6, 2);