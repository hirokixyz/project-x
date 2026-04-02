export default function ModelsSection({
  activeTab,
  models,
  collections,
  index,
  modelSearch,
  setModelSearch,
  selectedModels,
  setSelectedModels,
}) {
  if (activeTab !== "models") return null;



// ===================================================================
  const filteredModels = models
    .filter((m) => m.collectionId === collections[index].id)
    .filter((m) =>
      m.name.toLowerCase().includes(modelSearch.toLowerCase())
    )
    .filter(
      (m) => !selectedModels.find((s) => s.id === m.id)
    );

  const groupedModels = {};

  filteredModels.forEach((model) => {
    const rarity = model.rarity_permille;

    if (!groupedModels[rarity]) {
      groupedModels[rarity] = [];
    }

    groupedModels[rarity].push(model);
  });

  const sortedRarities = Object.keys(groupedModels)
    .map(Number)
    .sort((a, b) => a - b);
// ===================================================================

  return (
    <>
      <input
        className="search-input"
        placeholder="Search..."
        value={modelSearch}
        onChange={(e) => setModelSearch(e.target.value)}
      />

      {sortedRarities.map((rarity) => (
        <div key={rarity} className="rarity-group">

          <div className="rarity-header">
            <span className="rarity-badge">
              {(rarity / 10).toFixed(1)}%
            </span>

            <button className="select-all">
              Select all
            </button>
          </div>

          <div className="models-grid">
            {groupedModels[rarity].map((m) => (
              <div
                key={m.id}
                className="model-card"
                onClick={() =>
                  setSelectedModels((prev) => [...prev, m])
                }
              >
                <img src={m.image} />
                <span>{m.name}</span>
              </div>
            ))}
          </div>

        </div>
      ))}
    </>
  );
}