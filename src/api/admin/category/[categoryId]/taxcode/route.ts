import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import {
  ContainerRegistrationKeys,
  MedusaError,
  MedusaErrorTypes,
  Modules,
} from "@medusajs/framework/utils";
import { AssignTaxCode } from "../../../validators";
import { TAX_CODE_SERVICE } from "../../../../../modules/taxcode";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const categoryId = req.params.categoryId;
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const { data } = await query.graph({
    entity: "product_category",
    fields: ["tax_code.*"],
    filters: {
      id: categoryId,
    },
  });

  if (data.length === 0) {
    throw new MedusaError(MedusaErrorTypes.NOT_FOUND, "Category not found!");
  }
  res.json(data[0]);
}

export async function POST(
  req: MedusaRequest<AssignTaxCode>,
  res: MedusaResponse
) {
  const categoryId = req.params.categoryId;

  const remoteLink = req.scope.resolve(ContainerRegistrationKeys.REMOTE_LINK);
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const { data } = await query.graph({
    entity: "product_category",
    fields: ["tax_code.*"],
    filters: {
      id: categoryId,
    },
  });

  if (data.length === 0) {
    throw new MedusaError(MedusaErrorTypes.NOT_FOUND, "Category not found!");
  }

  if (data[0].tax_code) {
    await remoteLink.dismiss({
      [Modules.PRODUCT]: {
        product_category_id: categoryId,
      },
      [TAX_CODE_SERVICE]: {
        tax_code_id: data[0].tax_code.id,
      },
    });
  }

  await remoteLink.create({
    [Modules.PRODUCT]: {
      product_category_id: categoryId,
    },
    [TAX_CODE_SERVICE]: {
      tax_code_id: req.body.taxCodeId,
    },
  });

  res.status(201).json({ status: "created" });
}
