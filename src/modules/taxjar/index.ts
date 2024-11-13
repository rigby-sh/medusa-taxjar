import { ModuleProvider } from "@medusajs/utils";
import { Modules } from "@medusajs/framework/utils";
import TaxJarProvider from "./service";

export default ModuleProvider(Modules.TAX, {
  services: [TaxJarProvider],
});
