import { ITaxProvider, TaxTypes } from "@medusajs/framework/types";

import { Logger } from "@medusajs/medusa";
import TaxJarClient, { TaxJarItemLine } from "./client";
import { EntityManager } from "@mikro-orm/knex";

type InjectedDependencies = {
  logger: Logger;
  manager: EntityManager;
};

type TaxJarClientOptions = {
  id: string;
  options: {
    apiKey: string;
    defaultTaxcode: string;
  };
};

export default class TaxJarProvider implements ITaxProvider {
  static identifier = "tax-jar-provider";

  private taxJarClient: TaxJarClient;
  private defaultTaxcode: string;

  constructor(private deps: InjectedDependencies, opts: TaxJarClientOptions) {
    this.taxJarClient = new TaxJarClient(opts.options.apiKey, deps.logger);
    this.defaultTaxcode = opts.options.defaultTaxcode;
  }

  getIdentifier(): string {
    return TaxJarProvider.identifier;
  }

  async getTaxLines(
    itemLines: TaxTypes.ItemTaxCalculationLine[],
    shippingLines: TaxTypes.ShippingTaxCalculationLine[],
    context: TaxTypes.TaxCalculationContext
  ): Promise<(TaxTypes.ItemTaxLineDTO | TaxTypes.ShippingTaxLineDTO)[]> {
    if (itemLines.length === 0) {
      return [];
    }

    const items: TaxJarItemLine[] = [];
    for (let item of itemLines) {
      const product_tax_code = await this.getProductTaxCode(
        item.line_item.product_id
      );
      items.push({
        id: item.line_item.id,
        discount: 0,
        quantity: Number(item.line_item.quantity.toString()),
        unit_price: Number(item.line_item.unit_price.toString()),
        product_tax_code,
      });
    }

    let shipping = shippingLines.reduce((acc, l) => {
      return (acc += Number(l.shipping_line.unit_price.toString()));
    }, 0);

    const { tax } = await this.taxJarClient.getTaxRatesForOrder(
      items,
      shipping,
      context
    );

    const itemTaxLines: TaxTypes.ItemTaxLineDTO[] =
      tax.breakdown.line_items.map((item) => {
        const itemVal = items.find((i) => i.id === item.id);
        return {
          line_item_id: item.id,
          rate: item.combined_tax_rate * 100, // Fraction to percent conversion
          code: itemVal.product_tax_code,
          provider_id: this.getIdentifier(),
          name: `TaxJar-${itemVal.product_tax_code}`,
        };
      });

    const shippingTaxLines: TaxTypes.ShippingTaxLineDTO[] = shippingLines.map(
      (i) => {
        return {
          shipping_line_id: i.shipping_line.id,
          code: "SHIPPING",
          name: "SHIPPING",
          provider_id: this.getIdentifier(),
          rate: tax.freight_taxable
            ? tax.breakdown.shipping.combined_tax_rate * 100 // Fraction to percent conversion
            : 0,
        };
      }
    );

    return [...itemTaxLines, ...shippingTaxLines];
  }

  private async getProductTaxCode(productId: string) {
    const query = `select code from tax_code tc 
      join product_product_category_taxcode_tax_code ppcttc 
      on tc.id = ppcttc.tax_code_id 
      join product_category_product pcp 
      on ppcttc.product_category_id = pcp.product_category_id 
      where pcp.product_id = ?;`;
    const [codeObj] = await this.deps.manager.execute(query, [productId]);
    return codeObj.code || this.defaultTaxcode || "";
  }
}
