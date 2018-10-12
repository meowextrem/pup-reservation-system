CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	first_name varchar(30),
	last_name varchar(30),
	email varchar(30) UNIQUE,
	student_number varchar(30) UNIQUE,
	year_level int,
	section int,
	contact_number varchar(20),
	password varchar(255),
	created_date date DEFAULT current_date
);


SELECT * FROM assets_tb
LEFT JOIN equipments_tb ON equipments_tb.equipment_id = assets_tb.equipment_id
LEFT JOIN rooms_tb ON rooms_tb.room_id = assets_tb.room_id;

