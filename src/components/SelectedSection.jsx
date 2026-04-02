export default function SelectedSection({
  selectedModels,
  selectedBackgrounds,
  setSelectedModels,
  setSelectedBackgrounds,
}) {
  if (
    selectedModels.length === 0 &&
    selectedBackgrounds.length === 0
  )
    return null;

  return (
    <>
      {/* Models */}
      {selectedModels.length > 0 && (
        <div className="selected-section">
          <div className="selected-header">
            <span>
              Selected models ({selectedModels.length})
            </span>

            <button onClick={() => setSelectedModels([])}>
              Clear
            </button>
          </div>

          <div className="selected-grid">
            {selectedModels.map((item) => (
              <div
                key={item.id}
                className="model-card"
                onClick={() =>
                  setSelectedModels((prev) =>
                    prev.filter((x) => x.id !== item.id)
                  )
                }
              >
                <img src={item.image} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Backgrounds */}
      {selectedBackgrounds.length > 0 && (
        <div className="selected-section">
          <div className="selected-header">
            <span>
              Selected backgrounds ({selectedBackgrounds.length})
            </span>

            <button
              onClick={() => setSelectedBackgrounds([])}
            >
              Clear
            </button>
          </div>

          <div className="selected-grid">
            {selectedBackgrounds.map((item) => (
              <div
                key={item.id}
                className="model-card"
                onClick={() =>
                  setSelectedBackgrounds((prev) =>
                    prev.filter((x) => x.id !== item.id)
                  )
                }
              >
                <img src={item.image} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}