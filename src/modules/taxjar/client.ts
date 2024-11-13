import axios, { AxiosError } from "axios";
import { TaxTypes } from "@medusajs/framework/types";

import { Logger } from "@medusajs/medusa";
import { MedusaError, MedusaErrorTypes } from "@medusajs/framework/utils";
import { TaxCategory, TaxResponse, TaxResponseSchema } from "./types/types";

export type TaxJarItemLine = {
  id: string;
  quantity: number;
  unit_price: number;
  discount: number;
  product_tax_code: string;
};

export default class TaxJarClient {
  static API_ENDPOINT = "https://api.taxjar.com/v2/";
  constructor(private readonly apiKey: string, private logger: Logger) {}

  private async privateCall(
    method: "GET" | "POST",
    resource: string,
    data?: any
  ) {
    try {
      const response = await axios.request({
        baseURL: TaxJarClient.API_ENDPOINT,
        url: resource,
        method: method,
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
        data,
      });

      return response.data;
    } catch (e: any) {
      const error = e as AxiosError;

      this.logger.warn(
        `TaxJarClient |${method} ${resource}|: ${error.message}`
      );
      throw new MedusaError(
        MedusaErrorTypes.UNEXPECTED_STATE,
        "TaxJar request failed"
      );
    }
  }

  async getTaxCategories() {
    const response = await this.privateCall("GET", "/categories");
    return response.categories as TaxCategory[];
  }

  async getTaxRatesForOrder(
    itemLines: TaxJarItemLine[],
    shippingCost: number,
    context: TaxTypes.TaxCalculationContext
  ): Promise<TaxResponse> {
    const response = await this.privateCall("POST", "/taxes", {
      to_country: context.address.country_code,
      to_zip: context.address.postal_code,
      to_state: context.address.province_code,
      to_city: context.address.city,
      to_street: context.address.address_1,
      shipping: shippingCost,
      line_items: itemLines,
    });

    try {
      const parsedResponse = TaxResponseSchema.parse(response);
      return parsedResponse;
    } catch {
      this.logger.warn(`TaxJarClient: unable to parse tax response`);

      throw new MedusaError(
        MedusaErrorTypes.INVALID_DATA,
        "TaxJarClient: unable to parse tax response"
      );
    }
  }
}
