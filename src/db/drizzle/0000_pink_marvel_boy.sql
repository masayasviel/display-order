CREATE TABLE `tag` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`created_by` int NOT NULL,
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`updated_by` int NOT NULL,
	`name` varchar(256) NOT NULL,
	`is_official` boolean NOT NULL DEFAULT false,
	`display_order` int NOT NULL,
	CONSTRAINT `tag_id` PRIMARY KEY(`id`),
	CONSTRAINT `uniq_name` UNIQUE(`name`),
	CONSTRAINT `is_official_and_display_order` UNIQUE(`is_official`,`display_order`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`name` varchar(256) NOT NULL,
	`code` varchar(256) NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `uniq_code` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `user_tag_relation` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`user_id` int NOT NULL,
	`tag_id` int NOT NULL,
	CONSTRAINT `user_tag_relation_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_and_tag_uniq` UNIQUE(`user_id`,`tag_id`)
);
--> statement-breakpoint
ALTER TABLE `tag` ADD CONSTRAINT `tag_created_by_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tag` ADD CONSTRAINT `tag_updated_by_user_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_tag_relation` ADD CONSTRAINT `user_tag_relation_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_tag_relation` ADD CONSTRAINT `user_tag_relation_tag_id_tag_id_fk` FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON DELETE cascade ON UPDATE no action;