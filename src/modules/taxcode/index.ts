import { Module } from "@medusajs/framework/utils";
import TaxCodeService from "./service";

export default Module("Taxcode", {
  service: TaxCodeService,
});
