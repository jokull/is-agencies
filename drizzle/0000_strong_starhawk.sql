CREATE TABLE `agencies` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL,
	`founded` integer,
	`logo_url` text,
	`logo_id` text,
	`size_id` text,
	`visible` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`size_id`) REFERENCES `sizes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_agencies_name` ON `agencies` (`name`);--> statement-breakpoint
CREATE INDEX `idx_agencies_size` ON `agencies` (`size_id`);--> statement-breakpoint
CREATE INDEX `idx_agencies_visible` ON `agencies` (`visible`);--> statement-breakpoint
CREATE TABLE `agency_tags` (
	`agency_id` text NOT NULL,
	`tag_id` text NOT NULL,
	PRIMARY KEY(`agency_id`, `tag_id`),
	FOREIGN KEY (`agency_id`) REFERENCES `agencies`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_agency_tags_agency` ON `agency_tags` (`agency_id`);--> statement-breakpoint
CREATE INDEX `idx_agency_tags_tag` ON `agency_tags` (`tag_id`);--> statement-breakpoint
CREATE TABLE `sizes` (
	`id` text PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`slug` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_sizes_slug` ON `sizes` (`slug`);--> statement-breakpoint
CREATE TABLE `tags` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_tags_slug` ON `tags` (`slug`);