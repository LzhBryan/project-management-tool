CREATE TYPE "public"."colour" AS ENUM('#b8255f', '#cf473a', '#c77100', '#b29104', '#949c31', '#65a33a', '#369307', '#42a393', '#148fad', '#319dc0', '#6988a4', '#2a67e2', '#692ec2', '#ac30cc', '#a4698c', '#e05095', '#b2635c', '#808080', '#999999', '#8f7a69');--> statement-breakpoint
CREATE TYPE "public"."priority" AS ENUM('urgent', 'high', 'medium', 'low');--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"name" text NOT NULL,
	"colour" "colour" DEFAULT '#999999' NOT NULL,
	"is_favourite" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"due_date" timestamp with time zone,
	"priority" "priority",
	"user_id" integer NOT NULL,
	"project_id" integer
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;