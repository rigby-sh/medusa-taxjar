import { Button, Text } from "@medusajs/ui";

import { SectionRow } from "./SectionRow";
import Select from "react-dropdown-select";
import { useEffect, useState } from "react";
import { sdk } from "../lib/config";

type TaxCode = {
  id: string;
  name: string;
  description: string;
  code: string;
};

export const AssignCategoryTaxcodeComponent = ({
  categoryId,
  setEditMode,
}: {
  categoryId: string;
  setEditMode: Function;
}) => {
  const [codes, setCodes] = useState<TaxCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedValue, setSelectedValue] = useState<TaxCode>();

  const setValues = (vals: TaxCode[]) => {
    setSelectedValue(vals[0]);
  };

  const save = () => {
    if (!selectedValue) {
      return;
    }

    sdk.client
      .fetch(`/admin/category/${categoryId}/taxcode`, {
        method: "POST",
        body: { taxCodeId: selectedValue.id },
      })
      .then((v) => {
        if (
          !!v &&
          typeof v === "object" &&
          "status" in v &&
          v.status === "created"
        ) {
          setEditMode(false);
        } else {
          setError("Unable to assign tax code");
        }
      });
  };

  useEffect(() => {
    if (!loading) {
      return;
    }

    sdk.client.fetch(`/admin/taxcodes`).then((v) => {
      setCodes(v as TaxCode[]);
      setLoading(false);
    });
  }, [loading]);

  return (
    <div className="px-6 py-4">
      <Select
        labelField="name"
        valueField="id"
        options={codes}
        values={[]}
        searchable
        searchBy="name"
        onChange={(values) => setValues(values)}
      />
      {selectedValue && (
        <>
          <SectionRow title="Code" value={selectedValue.code} />
          <SectionRow title="Name" value={selectedValue.name} />
          <SectionRow title="Description" value={selectedValue.description} />
          <Button
            onClick={save}
            type="button"
            size="small"
            variant="secondary"
            className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover flex-shrink-0"
          >
            {"Save"}
          </Button>
          {error && <Text className="text-red-500">{error}</Text>}
        </>
      )}
    </div>
  );
};
