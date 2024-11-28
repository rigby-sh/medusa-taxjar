import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { Button, Container, Heading } from "@medusajs/ui";
import { useState, useEffect } from "react";
import { SectionRow } from "../components/SectionRow";
import { AssignCategoryTaxcodeComponent } from "../components/AssignCategoryTaxcode";
import { sdk } from "../lib/config";

const CategoryTaxcodeWidget = (props: any) => {
  const [taxCode, setTaxCode] = useState<any>({});
  const [editMode, setEditMode] = useState(false);

  const onEditClick = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    sdk.client.fetch(`/admin/category/${props.data.id}/taxcode`).then((v) => {
      if (!!v && typeof v === "object" && "tax_code" in v) {
        setTaxCode(v.tax_code);
      } else {
        setTaxCode({});
      }
    });
  }, [editMode]);

  return (
    <div>
      <Container className="divide-y p-0">
        <div className="flex items-center justify-between px-6 py-4">
          <Heading>US Taxcode</Heading>
          <Button
            onClick={onEditClick}
            type="button"
            size="small"
            variant="transparent"
            className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover flex-shrink-0"
          >
            {editMode ? "Cancel" : "Assign code"}
          </Button>
        </div>
        {editMode ? (
          <AssignCategoryTaxcodeComponent
            categoryId={props.data.id}
            setEditMode={setEditMode}
          />
        ) : (
          <>
            {taxCode?.code ? (
              <>
                <SectionRow title="Code" value={taxCode.code} />
                <SectionRow title="Name" value={taxCode.name} />
                <SectionRow title="Description" value={taxCode.description} />
              </>
            ) : (
              <SectionRow title="Code" value="-" />
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export const config = defineWidgetConfig({
  zone: "product_category.details.after",
});

export default CategoryTaxcodeWidget;
