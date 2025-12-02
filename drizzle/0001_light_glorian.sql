CREATE TABLE `studentLogins` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`email` varchar(320),
	`loginTime` timestamp NOT NULL DEFAULT (now()),
	`country` varchar(100),
	`ipAddress` varchar(45),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `studentLogins_id` PRIMARY KEY(`id`)
);
