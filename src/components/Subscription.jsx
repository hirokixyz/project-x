export default function Subscription({
  collection,
  notify,
  setNotify,
  autoBuy,
  setAutoBuy,
  notifyPrice,
  setNotifyPrice,
  buyPrice,
  setBuyPrice,
  buyAmount,
  setBuyAmount,
  handleCreate,
  isValid,
}) {
  return (
    <div className="subscription">

      <h3>{collection.name}</h3>

      {/* Notify */}
      <div className="toggle">
        <span>Notify about prices </span>
        <label className="switch">

          <input
            type="checkbox"
            checked={notify}
            onChange={() => setNotify(!notify)}
          />
          <span className="slider"></span>

        </label>
      </div>

      {notify && (
        <input
          className="input small"
          placeholder="Enter notify price"
          value={notifyPrice}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*\.?\d*$/.test(value)) {
              setNotifyPrice(value);
            }
          }}
        />
      )}

      {/* Auto Buy */}
      <div className="toggle">
        <span>Enable auto purchase</span>

        <label className="switch">

          <input
            type="checkbox"
            checked={autoBuy}
            onChange={() => setAutoBuy(!autoBuy)}
          />
          <span className="slider"></span>

        </label>

      </div>

      {autoBuy && (
        <>
          <input
            className="input small"
            placeholder="Enter buy price"
            value={buyPrice}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                setBuyPrice(value);
              }
            }}
          />

          <input
            className="input small"
            placeholder="Enter amount"
            value={buyAmount}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setBuyAmount(value);
              }
            }}
          />
        </>
      )}

      <button
        className="create-btn"
        onClick={handleCreate}
        disabled={!isValid}
      >
        Create subscription
      </button>

    </div>
  );
}