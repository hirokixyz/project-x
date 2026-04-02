export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="tabs">
      <button
        className={`tab ${activeTab === "models" ? "active" : ""}`}
        onClick={() =>
          setActiveTab(activeTab === "models" ? null : "models")
        }
      >
        All models
      </button>

      <button
        className={`tab ${activeTab === "backgrounds" ? "active" : ""}`}
        onClick={() =>
          setActiveTab(
            activeTab === "backgrounds" ? null : "backgrounds"
          )
        }
      >
        All backgrounds
      </button>
    </div>
  );
}