CREATE TABLE `memo` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`user_id` int NOT NULL,
	`title` varchar(256) NOT NULL,
	`content` text NOT NULL,
	CONSTRAINT `memo_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`code` varchar(256) NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `uniq_code` UNIQUE(`code`)
);
--> statement-breakpoint
ALTER TABLE `memo` ADD CONSTRAINT `memo_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;