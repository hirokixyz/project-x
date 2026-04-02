export default function BackgroundsSection({
  activeTab,
  backdrops,
  collections,
  index,
  bgSearch,
  setBgSearch,
  selectedBackgrounds,
  setSelectedBackgrounds,
}) {
  if (activeTab !== "backgrounds") return null;

  return (
    <>
      <input
        className="search-input"
        placeholder="Search..."
        value={bgSearch}
        onChange={(e) => setBgSearch(e.target.value)}
      />

      <div className="models-grid">
        {backdrops
          .slice(0, collections[index].max_backdrop_id + 1)
          .filter((b) =>
            b.name.toLowerCase().includes(bgSearch.toLowerCase())
          )
          .filter(
            (b) =>
              !selectedBackgrounds.find((s) => s.id === b.id)
          )
          .map((b) => (
            <div
              key={b.id}
              className="model-card"
              onClick={() =>
                setSelectedBackgrounds((prev) => [...prev, b])
              }
            >
              <img src={b.image} />
              <span>{b.name}</span>
            </div>
          ))}
      </div>
    </>
  );
}