export default function CollectionSelector({
  collections,
  index,
  next,
  prev,
  onClick,
}) {
  return (
    <div className="collection-selector">
      <button className="nav-btn" onClick={prev}>
        ←
      </button>

      <div className="collection-box" onClick={onClick}>
        <img
          src={collections[index].image}
          className="collection-img"
        />
        {collections[index].name}
      </div>

      <button className="nav-btn" onClick={next}>
        →
      </button>
    </div>
  );
}