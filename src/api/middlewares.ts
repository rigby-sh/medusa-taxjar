import { validateAndTransformBody } from "@medusajs/framework";
import { defineMiddlewares } from "@medusajs/medusa";
import { AssignTaxCodeValidator } from "./admin/validators";

export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/category/:categoryId/taxcode",
      method: ["POST"],
      middlewares: [validateAndTransformBody(AssignTaxCodeValidator)],
    },
  ],
});
