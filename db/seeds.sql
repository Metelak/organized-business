INSERT INTO departments (name)
VALUES
('Rehab'),
('Nursing'),
('Billing'),
('HR');

INSERT INTO roles (title, salary, dept_id)
VALUES
('Occupational Therapist', 83000, 1),
('RN', 60000, 2),
('Coding Specialist', 49000, 3),
('Staffing Coordinator', 36000, 4),
('Physical Therapist', 87000, 1),
('CNA', 28000, 2),
('Associate', 48000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Peter', 'Linder', 5, 1),
('Samantha', 'Burton', 7, 4),
('Charles', 'Smart', 6, 2),
('Timothy', 'Herd', 4, 3);