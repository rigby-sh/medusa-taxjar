import { Migration } from '@mikro-orm/migrations';

export class Migration20241112123135 extends Migration {

  async up(): Promise<void> {
    this.addSql('CREATE UNIQUE INDEX IF NOT EXISTS "IDX_tax_code_code_unique" ON "tax_code" (code) WHERE deleted_at IS NULL;');
  }

  async down(): Promise<void> {
    this.addSql('drop index if exists "IDX_tax_code_code_unique";');
  }

}
