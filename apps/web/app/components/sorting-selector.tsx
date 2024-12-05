import { FC } from "react";

interface SortingSelectorProps {
  sortingOptions: { value: string; label: string }[];
  sortBy: string | undefined;
  sortOrder: "asc" | "desc" | undefined;
  onSetSortBy: (value: string | undefined) => void;
  onSetSortOrder: (value: "asc" | "desc" | undefined) => void;
}

export const SortingSelector: FC<SortingSelectorProps> = ({
  sortBy,
  sortOrder,
  onSetSortBy,
  onSetSortOrder,
  sortingOptions,
}) => {
  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (!value || value === "none") {
      onSetSortOrder(undefined);

      onSetSortBy(undefined);
      
      return;
    }

    onSetSortBy(value);
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "asc" | "desc";

    onSetSortOrder(value || undefined);
  };

  return (
    <div className="flex space-x-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Sort By
        </label>
        <select
          value={sortBy || ""}
          onChange={handleSortByChange}
          className="mt-1 p-2 h-[42] border border-gray-300 rounded"
        >
          <option value="">None</option>
          {sortingOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Sort Order
        </label>
        <select
          value={sortOrder || ""}
          onChange={handleSortOrderChange}
          className="mt-1 p-2 border h-[42] border-gray-300 rounded"
          disabled={!sortBy}
        >
          <option value="">None</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};
