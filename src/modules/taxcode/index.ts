import { Module } from "@medusajs/framework/utils";
import TaxCodeService from "./service";

export const TAX_CODE_SERVICE = "Taxcode";

export default Module(TAX_CODE_SERVICE, {
  service: TaxCodeService,
});
