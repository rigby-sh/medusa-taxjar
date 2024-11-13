import { ExecArgs } from "@medusajs/framework/types";
import TaxJarClient from "../modules/taxjar/client";
import { logger } from "@medusajs/framework";
import TaxCodeService from "../modules/taxcode/service";

export default async function seedTaxCodes({ container }: ExecArgs) {
  const taxjarClient = new TaxJarClient(
    process.env.TAXJAR_API_KEY,
    container.resolve("logger")
  );

  const taxCodeService = container.resolve("Taxcode") as TaxCodeService;

  const entries = await taxjarClient.getTaxCategories();

  await taxCodeService.createTaxCodes(
    entries.map((e) => {
      return {
        name: e.name,
        description: e.description,
        code: e.product_tax_code,
      };
    })
  );
  logger.log(`Created ${entries.length} entries!`);
}
