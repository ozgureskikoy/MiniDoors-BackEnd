/*
 Navicat Premium Data Transfer

 Source Server         : backend
 Source Server Type    : PostgreSQL
 Source Server Version : 150003
 Source Host           : localhost:5432
 Source Catalog        : postgres
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 150003
 File Encoding         : 65001

 Date: 31/08/2023 10:11:54
*/


-- ----------------------------
-- Type structure for rxid
-- ----------------------------
DROP TYPE IF EXISTS "public"."rxid";
CREATE TYPE "public"."rxid" (
  INPUT = "_timescaledb_functions"."rxid_in",
  OUTPUT = "_timescaledb_functions"."rxid_out",
  INTERNALLENGTH = 16,
  CATEGORY = U,
  DELIMITER = ','
);
ALTER TYPE "public"."rxid" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for admins_admin_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."admins_admin_id_seq";
CREATE SEQUENCE "public"."admins_admin_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for company_company_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."company_company_id_seq";
CREATE SEQUENCE "public"."company_company_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for doors_doors_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."doors_doors_id_seq";
CREATE SEQUENCE "public"."doors_doors_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for guest_permission_new_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."guest_permission_new_id_seq";
CREATE SEQUENCE "public"."guest_permission_new_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for guests_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."guests_id_seq";
CREATE SEQUENCE "public"."guests_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for permission_permission_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."permission_permission_id_seq";
CREATE SEQUENCE "public"."permission_permission_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for subadmin_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."subadmin_id_seq";
CREATE SEQUENCE "public"."subadmin_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."users_id_seq";
CREATE SEQUENCE "public"."users_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS "public"."admin";
CREATE TABLE "public"."admin" (
  "id" int4 NOT NULL DEFAULT nextval('admins_admin_id_seq'::regclass),
  "name" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "mail" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "status" int4 NOT NULL DEFAULT 1,
  "surname" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO "public"."admin" VALUES (1, 'Özgür', 'ozgur@gmail.com', '$2b$10$F200mKgELec5HYBU.tnG4.7wgCziXc49jTzXozAukcPeX.DUNboVS', 1, 'Eskiköy');
INSERT INTO "public"."admin" VALUES (4, 'admin3', 'admin3@asd.com', '$2b$10$Y7STvtvGz.1GPjaY7HT6muBmLbKhG86JqLrpPeuOxNUV6/4otj2Ay', 1, 'aaa');
INSERT INTO "public"."admin" VALUES (5, 'admin4', 'admin4@asd.com', '$2b$10$Mx4iTWlHYdbnkUgesBaMTuRjTCe1IFdUVCxJmOjv1tm1j3sxgQuH2', 1, 'aa');
INSERT INTO "public"."admin" VALUES (13, 'admin', 'admin@asd.com', '$2b$10$fxUhIGHAPYhHmgj2SLHIW.MNDmGhHCteQLZsTTtBs2iQCXBb4M.Ba', 1, 'sddf');
INSERT INTO "public"."admin" VALUES (14, 'admin2', 'admin2@asd.com', '$2b$10$ZiFAs0DZMMmm.1jWRZfEGOvO7OrSo8/5OmbYb8ZxUXc0.zu/4Q77S', 1, 'ssaaa');
INSERT INTO "public"."admin" VALUES (19, 'ozgur2', 'ozgureskikoy0@asd.com', '$2b$10$qIWKlTecVqS1F3NLByFgE.gFLQvda9muw13V3pOVZ3AEV9CRliesq', 1, 'asdd');

-- ----------------------------
-- Table structure for compadmin
-- ----------------------------
DROP TABLE IF EXISTS "public"."compadmin";
CREATE TABLE "public"."compadmin" (
  "id" int4 NOT NULL DEFAULT nextval('subadmin_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "surname" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "mail" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "company_id" int4 NOT NULL,
  "admin_id" int4 NOT NULL,
  "status" int2 NOT NULL DEFAULT 1
)
;

-- ----------------------------
-- Records of compadmin
-- ----------------------------
INSERT INTO "public"."compadmin" VALUES (3, 'ozgura', 'eska', 'ozguresak02@gmail.com', '$2b$10$l8mPfYFGv.RZ.64GJ4/lleNqgLzbPfr/PAtEbsnmNrPGdV0e3hQAK', 4, 13, 1);
INSERT INTO "public"."compadmin" VALUES (7, 'sub', 'admin', 'subadmin@gmail.com', '$2b$10$N0.0q0QbRjoKNuUFdjEived6VuJy5iv62qflYTSsmDbLkGg4h4VNi', 4, 13, 1);
INSERT INTO "public"."compadmin" VALUES (9, 'sub2', 'admin', 'subadmin2@asd.com', '$2b$10$H2HQ2e.mzHXHrnwb0N/9qOoXV9/k2lNAOPnqFwzkPOIOyejEBC0k2', 4, 13, 1);
INSERT INTO "public"."compadmin" VALUES (12, 'comp', 'admin', 'compadmin@gmail.com', '$2b$10$ZT2MFj4K45xop3OFOlCFaup/njYg86tOXzpElExdlh3wk1NN/Q2W2', 2, 13, 1);

-- ----------------------------
-- Table structure for company
-- ----------------------------
DROP TABLE IF EXISTS "public"."company";
CREATE TABLE "public"."company" (
  "id" int4 NOT NULL DEFAULT nextval('company_company_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "admin_id" int4
)
;

-- ----------------------------
-- Records of company
-- ----------------------------
INSERT INTO "public"."company" VALUES (2, 'company2', 4);
INSERT INTO "public"."company" VALUES (3, 'company3', 13);
INSERT INTO "public"."company" VALUES (1, 'company1', 5);
INSERT INTO "public"."company" VALUES (4, 'company4', 13);
INSERT INTO "public"."company" VALUES (5, 'company10', 4);
INSERT INTO "public"."company" VALUES (6, 'Xenon Smart', 19);

-- ----------------------------
-- Table structure for doors
-- ----------------------------
DROP TABLE IF EXISTS "public"."doors";
CREATE TABLE "public"."doors" (
  "id" int4 NOT NULL DEFAULT nextval('doors_doors_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "admin_id" int4,
  "company_id" int4 NOT NULL,
  "compadmin_id" int4,
  "status" int4 DEFAULT 0
)
;

-- ----------------------------
-- Records of doors
-- ----------------------------
INSERT INTO "public"."doors" VALUES (3, 'door3', 5, 2, NULL, 0);
INSERT INTO "public"."doors" VALUES (5, 'door4', 13, 5, NULL, 0);
INSERT INTO "public"."doors" VALUES (18, 'XenonKapı2', 13, 6, NULL, 0);
INSERT INTO "public"."doors" VALUES (19, 'XenonKapı2s', 13, 6, NULL, 0);
INSERT INTO "public"."doors" VALUES (20, 'XenonKapı2sd', NULL, 4, 7, 0);
INSERT INTO "public"."doors" VALUES (2, 'door2', 13, 4, NULL, 0);
INSERT INTO "public"."doors" VALUES (1, 'door', 4, 1, NULL, 0);
INSERT INTO "public"."doors" VALUES (6, 'XenonKapı', 19, 6, NULL, 1);

-- ----------------------------
-- Table structure for guest_permission
-- ----------------------------
DROP TABLE IF EXISTS "public"."guest_permission";
CREATE TABLE "public"."guest_permission" (
  "id" int4 NOT NULL DEFAULT nextval('guest_permission_new_id_seq'::regclass),
  "door_id" int4 NOT NULL,
  "guest_id" int4 NOT NULL,
  "allowed_days" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "allowed_hours_start" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "allowed_hours_end" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "exp_time" timestamp(6)
)
;

-- ----------------------------
-- Records of guest_permission
-- ----------------------------

-- ----------------------------
-- Table structure for guests
-- ----------------------------
DROP TABLE IF EXISTS "public"."guests";
CREATE TABLE "public"."guests" (
  "id" int4 NOT NULL DEFAULT nextval('guests_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "surname" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "mail" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "status" int4 DEFAULT 1,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "company_id" int4 NOT NULL,
  "admin_id" int4,
  "compadmin_id" int4,
  "subadmin_id" int4
)
;

-- ----------------------------
-- Records of guests
-- ----------------------------
INSERT INTO "public"."guests" VALUES (1, 'guest1', 'guestt', 'guest1@gmail.com', 1, '$2b$10$Q2uggmUEJU0CLCkOyo/27OM1y2SznOsON.Rivf5VaOGuj7kt7GOMW', 2, NULL, 12, NULL);
INSERT INTO "public"."guests" VALUES (4, 'guest2', 'guestt', 'guest2@gmail.com', 1, '$2b$10$NaF6DfxhicUc3U93GFAm7eoyu1UCtBjYsoMkknc109J4JUQpLPjsm', 2, NULL, 12, NULL);

-- ----------------------------
-- Table structure for logs
-- ----------------------------
DROP TABLE IF EXISTS "public"."logs";
CREATE TABLE "public"."logs" (
  "time" int8 NOT NULL,
  "user_id" int4,
  "door_id" int4,
  "guest_id" int4
)
;

-- ----------------------------
-- Records of logs
-- ----------------------------
INSERT INTO "public"."logs" VALUES (1692015608, 7, 2, NULL);
INSERT INTO "public"."logs" VALUES (1692013192, 7, 1, NULL);
INSERT INTO "public"."logs" VALUES (1692013240, 7, 1, NULL);
INSERT INTO "public"."logs" VALUES (1692013713, 7, 2, NULL);
INSERT INTO "public"."logs" VALUES (1692016790, 7, 2, NULL);
INSERT INTO "public"."logs" VALUES (1692017524, 7, 1, NULL);
INSERT INTO "public"."logs" VALUES (1692017560, 7, 2, NULL);
INSERT INTO "public"."logs" VALUES (1692018316, 7, 2, NULL);
INSERT INTO "public"."logs" VALUES (1692018323, 7, 2, NULL);
INSERT INTO "public"."logs" VALUES (1692018327, 7, 2, NULL);
INSERT INTO "public"."logs" VALUES (1692018330, 7, 2, NULL);
INSERT INTO "public"."logs" VALUES (1692018333, 7, 2, NULL);
INSERT INTO "public"."logs" VALUES (1692018336, 7, 2, NULL);
INSERT INTO "public"."logs" VALUES (1692018339, 7, 2, NULL);
INSERT INTO "public"."logs" VALUES (1692018342, 7, 2, NULL);
INSERT INTO "public"."logs" VALUES (1692018345, 7, 2, NULL);
INSERT INTO "public"."logs" VALUES (1692018347, 7, 2, NULL);
INSERT INTO "public"."logs" VALUES (1692018351, 7, 2, NULL);
INSERT INTO "public"."logs" VALUES (1692018355, 7, 2, NULL);
INSERT INTO "public"."logs" VALUES (1692018360, 7, 2, NULL);
INSERT INTO "public"."logs" VALUES (1692018364, 7, 2, NULL);
INSERT INTO "public"."logs" VALUES (1692165403, 7, 2, NULL);
INSERT INTO "public"."logs" VALUES (1692276541, 7, 5, NULL);
INSERT INTO "public"."logs" VALUES (1692276615, 7, 5, NULL);
INSERT INTO "public"."logs" VALUES (1692276744, 7, 5, NULL);
INSERT INTO "public"."logs" VALUES (1692276752, 7, 5, NULL);
INSERT INTO "public"."logs" VALUES (1692278761, 7, 6, NULL);
INSERT INTO "public"."logs" VALUES (1692360344, 7, 6, NULL);

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS "public"."permission";
CREATE TABLE "public"."permission" (
  "id" int4 NOT NULL DEFAULT nextval('permission_permission_id_seq'::regclass),
  "user_id" int4 NOT NULL,
  "door_id" int4 NOT NULL,
  "allowed_days" varchar(225) COLLATE "pg_catalog"."default",
  "allowed_hours_start" time(6),
  "allowed_hours_end" time(6)
)
;

-- ----------------------------
-- Records of permission
-- ----------------------------
INSERT INTO "public"."permission" VALUES (25, 15, 6, '{"1","2","3","4","5","6","7"}', '06:00:00', '19:30:00');

-- ----------------------------
-- Table structure for subadmin
-- ----------------------------
DROP TABLE IF EXISTS "public"."subadmin";
CREATE TABLE "public"."subadmin" (
  "id" int4 NOT NULL DEFAULT nextval('subadmin_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "surname" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "mail" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "admin_id" int4,
  "compadmin_id" int4,
  "company_id" int4 NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "status" int4 DEFAULT 1
)
;

-- ----------------------------
-- Records of subadmin
-- ----------------------------
INSERT INTO "public"."subadmin" VALUES (22, 'sub1', 'admin', 'subadmin@gmail.com', 13, NULL, 2, '$2b$10$K6l0qACzeuXNkbwjkjaATufrKG5e3FyVbTq4HPoJNzY3/mu75hU8G', 1);
INSERT INTO "public"."subadmin" VALUES (23, 'sub2', 'admin', 'subadmin2@gmail.com', 13, NULL, 4, '$2b$10$.ze6MZr9cJlaPQoWt8tQGeCFO7SRBKOqXeedZMCAGzRA9FmzdbcSW', 1);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "surname" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" text COLLATE "pg_catalog"."default" NOT NULL,
  "mail" text COLLATE "pg_catalog"."default" NOT NULL,
  "status" int4 NOT NULL DEFAULT 1,
  "admin_id" int4,
  "company_id" int4 NOT NULL,
  "compadmin_id" int4
)
;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" VALUES (1, 'Kişi1', 'aaa', '$2b$10$WgGIRfzu2VzCbBzEDuMDvObCVfWpWBd7fzKsDTv3/4HEtIcbHfSwG', 'kişi1@gmail.com', 1, 13, 6, NULL);
INSERT INTO "public"."users" VALUES (3, 'Kişi2', 'kişi', '$2b$10$SQzz7sRRI8YVG1r.jbzVde95ztF3UlIq3PnuwWRkjuA4TjQbKH.p2', 'kişi2@gmail.com', 1, 13, 1, NULL);
INSERT INTO "public"."users" VALUES (7, 'ozgur', 'esk', '$2b$10$hQmbCZMFNJwYnG.EcHW8V.riGE8bqXXkrp4jFLbKFr5iJShZSZ3Ju', 'ozguresk02@gmail.com', 1, 13, 6, NULL);
INSERT INTO "public"."users" VALUES (10, 'ozgura', 'eska', '$2b$10$3Ybzm7Q7piSbo1cJidi26uNb.jiBPtyWoIgnNYQwOpzRFG/YbZoqq', 'ozguresak02@gmail.com', 1, 13, 4, NULL);
INSERT INTO "public"."users" VALUES (15, 'Özgür', 'Eskiköy', '$2b$10$4ZcULsm.xZIsYjzc3rjX7eTEGkH5lhWPSNoHVE2oIja3yl3NFFK8a', 'ozgure@gmail.com', 1, 13, 6, NULL);

-- ----------------------------
-- Function structure for add_compression_policy
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."add_compression_policy"("hypertable" regclass, "compress_after" any, "if_not_exists" bool, "schedule_interval" interval, "initial_start" timestamptz, "timezone" text);
CREATE OR REPLACE FUNCTION "public"."add_compression_policy"("hypertable" regclass, "compress_after" any, "if_not_exists" bool=false, "schedule_interval" interval=NULL::interval, "initial_start" timestamptz=NULL::timestamp with time zone, "timezone" text=NULL::text)
  RETURNS "pg_catalog"."int4" AS '$libdir/timescaledb-2.11.1', 'ts_policy_compression_add'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for add_continuous_aggregate_policy
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."add_continuous_aggregate_policy"("continuous_aggregate" regclass, "start_offset" any, "end_offset" any, "schedule_interval" interval, "if_not_exists" bool, "initial_start" timestamptz, "timezone" text);
CREATE OR REPLACE FUNCTION "public"."add_continuous_aggregate_policy"("continuous_aggregate" regclass, "start_offset" any, "end_offset" any, "schedule_interval" interval, "if_not_exists" bool=false, "initial_start" timestamptz=NULL::timestamp with time zone, "timezone" text=NULL::text)
  RETURNS "pg_catalog"."int4" AS '$libdir/timescaledb-2.11.1', 'ts_policy_refresh_cagg_add'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for add_data_node
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."add_data_node"("node_name" name, "host" text, "database" name, "port" int4, "if_not_exists" bool, "bootstrap" bool, "password" text);
CREATE OR REPLACE FUNCTION "public"."add_data_node"("node_name" name, "host" text, "database" name=NULL::name, "port" int4=NULL::integer, "if_not_exists" bool=false, "bootstrap" bool=true, "password" text=NULL::text)
  RETURNS TABLE("node_name" name, "host" text, "port" int4, "database" name, "node_created" bool, "database_created" bool, "extension_created" bool) AS '$libdir/timescaledb-2.11.1', 'ts_data_node_add'
  LANGUAGE c VOLATILE
  COST 1
  ROWS 1000;

-- ----------------------------
-- Function structure for add_dimension
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."add_dimension"("hypertable" regclass, "column_name" name, "number_partitions" int4, "chunk_time_interval" anyelement, "partitioning_func" regproc, "if_not_exists" bool);
CREATE OR REPLACE FUNCTION "public"."add_dimension"("hypertable" regclass, "column_name" name, "number_partitions" int4=NULL::integer, "chunk_time_interval" anyelement=NULL::bigint, "partitioning_func" regproc=NULL::regproc, "if_not_exists" bool=false)
  RETURNS TABLE("dimension_id" int4, "schema_name" name, "table_name" name, "column_name" name, "created" bool) AS '$libdir/timescaledb-2.11.1', 'ts_dimension_add'
  LANGUAGE c VOLATILE
  COST 1
  ROWS 1000;

-- ----------------------------
-- Function structure for add_job
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."add_job"("proc" regproc, "schedule_interval" interval, "config" jsonb, "initial_start" timestamptz, "scheduled" bool, "check_config" regproc, "fixed_schedule" bool, "timezone" text);
CREATE OR REPLACE FUNCTION "public"."add_job"("proc" regproc, "schedule_interval" interval, "config" jsonb=NULL::jsonb, "initial_start" timestamptz=NULL::timestamp with time zone, "scheduled" bool=true, "check_config" regproc=NULL::regproc, "fixed_schedule" bool=true, "timezone" text=NULL::text)
  RETURNS "pg_catalog"."int4" AS '$libdir/timescaledb-2.11.1', 'ts_job_add'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for add_reorder_policy
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."add_reorder_policy"("hypertable" regclass, "index_name" name, "if_not_exists" bool, "initial_start" timestamptz, "timezone" text);
CREATE OR REPLACE FUNCTION "public"."add_reorder_policy"("hypertable" regclass, "index_name" name, "if_not_exists" bool=false, "initial_start" timestamptz=NULL::timestamp with time zone, "timezone" text=NULL::text)
  RETURNS "pg_catalog"."int4" AS '$libdir/timescaledb-2.11.1', 'ts_policy_reorder_add'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for add_retention_policy
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."add_retention_policy"("relation" regclass, "drop_after" any, "if_not_exists" bool, "schedule_interval" interval, "initial_start" timestamptz, "timezone" text);
CREATE OR REPLACE FUNCTION "public"."add_retention_policy"("relation" regclass, "drop_after" any, "if_not_exists" bool=false, "schedule_interval" interval=NULL::interval, "initial_start" timestamptz=NULL::timestamp with time zone, "timezone" text=NULL::text)
  RETURNS "pg_catalog"."int4" AS '$libdir/timescaledb-2.11.1', 'ts_policy_retention_add'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for alter_data_node
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."alter_data_node"("node_name" name, "host" text, "database" name, "port" int4, "available" bool);
CREATE OR REPLACE FUNCTION "public"."alter_data_node"("node_name" name, "host" text=NULL::text, "database" name=NULL::name, "port" int4=NULL::integer, "available" bool=NULL::boolean)
  RETURNS TABLE("node_name" name, "host" text, "port" int4, "database" name, "available" bool) AS '$libdir/timescaledb-2.11.1', 'ts_data_node_alter'
  LANGUAGE c VOLATILE
  COST 1
  ROWS 1000;

-- ----------------------------
-- Function structure for alter_job
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."alter_job"("job_id" int4, "schedule_interval" interval, "max_runtime" interval, "max_retries" int4, "retry_period" interval, "scheduled" bool, "config" jsonb, "next_start" timestamptz, "if_exists" bool, "check_config" regproc);
CREATE OR REPLACE FUNCTION "public"."alter_job"("job_id" int4, "schedule_interval" interval=NULL::interval, "max_runtime" interval=NULL::interval, "max_retries" int4=NULL::integer, "retry_period" interval=NULL::interval, "scheduled" bool=NULL::boolean, "config" jsonb=NULL::jsonb, "next_start" timestamptz=NULL::timestamp with time zone, "if_exists" bool=false, "check_config" regproc=NULL::regproc)
  RETURNS TABLE("job_id" int4, "schedule_interval" interval, "max_runtime" interval, "max_retries" int4, "retry_period" interval, "scheduled" bool, "config" jsonb, "next_start" timestamptz, "check_config" text) AS '$libdir/timescaledb-2.11.1', 'ts_job_alter'
  LANGUAGE c VOLATILE
  COST 1
  ROWS 1000;

-- ----------------------------
-- Function structure for approximate_row_count
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."approximate_row_count"("relation" regclass);
CREATE OR REPLACE FUNCTION "public"."approximate_row_count"("relation" regclass)
  RETURNS "pg_catalog"."int8" AS $BODY$
DECLARE
    local_table_name       NAME = NULL;
    local_schema_name      NAME = NULL;
    is_distributed   BOOL = FALSE;
    is_compressed    BOOL = FALSE;
    uncompressed_row_count BIGINT = 0;
    compressed_row_count BIGINT = 0;
    local_compressed_hypertable_id INTEGER = 0;
    local_compressed_chunk_id INTEGER = 0;
    compressed_hypertable_oid  OID;
    local_compressed_chunk_oid  OID;
    max_compressed_row_count BIGINT = 1000;
    is_compressed_chunk INTEGER;
BEGIN
    SELECT relname, nspname FROM pg_class c
    INNER JOIN pg_namespace n ON (n.OID = c.relnamespace)
    INTO local_table_name, local_schema_name
    WHERE c.OID = relation;

    -- Check for input relation is Hypertable
    IF EXISTS (SELECT 1
               FROM _timescaledb_catalog.hypertable WHERE table_name = local_table_name AND schema_name = local_schema_name) THEN
        SELECT compressed_hypertable_id FROM _timescaledb_catalog.hypertable INTO local_compressed_hypertable_id
        WHERE table_name = local_table_name AND schema_name = local_schema_name;
        IF local_compressed_hypertable_id IS NOT NULL THEN
           uncompressed_row_count = _timescaledb_internal.get_approx_row_count(relation);

           WITH compressed_hypertable AS (SELECT table_name, schema_name FROM _timescaledb_catalog.hypertable ht
           WHERE ht.id = local_compressed_hypertable_id)
           SELECT c.oid INTO compressed_hypertable_oid FROM pg_class c
           INNER JOIN compressed_hypertable h ON (c.relname = h.table_name)
           INNER JOIN pg_namespace n ON (n.nspname = h.schema_name);

           compressed_row_count = _timescaledb_internal.get_approx_row_count(compressed_hypertable_oid);
           RETURN (uncompressed_row_count + (compressed_row_count * max_compressed_row_count));
        ELSE
           uncompressed_row_count = _timescaledb_internal.get_approx_row_count(relation);
           RETURN uncompressed_row_count;
        END IF;
    END IF;
    -- Check for input relation is CHUNK
    IF EXISTS (SELECT 1 FROM _timescaledb_catalog.chunk WHERE table_name = local_table_name AND schema_name = local_schema_name) THEN
        with compressed_chunk as (select 1 as is_compressed_chunk from _timescaledb_catalog.chunk c
        inner join _timescaledb_catalog.hypertable h on (c.hypertable_id = h.compressed_hypertable_id)
        where c.table_name = local_table_name and c.schema_name = local_schema_name ),
        chunk_temp as (select compressed_chunk_id from _timescaledb_catalog.chunk c where c.table_name = local_table_name and c.schema_name = local_schema_name)
        select ct.compressed_chunk_id, cc.is_compressed_chunk from chunk_temp ct LEFT OUTER JOIN compressed_chunk cc ON 1 = 1
        INTO local_compressed_chunk_id, is_compressed_chunk;
        -- 'input is chunk #1';
        IF is_compressed_chunk IS NULL AND local_compressed_chunk_id IS NOT NULL THEN
        -- 'Include both uncompressed  and compressed chunk #2';
            WITH compressed_ns_oid AS ( SELECT table_name, oid FROM _timescaledb_catalog.chunk ch INNER JOIN pg_namespace ns ON
            (ch.id = local_compressed_chunk_id and ch.schema_name = ns.nspname))
            SELECT c.oid FROM pg_class c INNER JOIN compressed_ns_oid
            ON ( c.relnamespace = compressed_ns_oid.oid AND c.relname = compressed_ns_oid.table_name)
            INTO local_compressed_chunk_oid;

            uncompressed_row_count = _timescaledb_internal.get_approx_row_count(relation);
            compressed_row_count = _timescaledb_internal.get_approx_row_count(local_compressed_chunk_oid);
            RETURN uncompressed_row_count + (compressed_row_count * max_compressed_row_count);
        ELSIF is_compressed_chunk IS NULL AND local_compressed_chunk_id IS NULL THEN
        -- 'input relation is uncompressed chunk #3';
            uncompressed_row_count = _timescaledb_internal.get_approx_row_count(relation);
            RETURN uncompressed_row_count;
        ELSE
        -- 'compressed chunk only #4';
            compressed_row_count = _timescaledb_internal.get_approx_row_count(relation) * max_compressed_row_count;
            RETURN compressed_row_count;
        END IF;
    END IF;
    -- Check for input relation is Plain RELATION
    uncompressed_row_count = _timescaledb_internal.get_approx_row_count(relation);
    RETURN uncompressed_row_count;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE STRICT
  COST 100
  SET "search_path"="""""""""pg_catalog, pg_temp""""""""";

-- ----------------------------
-- Function structure for attach_data_node
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."attach_data_node"("node_name" name, "hypertable" regclass, "if_not_attached" bool, "repartition" bool);
CREATE OR REPLACE FUNCTION "public"."attach_data_node"("node_name" name, "hypertable" regclass, "if_not_attached" bool=false, "repartition" bool=true)
  RETURNS TABLE("hypertable_id" int4, "node_hypertable_id" int4, "node_name" name) AS '$libdir/timescaledb-2.11.1', 'ts_data_node_attach'
  LANGUAGE c VOLATILE
  COST 1
  ROWS 1000;

-- ----------------------------
-- Function structure for attach_tablespace
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."attach_tablespace"("tablespace" name, "hypertable" regclass, "if_not_attached" bool);
CREATE OR REPLACE FUNCTION "public"."attach_tablespace"("tablespace" name, "hypertable" regclass, "if_not_attached" bool=false)
  RETURNS "pg_catalog"."void" AS '$libdir/timescaledb-2.11.1', 'ts_tablespace_attach'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Procedure structure for cagg_migrate
-- ----------------------------
DROP PROCEDURE IF EXISTS "public"."cagg_migrate"("cagg" regclass, "override" bool, "drop_old" bool);
CREATE OR REPLACE PROCEDURE "public"."cagg_migrate"("cagg" regclass, "override" bool=false, "drop_old" bool=false)
 AS $BODY$
DECLARE
    _cagg_schema TEXT;
    _cagg_name TEXT;
    _cagg_name_new TEXT;
    _cagg_data _timescaledb_catalog.continuous_agg;
BEGIN
    -- procedures with SET clause cannot execute transaction
    -- control so we adjust search_path in procedure body
    SET LOCAL search_path TO pg_catalog, pg_temp;

    SELECT nspname, relname
    INTO _cagg_schema, _cagg_name
    FROM pg_catalog.pg_class
    JOIN pg_catalog.pg_namespace ON pg_namespace.oid OPERATOR(pg_catalog.=) pg_class.relnamespace
    WHERE pg_class.oid OPERATOR(pg_catalog.=) cagg::pg_catalog.oid;

    -- maximum size of an identifier in Postgres is 63 characters, se we need to left space for '_new'
    _cagg_name_new := pg_catalog.format('%s_new', pg_catalog.substr(_cagg_name, 1, 59));

    -- pre-validate the migration and get some variables
    _cagg_data := _timescaledb_internal.cagg_migrate_pre_validation(_cagg_schema, _cagg_name, _cagg_name_new);

    -- create new migration plan
    CALL _timescaledb_internal.cagg_migrate_create_plan(_cagg_data, _cagg_name_new, override, drop_old);
    COMMIT;

    -- SET LOCAL is only active until end of transaction.
    -- While we could use SET at the start of the function we do not
    -- want to bleed out search_path to caller, so we do SET LOCAL
    -- again after COMMIT
    SET LOCAL search_path TO pg_catalog, pg_temp;

    -- execute the migration plan
    CALL _timescaledb_internal.cagg_migrate_execute_plan(_cagg_data);

    -- finish the migration plan
    UPDATE _timescaledb_catalog.continuous_agg_migrate_plan
    SET end_ts = pg_catalog.clock_timestamp()
    WHERE mat_hypertable_id OPERATOR(pg_catalog.=) _cagg_data.mat_hypertable_id;
END;
$BODY$
  LANGUAGE plpgsql;

-- ----------------------------
-- Function structure for check_and_delete_records
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."check_and_delete_records"();
CREATE OR REPLACE FUNCTION "public"."check_and_delete_records"()
  RETURNS "pg_catalog"."void" AS $BODY$
BEGIN
  DELETE FROM guest_permission WHERE exp_time <= NOW();
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for chunk_compression_stats
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."chunk_compression_stats"("hypertable" regclass);
CREATE OR REPLACE FUNCTION "public"."chunk_compression_stats"("hypertable" regclass)
  RETURNS TABLE("chunk_schema" name, "chunk_name" name, "compression_status" text, "before_compression_table_bytes" int8, "before_compression_index_bytes" int8, "before_compression_toast_bytes" int8, "before_compression_total_bytes" int8, "after_compression_table_bytes" int8, "after_compression_index_bytes" int8, "after_compression_toast_bytes" int8, "after_compression_total_bytes" int8, "node_name" name) AS $BODY$
DECLARE
    table_name name;
    schema_name name;
    is_distributed bool;
BEGIN
    SELECT
        relname,
        nspname,
        replication_factor > 0
    INTO
	    table_name,
        schema_name,
        is_distributed
    FROM
        pg_class c
        INNER JOIN pg_namespace n ON (n.OID = c.relnamespace)
        INNER JOIN _timescaledb_catalog.hypertable ht ON (ht.schema_name = n.nspname
                AND ht.table_name = c.relname)
    WHERE
        c.OID = hypertable;

    IF table_name IS NULL THEN
	    RETURN;
	END IF;

    CASE WHEN is_distributed THEN
        RETURN QUERY
        SELECT
            *
        FROM
            _timescaledb_internal.compressed_chunk_remote_stats (schema_name, table_name);
    ELSE
        RETURN QUERY
        SELECT
            *,
            NULL::name
        FROM
            _timescaledb_internal.compressed_chunk_local_stats (schema_name, table_name);
    END CASE;
END;
$BODY$
  LANGUAGE plpgsql STABLE STRICT
  COST 100
  ROWS 1000
  SET "search_path"="""""""""pg_catalog, pg_temp""""""""";

-- ----------------------------
-- Function structure for chunks_detailed_size
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."chunks_detailed_size"("hypertable" regclass);
CREATE OR REPLACE FUNCTION "public"."chunks_detailed_size"("hypertable" regclass)
  RETURNS TABLE("chunk_schema" name, "chunk_name" name, "table_bytes" int8, "index_bytes" int8, "toast_bytes" int8, "total_bytes" int8, "node_name" name) AS $BODY$
DECLARE
        table_name       NAME;
        schema_name      NAME;
        is_distributed   BOOL;
BEGIN
        SELECT relname, nspname, replication_factor > 0
        INTO table_name, schema_name, is_distributed
        FROM pg_class c
        INNER JOIN pg_namespace n ON (n.OID = c.relnamespace)
        INNER JOIN _timescaledb_catalog.hypertable ht ON (ht.schema_name = n.nspname AND ht.table_name = c.relname)
        WHERE c.OID = hypertable;

		IF table_name IS NULL THEN
		    RETURN;
		END IF;

        CASE WHEN is_distributed THEN
            RETURN QUERY SELECT ch.chunk_schema, ch.chunk_name, ch.table_bytes, ch.index_bytes,
                        ch.toast_bytes, ch.total_bytes, ch.node_name
            FROM _timescaledb_internal.chunks_remote_size(schema_name, table_name) ch;
        ELSE
            RETURN QUERY SELECT chl.chunk_schema, chl.chunk_name, chl.table_bytes, chl.index_bytes,
                        chl.toast_bytes, chl.total_bytes, NULL::NAME
            FROM _timescaledb_internal.chunks_local_size(schema_name, table_name) chl;
        END CASE;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE STRICT
  COST 100
  ROWS 1000
  SET "search_path"="""""""""pg_catalog, pg_temp""""""""";

-- ----------------------------
-- Function structure for compress_chunk
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."compress_chunk"("uncompressed_chunk" regclass, "if_not_compressed" bool);
CREATE OR REPLACE FUNCTION "public"."compress_chunk"("uncompressed_chunk" regclass, "if_not_compressed" bool=false)
  RETURNS "pg_catalog"."regclass" AS '$libdir/timescaledb-2.11.1', 'ts_compress_chunk'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for create_distributed_hypertable
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."create_distributed_hypertable"("relation" regclass, "time_column_name" name, "partitioning_column" name, "number_partitions" int4, "associated_schema_name" name, "associated_table_prefix" name, "chunk_time_interval" anyelement, "create_default_indexes" bool, "if_not_exists" bool, "partitioning_func" regproc, "migrate_data" bool, "chunk_target_size" text, "chunk_sizing_func" regproc, "time_partitioning_func" regproc, "replication_factor" int4, "data_nodes" _name);
CREATE OR REPLACE FUNCTION "public"."create_distributed_hypertable"("relation" regclass, "time_column_name" name, "partitioning_column" name=NULL::name, "number_partitions" int4=NULL::integer, "associated_schema_name" name=NULL::name, "associated_table_prefix" name=NULL::name, "chunk_time_interval" anyelement=NULL::bigint, "create_default_indexes" bool=true, "if_not_exists" bool=false, "partitioning_func" regproc=NULL::regproc, "migrate_data" bool=false, "chunk_target_size" text=NULL::text, "chunk_sizing_func" regproc='_timescaledb_internal.calculate_chunk_interval'::regproc, "time_partitioning_func" regproc=NULL::regproc, "replication_factor" int4=NULL::integer, "data_nodes" _name=NULL::name[])
  RETURNS TABLE("hypertable_id" int4, "schema_name" name, "table_name" name, "created" bool) AS '$libdir/timescaledb-2.11.1', 'ts_hypertable_distributed_create'
  LANGUAGE c VOLATILE
  COST 1
  ROWS 1000;

-- ----------------------------
-- Function structure for create_distributed_restore_point
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."create_distributed_restore_point"("name" text);
CREATE OR REPLACE FUNCTION "public"."create_distributed_restore_point"("name" text)
  RETURNS TABLE("node_name" name, "node_type" text, "restore_point" pg_lsn) AS '$libdir/timescaledb-2.11.1', 'ts_create_distributed_restore_point'
  LANGUAGE c VOLATILE STRICT
  COST 1
  ROWS 1000;

-- ----------------------------
-- Function structure for create_hypertable
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."create_hypertable"("relation" regclass, "time_column_name" name, "partitioning_column" name, "number_partitions" int4, "associated_schema_name" name, "associated_table_prefix" name, "chunk_time_interval" anyelement, "create_default_indexes" bool, "if_not_exists" bool, "partitioning_func" regproc, "migrate_data" bool, "chunk_target_size" text, "chunk_sizing_func" regproc, "time_partitioning_func" regproc, "replication_factor" int4, "data_nodes" _name, "distributed" bool);
CREATE OR REPLACE FUNCTION "public"."create_hypertable"("relation" regclass, "time_column_name" name, "partitioning_column" name=NULL::name, "number_partitions" int4=NULL::integer, "associated_schema_name" name=NULL::name, "associated_table_prefix" name=NULL::name, "chunk_time_interval" anyelement=NULL::bigint, "create_default_indexes" bool=true, "if_not_exists" bool=false, "partitioning_func" regproc=NULL::regproc, "migrate_data" bool=false, "chunk_target_size" text=NULL::text, "chunk_sizing_func" regproc='_timescaledb_internal.calculate_chunk_interval'::regproc, "time_partitioning_func" regproc=NULL::regproc, "replication_factor" int4=NULL::integer, "data_nodes" _name=NULL::name[], "distributed" bool=NULL::boolean)
  RETURNS TABLE("hypertable_id" int4, "schema_name" name, "table_name" name, "created" bool) AS '$libdir/timescaledb-2.11.1', 'ts_hypertable_create'
  LANGUAGE c VOLATILE
  COST 1
  ROWS 1000;

-- ----------------------------
-- Function structure for decompress_chunk
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."decompress_chunk"("uncompressed_chunk" regclass, "if_compressed" bool);
CREATE OR REPLACE FUNCTION "public"."decompress_chunk"("uncompressed_chunk" regclass, "if_compressed" bool=false)
  RETURNS "pg_catalog"."regclass" AS '$libdir/timescaledb-2.11.1', 'ts_decompress_chunk'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for delete_data_node
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."delete_data_node"("node_name" name, "if_exists" bool, "force" bool, "repartition" bool, "drop_database" bool);
CREATE OR REPLACE FUNCTION "public"."delete_data_node"("node_name" name, "if_exists" bool=false, "force" bool=false, "repartition" bool=true, "drop_database" bool=false)
  RETURNS "pg_catalog"."bool" AS '$libdir/timescaledb-2.11.1', 'ts_data_node_delete'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for delete_expired_records
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."delete_expired_records"();
CREATE OR REPLACE FUNCTION "public"."delete_expired_records"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
BEGIN
  DELETE FROM guest_permission WHERE exp_time <= EXTRACT(EPOCH FROM NOW());
  RETURN NULL;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for delete_job
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."delete_job"("job_id" int4);
CREATE OR REPLACE FUNCTION "public"."delete_job"("job_id" int4)
  RETURNS "pg_catalog"."void" AS '$libdir/timescaledb-2.11.1', 'ts_job_delete'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for detach_data_node
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."detach_data_node"("node_name" name, "hypertable" regclass, "if_attached" bool, "force" bool, "repartition" bool, "drop_remote_data" bool);
CREATE OR REPLACE FUNCTION "public"."detach_data_node"("node_name" name, "hypertable" regclass=NULL::regclass, "if_attached" bool=false, "force" bool=false, "repartition" bool=true, "drop_remote_data" bool=false)
  RETURNS "pg_catalog"."int4" AS '$libdir/timescaledb-2.11.1', 'ts_data_node_detach'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for detach_tablespace
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."detach_tablespace"("tablespace" name, "hypertable" regclass, "if_attached" bool);
CREATE OR REPLACE FUNCTION "public"."detach_tablespace"("tablespace" name, "hypertable" regclass=NULL::regclass, "if_attached" bool=false)
  RETURNS "pg_catalog"."int4" AS '$libdir/timescaledb-2.11.1', 'ts_tablespace_detach'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for detach_tablespaces
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."detach_tablespaces"("hypertable" regclass);
CREATE OR REPLACE FUNCTION "public"."detach_tablespaces"("hypertable" regclass)
  RETURNS "pg_catalog"."int4" AS '$libdir/timescaledb-2.11.1', 'ts_tablespace_detach_all_from_hypertable'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Procedure structure for distributed_exec
-- ----------------------------
DROP PROCEDURE IF EXISTS "public"."distributed_exec"("query" text, "node_list" _name, "transactional" bool);
CREATE OR REPLACE PROCEDURE "public"."distributed_exec"("query" text, "node_list" _name=NULL::name[], "transactional" bool=true)
 AS '$libdir/timescaledb-2.11.1', 'ts_distributed_exec'
  LANGUAGE c;

-- ----------------------------
-- Function structure for drop_chunks
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."drop_chunks"("relation" regclass, "older_than" any, "newer_than" any, "verbose" bool);
CREATE OR REPLACE FUNCTION "public"."drop_chunks"("relation" regclass, "older_than" any=NULL::unknown, "newer_than" any=NULL::unknown, "verbose" bool=false)
  RETURNS SETOF "pg_catalog"."text" AS '$libdir/timescaledb-2.11.1', 'ts_chunk_drop_chunks'
  LANGUAGE c VOLATILE
  COST 1
  ROWS 1000;

-- ----------------------------
-- Function structure for get_telemetry_report
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."get_telemetry_report"();
CREATE OR REPLACE FUNCTION "public"."get_telemetry_report"()
  RETURNS "pg_catalog"."jsonb" AS '$libdir/timescaledb-2.11.1', 'ts_telemetry_get_report_jsonb'
  LANGUAGE c STABLE
  COST 1;

-- ----------------------------
-- Function structure for hypertable_compression_stats
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."hypertable_compression_stats"("hypertable" regclass);
CREATE OR REPLACE FUNCTION "public"."hypertable_compression_stats"("hypertable" regclass)
  RETURNS TABLE("total_chunks" int8, "number_compressed_chunks" int8, "before_compression_table_bytes" int8, "before_compression_index_bytes" int8, "before_compression_toast_bytes" int8, "before_compression_total_bytes" int8, "after_compression_table_bytes" int8, "after_compression_index_bytes" int8, "after_compression_toast_bytes" int8, "after_compression_total_bytes" int8, "node_name" name) AS $BODY$
	SELECT
        count(*)::bigint AS total_chunks,
        (count(*) FILTER (WHERE ch.compression_status = 'Compressed'))::bigint AS number_compressed_chunks,
        sum(ch.before_compression_table_bytes)::bigint AS before_compression_table_bytes,
        sum(ch.before_compression_index_bytes)::bigint AS before_compression_index_bytes,
        sum(ch.before_compression_toast_bytes)::bigint AS before_compression_toast_bytes,
        sum(ch.before_compression_total_bytes)::bigint AS before_compression_total_bytes,
        sum(ch.after_compression_table_bytes)::bigint AS after_compression_table_bytes,
        sum(ch.after_compression_index_bytes)::bigint AS after_compression_index_bytes,
        sum(ch.after_compression_toast_bytes)::bigint AS after_compression_toast_bytes,
        sum(ch.after_compression_total_bytes)::bigint AS after_compression_total_bytes,
        ch.node_name
    FROM
	    public.chunk_compression_stats(hypertable) ch
    GROUP BY
        ch.node_name;
$BODY$
  LANGUAGE sql STABLE STRICT
  COST 100
  ROWS 1000
  SET "search_path"="""""""""pg_catalog, pg_temp""""""""";

-- ----------------------------
-- Function structure for hypertable_detailed_size
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."hypertable_detailed_size"("hypertable" regclass);
CREATE OR REPLACE FUNCTION "public"."hypertable_detailed_size"("hypertable" regclass)
  RETURNS TABLE("table_bytes" int8, "index_bytes" int8, "toast_bytes" int8, "total_bytes" int8, "node_name" name) AS $BODY$
DECLARE
        table_name       NAME = NULL;
        schema_name      NAME = NULL;
        is_distributed   BOOL = FALSE;
BEGIN
        SELECT relname, nspname, replication_factor > 0
        INTO table_name, schema_name, is_distributed
        FROM pg_class c
        INNER JOIN pg_namespace n ON (n.OID = c.relnamespace)
        INNER JOIN _timescaledb_catalog.hypertable ht ON (ht.schema_name = n.nspname AND ht.table_name = c.relname)
        WHERE c.OID = hypertable;

        IF table_name IS NULL THEN
                SELECT h.schema_name, h.table_name, replication_factor > 0
                INTO schema_name, table_name, is_distributed
                FROM pg_class c
                INNER JOIN pg_namespace n ON (n.OID = c.relnamespace)
                INNER JOIN _timescaledb_catalog.continuous_agg a ON (a.user_view_schema = n.nspname AND a.user_view_name = c.relname)
                INNER JOIN _timescaledb_catalog.hypertable h ON h.id = a.mat_hypertable_id
                WHERE c.OID = hypertable;

	        IF table_name IS NULL THEN
                        RETURN;
                END IF;
        END IF;

        CASE WHEN is_distributed THEN
			RETURN QUERY
			SELECT *, NULL::name
			FROM _timescaledb_internal.hypertable_local_size(schema_name, table_name)
			UNION
			SELECT *
			FROM _timescaledb_internal.hypertable_remote_size(schema_name, table_name);
        ELSE
			RETURN QUERY
			SELECT *, NULL::name
			FROM _timescaledb_internal.hypertable_local_size(schema_name, table_name);
        END CASE;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE STRICT
  COST 100
  ROWS 1000
  SET "search_path"="""""""""pg_catalog, pg_temp""""""""";

-- ----------------------------
-- Function structure for hypertable_index_size
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."hypertable_index_size"("index_name" regclass);
CREATE OR REPLACE FUNCTION "public"."hypertable_index_size"("index_name" regclass)
  RETURNS "pg_catalog"."int8" AS $BODY$
DECLARE
        ht_index_name       NAME;
        ht_schema_name      NAME;
        ht_name      NAME;
        is_distributed   BOOL;
        ht_id INTEGER;
        index_bytes BIGINT;
BEGIN
   SELECT c.relname, cl.relname, nsp.nspname, ht.replication_factor > 0
   INTO ht_index_name, ht_name, ht_schema_name, is_distributed
   FROM pg_class c, pg_index cind, pg_class cl,
        pg_namespace nsp, _timescaledb_catalog.hypertable ht
   WHERE c.oid = cind.indexrelid AND cind.indrelid = cl.oid
         AND cl.relnamespace = nsp.oid AND c.oid = index_name
		 AND ht.schema_name = nsp.nspname ANd ht.table_name = cl.relname;

   IF ht_index_name IS NULL THEN
       RETURN NULL;
   END IF;

   -- get the local size or size of access node indexes
   SELECT il.total_bytes
   INTO index_bytes
   FROM _timescaledb_internal.indexes_local_size(ht_schema_name, ht_index_name) il;

   IF index_bytes IS NULL THEN
       index_bytes = 0;
   END IF;

   -- Add size from data nodes
   IF is_distributed THEN
       index_bytes = index_bytes + _timescaledb_internal.indexes_remote_size(ht_schema_name, ht_name, ht_index_name);
   END IF;

   RETURN index_bytes;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE STRICT
  COST 100
  SET "search_path"="""""""""pg_catalog, pg_temp""""""""";

-- ----------------------------
-- Function structure for hypertable_size
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."hypertable_size"("hypertable" regclass);
CREATE OR REPLACE FUNCTION "public"."hypertable_size"("hypertable" regclass)
  RETURNS "pg_catalog"."int8" AS $BODY$
   -- One row per data node is returned (in case of a distributed
   -- hypertable), so sum them up:
   SELECT sum(total_bytes)::bigint
   FROM public.hypertable_detailed_size(hypertable);
$BODY$
  LANGUAGE sql VOLATILE STRICT
  COST 100
  SET "search_path"="""""""""pg_catalog, pg_temp""""""""";

-- ----------------------------
-- Function structure for interpolate
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."interpolate"("value" float4, "prev" record, "next" record);
CREATE OR REPLACE FUNCTION "public"."interpolate"("value" float4, "prev" record=NULL::record, "next" record=NULL::record)
  RETURNS "pg_catalog"."float4" AS '$libdir/timescaledb-2.11.1', 'ts_gapfill_marker'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for interpolate
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."interpolate"("value" int2, "prev" record, "next" record);
CREATE OR REPLACE FUNCTION "public"."interpolate"("value" int2, "prev" record=NULL::record, "next" record=NULL::record)
  RETURNS "pg_catalog"."int2" AS '$libdir/timescaledb-2.11.1', 'ts_gapfill_marker'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for interpolate
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."interpolate"("value" float8, "prev" record, "next" record);
CREATE OR REPLACE FUNCTION "public"."interpolate"("value" float8, "prev" record=NULL::record, "next" record=NULL::record)
  RETURNS "pg_catalog"."float8" AS '$libdir/timescaledb-2.11.1', 'ts_gapfill_marker'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for interpolate
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."interpolate"("value" int8, "prev" record, "next" record);
CREATE OR REPLACE FUNCTION "public"."interpolate"("value" int8, "prev" record=NULL::record, "next" record=NULL::record)
  RETURNS "pg_catalog"."int8" AS '$libdir/timescaledb-2.11.1', 'ts_gapfill_marker'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for interpolate
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."interpolate"("value" int4, "prev" record, "next" record);
CREATE OR REPLACE FUNCTION "public"."interpolate"("value" int4, "prev" record=NULL::record, "next" record=NULL::record)
  RETURNS "pg_catalog"."int4" AS '$libdir/timescaledb-2.11.1', 'ts_gapfill_marker'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for locf
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."locf"("value" anyelement, "prev" anyelement, "treat_null_as_missing" bool);
CREATE OR REPLACE FUNCTION "public"."locf"("value" anyelement, "prev" anyelement=NULL::unknown, "treat_null_as_missing" bool=false)
  RETURNS "pg_catalog"."anyelement" AS '$libdir/timescaledb-2.11.1', 'ts_gapfill_marker'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for move_chunk
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."move_chunk"("chunk" regclass, "destination_tablespace" name, "index_destination_tablespace" name, "reorder_index" regclass, "verbose" bool);
CREATE OR REPLACE FUNCTION "public"."move_chunk"("chunk" regclass, "destination_tablespace" name, "index_destination_tablespace" name=NULL::name, "reorder_index" regclass=NULL::regclass, "verbose" bool=false)
  RETURNS "pg_catalog"."void" AS '$libdir/timescaledb-2.11.1', 'ts_move_chunk'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Procedure structure for recompress_chunk
-- ----------------------------
DROP PROCEDURE IF EXISTS "public"."recompress_chunk"("chunk" regclass, "if_not_compressed" bool);
CREATE OR REPLACE PROCEDURE "public"."recompress_chunk"("chunk" regclass, "if_not_compressed" bool=false)
 AS $BODY$
DECLARE
  status INT;
  chunk_name TEXT[];
  compressed_chunk_index REGCLASS;
BEGIN

    -- procedures with SET clause cannot execute transaction
    -- control so we adjust search_path in procedure body
    SET LOCAL search_path TO pg_catalog, pg_temp;

    status := _timescaledb_internal.chunk_status(chunk);

    -- Chunk names are in the internal catalog, but we only care about
    -- the chunk name here.
    -- status bits:
    -- 1: compressed
    -- 2: compressed unordered
    -- 4: frozen
    -- 8: compressed partial

    chunk_name := parse_ident(chunk::text);
    CASE
    WHEN status = 0 THEN
        RAISE EXCEPTION 'call compress_chunk instead of recompress_chunk';
    WHEN status = 1 THEN
        IF if_not_compressed THEN
            RAISE NOTICE 'nothing to recompress in chunk "%"', chunk_name[array_upper(chunk_name,1)];
            RETURN;
        ELSE
            RAISE EXCEPTION 'nothing to recompress in chunk "%"', chunk_name[array_upper(chunk_name,1)];
        END IF;
    WHEN status = 3 OR status = 9 OR status = 11 THEN
        -- first check if there's an index. Might have to use a heuristic to determine if index usage would be efficient,
        -- or if we'd better fall back to decompressing & recompressing entire chunk
        SELECT _timescaledb_internal.get_compressed_chunk_index_for_recompression(chunk) INTO STRICT compressed_chunk_index;
        IF compressed_chunk_index IS NOT NULL THEN
            PERFORM _timescaledb_internal.recompress_chunk_segmentwise(chunk);
        ELSE
            PERFORM public.decompress_chunk(chunk);
            COMMIT;
            -- SET LOCAL is only active until end of transaction.
            -- While we could use SET at the start of the function we do not
            -- want to bleed out search_path to caller, so we do SET LOCAL
            -- again after COMMIT
            SET LOCAL search_path TO pg_catalog, pg_temp;
            PERFORM public.compress_chunk(chunk, if_not_compressed);
        END IF;
    ELSE
        RAISE EXCEPTION 'unexpected chunk status % in chunk "%"', status, chunk_name[array_upper(chunk_name,1)];
    END CASE;
END
$BODY$
  LANGUAGE plpgsql;

-- ----------------------------
-- Procedure structure for refresh_continuous_aggregate
-- ----------------------------
DROP PROCEDURE IF EXISTS "public"."refresh_continuous_aggregate"("continuous_aggregate" regclass, "window_start" any, "window_end" any);
CREATE OR REPLACE PROCEDURE "public"."refresh_continuous_aggregate"("continuous_aggregate" regclass, "window_start" any, "window_end" any)
 AS '$libdir/timescaledb-2.11.1', 'ts_continuous_agg_refresh'
  LANGUAGE c;

-- ----------------------------
-- Function structure for remove_compression_policy
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."remove_compression_policy"("hypertable" regclass, "if_exists" bool);
CREATE OR REPLACE FUNCTION "public"."remove_compression_policy"("hypertable" regclass, "if_exists" bool=false)
  RETURNS "pg_catalog"."bool" AS '$libdir/timescaledb-2.11.1', 'ts_policy_compression_remove'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for remove_continuous_aggregate_policy
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."remove_continuous_aggregate_policy"("continuous_aggregate" regclass, "if_not_exists" bool, "if_exists" bool);
CREATE OR REPLACE FUNCTION "public"."remove_continuous_aggregate_policy"("continuous_aggregate" regclass, "if_not_exists" bool=false, "if_exists" bool=NULL::boolean)
  RETURNS "pg_catalog"."void" AS '$libdir/timescaledb-2.11.1', 'ts_policy_refresh_cagg_remove'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for remove_reorder_policy
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."remove_reorder_policy"("hypertable" regclass, "if_exists" bool);
CREATE OR REPLACE FUNCTION "public"."remove_reorder_policy"("hypertable" regclass, "if_exists" bool=false)
  RETURNS "pg_catalog"."void" AS '$libdir/timescaledb-2.11.1', 'ts_policy_reorder_remove'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for remove_retention_policy
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."remove_retention_policy"("relation" regclass, "if_exists" bool);
CREATE OR REPLACE FUNCTION "public"."remove_retention_policy"("relation" regclass, "if_exists" bool=false)
  RETURNS "pg_catalog"."void" AS '$libdir/timescaledb-2.11.1', 'ts_policy_retention_remove'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for reorder_chunk
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."reorder_chunk"("chunk" regclass, "index" regclass, "verbose" bool);
CREATE OR REPLACE FUNCTION "public"."reorder_chunk"("chunk" regclass, "index" regclass=NULL::regclass, "verbose" bool=false)
  RETURNS "pg_catalog"."void" AS '$libdir/timescaledb-2.11.1', 'ts_reorder_chunk'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Procedure structure for run_job
-- ----------------------------
DROP PROCEDURE IF EXISTS "public"."run_job"("job_id" int4);
CREATE OR REPLACE PROCEDURE "public"."run_job"("job_id" int4)
 AS '$libdir/timescaledb-2.11.1', 'ts_job_run'
  LANGUAGE c;

-- ----------------------------
-- Function structure for schedule_check_and_delete
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."schedule_check_and_delete"();
CREATE OR REPLACE FUNCTION "public"."schedule_check_and_delete"()
  RETURNS "pg_catalog"."void" AS $BODY$
DECLARE
  next_run TIMESTAMPTZ;
BEGIN
  PERFORM check_and_delete_records();
  next_run := NOW() + INTERVAL '10 minutes';
  PERFORM pg_sleep(EXTRACT(EPOCH FROM (next_run - NOW()))); -- 10 dakika
  PERFORM schedule_check_and_delete(); -- Kendini çağırarak devam edin
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for set_adaptive_chunking
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."set_adaptive_chunking"("hypertable" regclass, "chunk_target_size" text, INOUT "chunk_sizing_func" regproc, OUT "chunk_target_size" int8);
CREATE OR REPLACE FUNCTION "public"."set_adaptive_chunking"(IN "hypertable" regclass, IN "chunk_target_size" text, INOUT "chunk_sizing_func" regproc='_timescaledb_internal.calculate_chunk_interval'::regproc, OUT "chunk_target_size" int8)
  RETURNS "pg_catalog"."record" AS '$libdir/timescaledb-2.11.1', 'ts_chunk_adaptive_set'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for set_chunk_time_interval
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."set_chunk_time_interval"("hypertable" regclass, "chunk_time_interval" anyelement, "dimension_name" name);
CREATE OR REPLACE FUNCTION "public"."set_chunk_time_interval"("hypertable" regclass, "chunk_time_interval" anyelement, "dimension_name" name=NULL::name)
  RETURNS "pg_catalog"."void" AS '$libdir/timescaledb-2.11.1', 'ts_dimension_set_interval'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for set_integer_now_func
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."set_integer_now_func"("hypertable" regclass, "integer_now_func" regproc, "replace_if_exists" bool);
CREATE OR REPLACE FUNCTION "public"."set_integer_now_func"("hypertable" regclass, "integer_now_func" regproc, "replace_if_exists" bool=false)
  RETURNS "pg_catalog"."void" AS '$libdir/timescaledb-2.11.1', 'ts_hypertable_set_integer_now_func'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for set_number_partitions
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."set_number_partitions"("hypertable" regclass, "number_partitions" int4, "dimension_name" name);
CREATE OR REPLACE FUNCTION "public"."set_number_partitions"("hypertable" regclass, "number_partitions" int4, "dimension_name" name=NULL::name)
  RETURNS "pg_catalog"."void" AS '$libdir/timescaledb-2.11.1', 'ts_dimension_set_num_slices'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for set_replication_factor
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."set_replication_factor"("hypertable" regclass, "replication_factor" int4);
CREATE OR REPLACE FUNCTION "public"."set_replication_factor"("hypertable" regclass, "replication_factor" int4)
  RETURNS "pg_catalog"."void" AS '$libdir/timescaledb-2.11.1', 'ts_hypertable_distributed_set_replication_factor'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for show_chunks
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."show_chunks"("relation" regclass, "older_than" any, "newer_than" any);
CREATE OR REPLACE FUNCTION "public"."show_chunks"("relation" regclass, "older_than" any=NULL::unknown, "newer_than" any=NULL::unknown)
  RETURNS SETOF "pg_catalog"."regclass" AS '$libdir/timescaledb-2.11.1', 'ts_chunk_show_chunks'
  LANGUAGE c STABLE
  COST 1
  ROWS 1000;

-- ----------------------------
-- Function structure for show_tablespaces
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."show_tablespaces"("hypertable" regclass);
CREATE OR REPLACE FUNCTION "public"."show_tablespaces"("hypertable" regclass)
  RETURNS SETOF "pg_catalog"."name" AS '$libdir/timescaledb-2.11.1', 'ts_tablespace_show'
  LANGUAGE c VOLATILE STRICT
  COST 1
  ROWS 1000;

-- ----------------------------
-- Function structure for time_bucket
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."time_bucket"("bucket_width" interval, "ts" timestamptz);
CREATE OR REPLACE FUNCTION "public"."time_bucket"("bucket_width" interval, "ts" timestamptz)
  RETURNS "pg_catalog"."timestamptz" AS '$libdir/timescaledb-2.11.1', 'ts_timestamptz_bucket'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for time_bucket
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."time_bucket"("bucket_width" interval, "ts" timestamptz, "origin" timestamptz);
CREATE OR REPLACE FUNCTION "public"."time_bucket"("bucket_width" interval, "ts" timestamptz, "origin" timestamptz)
  RETURNS "pg_catalog"."timestamptz" AS '$libdir/timescaledb-2.11.1', 'ts_timestamptz_bucket'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for time_bucket
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."time_bucket"("bucket_width" interval, "ts" timestamp, "offset" interval);
CREATE OR REPLACE FUNCTION "public"."time_bucket"("bucket_width" interval, "ts" timestamp, "offset" interval)
  RETURNS "pg_catalog"."timestamp" AS '$libdir/timescaledb-2.11.1', 'ts_timestamp_offset_bucket'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for time_bucket
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."time_bucket"("bucket_width" interval, "ts" timestamp, "origin" timestamp);
CREATE OR REPLACE FUNCTION "public"."time_bucket"("bucket_width" interval, "ts" timestamp, "origin" timestamp)
  RETURNS "pg_catalog"."timestamp" AS '$libdir/timescaledb-2.11.1', 'ts_timestamp_bucket'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for time_bucket
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."time_bucket"("bucket_width" interval, "ts" timestamptz, "offset" interval);
CREATE OR REPLACE FUNCTION "public"."time_bucket"("bucket_width" interval, "ts" timestamptz, "offset" interval)
  RETURNS "pg_catalog"."timestamptz" AS '$libdir/timescaledb-2.11.1', 'ts_timestamptz_offset_bucket'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for time_bucket
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."time_bucket"("bucket_width" interval, "ts" timestamptz, "timezone" text, "origin" timestamptz, "offset" interval);
CREATE OR REPLACE FUNCTION "public"."time_bucket"("bucket_width" interval, "ts" timestamptz, "timezone" text, "origin" timestamptz=NULL::timestamp with time zone, "offset" interval=NULL::interval)
  RETURNS "pg_catalog"."timestamptz" AS '$libdir/timescaledb-2.11.1', 'ts_timestamptz_timezone_bucket'
  LANGUAGE c IMMUTABLE
  COST 1;

-- ----------------------------
-- Function structure for time_bucket
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."time_bucket"("bucket_width" interval, "ts" timestamp);
CREATE OR REPLACE FUNCTION "public"."time_bucket"("bucket_width" interval, "ts" timestamp)
  RETURNS "pg_catalog"."timestamp" AS '$libdir/timescaledb-2.11.1', 'ts_timestamp_bucket'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for time_bucket
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."time_bucket"("bucket_width" interval, "ts" date, "offset" interval);
CREATE OR REPLACE FUNCTION "public"."time_bucket"("bucket_width" interval, "ts" date, "offset" interval)
  RETURNS "pg_catalog"."date" AS '$libdir/timescaledb-2.11.1', 'ts_date_offset_bucket'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for time_bucket
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."time_bucket"("bucket_width" int8, "ts" int8);
CREATE OR REPLACE FUNCTION "public"."time_bucket"("bucket_width" int8, "ts" int8)
  RETURNS "pg_catalog"."int8" AS '$libdir/timescaledb-2.11.1', 'ts_int64_bucket'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for time_bucket
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."time_bucket"("bucket_width" int8, "ts" int8, "offset" int8);
CREATE OR REPLACE FUNCTION "public"."time_bucket"("bucket_width" int8, "ts" int8, "offset" int8)
  RETURNS "pg_catalog"."int8" AS '$libdir/timescaledb-2.11.1', 'ts_int64_bucket'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for time_bucket
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."time_bucket"("bucket_width" int2, "ts" int2, "offset" int2);
CREATE OR REPLACE FUNCTION "public"."time_bucket"("bucket_width" int2, "ts" int2, "offset" int2)
  RETURNS "pg_catalog"."int2" AS '$libdir/timescaledb-2.11.1', 'ts_int16_bucket'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for time_bucket
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."time_bucket"("bucket_width" int4, "ts" int4, "offset" int4);
CREATE OR REPLACE FUNCTION "public"."time_bucket"("bucket_width" int4, "ts" int4, "offset" int4)
  RETURNS "pg_catalog"."int4" AS '$libdir/timescaledb-2.11.1', 'ts_int32_bucket'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for time_bucket
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."time_bucket"("bucket_width" int4, "ts" int4);
CREATE OR REPLACE FUNCTION "public"."time_bucket"("bucket_width" int4, "ts" int4)
  RETURNS "pg_catalog"."int4" AS '$libdir/timescaledb-2.11.1', 'ts_int32_bucket'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for time_bucket
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."time_bucket"("bucket_width" int2, "ts" int2);
CREATE OR REPLACE FUNCTION "public"."time_bucket"("bucket_width" int2, "ts" int2)
  RETURNS "pg_catalog"."int2" AS '$libdir/timescaledb-2.11.1', 'ts_int16_bucket'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for time_bucket
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."time_bucket"("bucket_width" interval, "ts" date);
CREATE OR REPLACE FUNCTION "public"."time_bucket"("bucket_width" interval, "ts" date)
  RETURNS "pg_catalog"."date" AS '$libdir/timescaledb-2.11.1', 'ts_date_bucket'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for time_bucket
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."time_bucket"("bucket_width" interval, "ts" date, "origin" date);
CREATE OR REPLACE FUNCTION "public"."time_bucket"("bucket_width" interval, "ts" date, "origin" date)
  RETURNS "pg_catalog"."date" AS '$libdir/timescaledb-2.11.1', 'ts_date_bucket'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for time_bucket_gapfill
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."time_bucket_gapfill"("bucket_width" interval, "ts" timestamptz, "start" timestamptz, "finish" timestamptz);
CREATE OR REPLACE FUNCTION "public"."time_bucket_gapfill"("bucket_width" interval, "ts" timestamptz, "start" timestamptz=NULL::timestamp with time zone, "finish" timestamptz=NULL::timestamp with time zone)
  RETURNS "pg_catalog"."timestamptz" AS '$libdir/timescaledb-2.11.1', 'ts_gapfill_timestamptz_bucket'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for time_bucket_gapfill
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."time_bucket_gapfill"("bucket_width" interval, "ts" date, "start" date, "finish" date);
CREATE OR REPLACE FUNCTION "public"."time_bucket_gapfill"("bucket_width" interval, "ts" date, "start" date=NULL::date, "finish" date=NULL::date)
  RETURNS "pg_catalog"."date" AS '$libdir/timescaledb-2.11.1', 'ts_gapfill_date_bucket'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for time_bucket_gapfill
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."time_bucket_gapfill"("bucket_width" int2, "ts" int2, "start" int2, "finish" int2);
CREATE OR REPLACE FUNCTION "public"."time_bucket_gapfill"("bucket_width" int2, "ts" int2, "start" int2=NULL::smallint, "finish" int2=NULL::smallint)
  RETURNS "pg_catalog"."int2" AS '$libdir/timescaledb-2.11.1', 'ts_gapfill_int16_bucket'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for time_bucket_gapfill
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."time_bucket_gapfill"("bucket_width" int4, "ts" int4, "start" int4, "finish" int4);
CREATE OR REPLACE FUNCTION "public"."time_bucket_gapfill"("bucket_width" int4, "ts" int4, "start" int4=NULL::integer, "finish" int4=NULL::integer)
  RETURNS "pg_catalog"."int4" AS '$libdir/timescaledb-2.11.1', 'ts_gapfill_int32_bucket'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for time_bucket_gapfill
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."time_bucket_gapfill"("bucket_width" int8, "ts" int8, "start" int8, "finish" int8);
CREATE OR REPLACE FUNCTION "public"."time_bucket_gapfill"("bucket_width" int8, "ts" int8, "start" int8=NULL::bigint, "finish" int8=NULL::bigint)
  RETURNS "pg_catalog"."int8" AS '$libdir/timescaledb-2.11.1', 'ts_gapfill_int64_bucket'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for time_bucket_gapfill
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."time_bucket_gapfill"("bucket_width" interval, "ts" timestamptz, "timezone" text, "start" timestamptz, "finish" timestamptz);
CREATE OR REPLACE FUNCTION "public"."time_bucket_gapfill"("bucket_width" interval, "ts" timestamptz, "timezone" text, "start" timestamptz=NULL::timestamp with time zone, "finish" timestamptz=NULL::timestamp with time zone)
  RETURNS "pg_catalog"."timestamptz" AS '$libdir/timescaledb-2.11.1', 'ts_gapfill_timestamptz_timezone_bucket'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for time_bucket_gapfill
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."time_bucket_gapfill"("bucket_width" interval, "ts" timestamp, "start" timestamp, "finish" timestamp);
CREATE OR REPLACE FUNCTION "public"."time_bucket_gapfill"("bucket_width" interval, "ts" timestamp, "start" timestamp=NULL::timestamp without time zone, "finish" timestamp=NULL::timestamp without time zone)
  RETURNS "pg_catalog"."timestamp" AS '$libdir/timescaledb-2.11.1', 'ts_gapfill_timestamp_bucket'
  LANGUAGE c VOLATILE
  COST 1;

-- ----------------------------
-- Function structure for timescaledb_fdw_handler
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."timescaledb_fdw_handler"();
CREATE OR REPLACE FUNCTION "public"."timescaledb_fdw_handler"()
  RETURNS "pg_catalog"."fdw_handler" AS '$libdir/timescaledb-2.11.1', 'ts_timescaledb_fdw_handler'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for timescaledb_fdw_validator
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."timescaledb_fdw_validator"(_text, oid);
CREATE OR REPLACE FUNCTION "public"."timescaledb_fdw_validator"(_text, oid)
  RETURNS "pg_catalog"."void" AS '$libdir/timescaledb-2.11.1', 'ts_timescaledb_fdw_validator'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for timescaledb_post_restore
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."timescaledb_post_restore"();
CREATE OR REPLACE FUNCTION "public"."timescaledb_post_restore"()
  RETURNS "pg_catalog"."bool" AS $BODY$
DECLARE
    db text;
BEGIN
    SELECT current_database() INTO db;
    EXECUTE format($$ALTER DATABASE %I RESET timescaledb.restoring $$, db);
    -- we cannot use reset here because the reset_val might not be off
    SET timescaledb.restoring TO off;
    PERFORM _timescaledb_internal.restart_background_workers();

    --try to restore the backed up uuid, if the restore did not set one
    INSERT INTO _timescaledb_catalog.metadata
       SELECT 'exported_uuid', value, include_in_telemetry FROM _timescaledb_catalog.metadata WHERE key='exported_uuid_bak'
       ON CONFLICT DO NOTHING;
    DELETE FROM _timescaledb_catalog.metadata WHERE key='exported_uuid_bak';

    RETURN true;
END
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  SET "search_path"="""""""""pg_catalog, pg_temp""""""""";

-- ----------------------------
-- Function structure for timescaledb_pre_restore
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."timescaledb_pre_restore"();
CREATE OR REPLACE FUNCTION "public"."timescaledb_pre_restore"()
  RETURNS "pg_catalog"."bool" AS $BODY$
DECLARE
    db text;
BEGIN
    SELECT current_database() INTO db;
    EXECUTE format($$ALTER DATABASE %I SET timescaledb.restoring ='on'$$, db);
    SET SESSION timescaledb.restoring = 'on';
    PERFORM _timescaledb_internal.stop_background_workers();
    --exported uuid may be included in the dump so backup the version
    UPDATE _timescaledb_catalog.metadata SET key='exported_uuid_bak' WHERE key='exported_uuid';
    RETURN true;
END
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  SET "search_path"="""""""""pg_catalog, pg_temp""""""""";

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."admins_admin_id_seq"
OWNED BY "public"."admin"."id";
SELECT setval('"public"."admins_admin_id_seq"', 29, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."company_company_id_seq"
OWNED BY "public"."company"."id";
SELECT setval('"public"."company_company_id_seq"', 22, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."doors_doors_id_seq"
OWNED BY "public"."doors"."id";
SELECT setval('"public"."doors_doors_id_seq"', 18, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."guest_permission_new_id_seq"
OWNED BY "public"."guest_permission"."id";
SELECT setval('"public"."guest_permission_new_id_seq"', 8, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."guests_id_seq"
OWNED BY "public"."guests"."id";
SELECT setval('"public"."guests_id_seq"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."permission_permission_id_seq"
OWNED BY "public"."permission"."id";
SELECT setval('"public"."permission_permission_id_seq"', 35, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."subadmin_id_seq"
OWNED BY "public"."compadmin"."id";
SELECT setval('"public"."subadmin_id_seq"', 24, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."users_id_seq"
OWNED BY "public"."users"."id";
SELECT setval('"public"."users_id_seq"', 16, true);

-- ----------------------------
-- Uniques structure for table admin
-- ----------------------------
ALTER TABLE "public"."admin" ADD CONSTRAINT "mail" UNIQUE ("mail");

-- ----------------------------
-- Primary Key structure for table admin
-- ----------------------------
ALTER TABLE "public"."admin" ADD CONSTRAINT "admins_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table compadmin
-- ----------------------------
ALTER TABLE "public"."compadmin" ADD CONSTRAINT "unique_mail" UNIQUE ("mail");

-- ----------------------------
-- Primary Key structure for table compadmin
-- ----------------------------
ALTER TABLE "public"."compadmin" ADD CONSTRAINT "subadmin_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table company
-- ----------------------------
ALTER TABLE "public"."company" ADD CONSTRAINT "company_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table doors
-- ----------------------------
ALTER TABLE "public"."doors" ADD CONSTRAINT "doors_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table guest_permission
-- ----------------------------
ALTER TABLE "public"."guest_permission" ADD CONSTRAINT "guest_permission_new_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table guests
-- ----------------------------
ALTER TABLE "public"."guests" ADD CONSTRAINT "guests_mail_key" UNIQUE ("mail");

-- ----------------------------
-- Primary Key structure for table guests
-- ----------------------------
ALTER TABLE "public"."guests" ADD CONSTRAINT "guests_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table permission
-- ----------------------------
ALTER TABLE "public"."permission" ADD CONSTRAINT "permission_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table subadmin
-- ----------------------------
ALTER TABLE "public"."subadmin" ADD CONSTRAINT "subadmin_pkey1" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table compadmin
-- ----------------------------
ALTER TABLE "public"."compadmin" ADD CONSTRAINT "subadmin_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "public"."admin" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."compadmin" ADD CONSTRAINT "subadmin_comp_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."company" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table company
-- ----------------------------
ALTER TABLE "public"."company" ADD CONSTRAINT "company_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "public"."admin" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table doors
-- ----------------------------
ALTER TABLE "public"."doors" ADD CONSTRAINT "doors_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "public"."admin" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."doors" ADD CONSTRAINT "doors_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."company" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."doors" ADD CONSTRAINT "doors_subadmin_id_fkey" FOREIGN KEY ("compadmin_id") REFERENCES "public"."compadmin" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table guest_permission
-- ----------------------------
ALTER TABLE "public"."guest_permission" ADD CONSTRAINT "guest_permission_door_id_fkey" FOREIGN KEY ("door_id") REFERENCES "public"."doors" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."guest_permission" ADD CONSTRAINT "guest_permission_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "public"."guests" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table guests
-- ----------------------------
ALTER TABLE "public"."guests" ADD CONSTRAINT "guests_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "public"."admin" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."guests" ADD CONSTRAINT "guests_cadmin_id_fkey" FOREIGN KEY ("compadmin_id") REFERENCES "public"."compadmin" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."guests" ADD CONSTRAINT "guests_comp_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."company" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."guests" ADD CONSTRAINT "guests_sadmin_id_fkey" FOREIGN KEY ("subadmin_id") REFERENCES "public"."subadmin" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table logs
-- ----------------------------
ALTER TABLE "public"."logs" ADD CONSTRAINT "logs_door_id_fkey" FOREIGN KEY ("door_id") REFERENCES "public"."doors" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."logs" ADD CONSTRAINT "logs_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "public"."guests" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."logs" ADD CONSTRAINT "logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table permission
-- ----------------------------
ALTER TABLE "public"."permission" ADD CONSTRAINT "permission_door_id_fkey" FOREIGN KEY ("door_id") REFERENCES "public"."doors" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."permission" ADD CONSTRAINT "permission_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table subadmin
-- ----------------------------
ALTER TABLE "public"."subadmin" ADD CONSTRAINT "subadmin_admin_id_fkey1" FOREIGN KEY ("admin_id") REFERENCES "public"."admin" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."subadmin" ADD CONSTRAINT "subadmin_cadmin_id_fkey" FOREIGN KEY ("compadmin_id") REFERENCES "public"."compadmin" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."subadmin" ADD CONSTRAINT "subadmin_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."company" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "public"."admin" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."users" ADD CONSTRAINT "users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."company" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."users" ADD CONSTRAINT "users_subadmin_id_fkey" FOREIGN KEY ("compadmin_id") REFERENCES "public"."compadmin" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
