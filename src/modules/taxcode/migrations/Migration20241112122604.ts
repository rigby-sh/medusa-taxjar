import { Migration } from '@mikro-orm/migrations';

export class Migration20241112122604 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "tax_code" ("id" text not null, "name" text not null default \'\', "description" text not null default \'\', "code" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "tax_code_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "tax_code" cascade;');
  }

}
