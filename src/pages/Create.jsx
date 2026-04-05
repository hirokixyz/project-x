import { useState, useEffect } from "react";

import CollectionSelector from "../components/CollectionSelector";
import Tabs from "../components/Tabs";
import SelectedSection from "../components/SelectedSection";
import ModelsSection from "../components/ModelsSection";
import BackgroundsSection from "../components/BackgroundsSection";
import Subscription from "../components/Subscription";
import { createRequest } from "../api/api";

import { collections } from "../data/collections";
import { models } from "../data/models";
import { backdrops } from "../data/backgrounds";

export default function Create() {

  const [index, setIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedModels, setSelectedModels] = useState([]);
  const [modelSearch, setModelSearch] = useState("");

  const [selectedBackgrounds, setSelectedBackgrounds] = useState([]);
  const [bgSearch, setBgSearch] = useState("");

  const [activeTab, setActiveTab] = useState("");

  const [notify, setNotify] = useState(false);
  const [autoBuy, setAutoBuy] = useState(false);

  const [notifyPrice, setNotifyPrice] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [buyAmount, setBuyAmount] = useState("");

  const currentCollection = collections[index];

  const filteredCollections = collections.filter(col =>
    col.name.toLowerCase().includes(search.toLowerCase())
  );

  const isValid =
    (notify || autoBuy) &&
    (!notify || notifyPrice !== "") &&
    (!autoBuy || (buyPrice !== "" && buyAmount !== ""));

  useEffect(() => {
    setSelectedModels([]);
  }, [index]);

  function next() {
    setIndex(index === collections.length - 1 ? 0 : index + 1);
  }

  function prev() {
    setIndex(index === 0 ? collections.length - 1 : index - 1);
  }

  async function handleCreate() {
    const data = {
      user_id: 735946392,
      collection_id: collections[index].id,

      model_ids: selectedModels.map(m => m.id),
      backdrop_ids: selectedBackgrounds.map(b => b.id),

      notif_enabled: notify ? 1 : 0,
      notif_price: notify ? Number(notifyPrice) : null,

      buy_enabled: autoBuy ? 1 : 0,
      buy_price: autoBuy ? Number(buyPrice) : null,
      quantity: autoBuy ? Number(buyAmount) : null,

    };

    await createRequest(data);

    alert("Create Done ✅");
  }

  return (
    <div className="app">

      <div className="top-bar">
        <CollectionSelector
          collections={collections}
          index={index}
          next={next}
          prev={prev}
          onClick={() => setShowPopup(true)}
        />
      </div>

      <div className="main-content">

        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <SelectedSection
          selectedModels={selectedModels}
          selectedBackgrounds={selectedBackgrounds}
          setSelectedModels={setSelectedModels}
          setSelectedBackgrounds={setSelectedBackgrounds}
        />

        <ModelsSection
          activeTab={activeTab}
          models={models}
          collections={collections}
          index={index}
          modelSearch={modelSearch}
          setModelSearch={setModelSearch}
          selectedModels={selectedModels}
          setSelectedModels={setSelectedModels}
        />

        <BackgroundsSection
          activeTab={activeTab}
          backdrops={backdrops}
          collections={collections}
          index={index}
          bgSearch={bgSearch}
          setBgSearch={setBgSearch}
          selectedBackgrounds={selectedBackgrounds}
          setSelectedBackgrounds={setSelectedBackgrounds}
        />

        {showPopup && (
          <div className="popup" onClick={() => setShowPopup(false)}>
            <div
              className="popup-content"
              onClick={(e) => e.stopPropagation()}
            >

              <div className="search-bar">
                <input
                  className="search-input"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <button
                  className="close-btn"
                  onClick={() => setShowPopup(false)}
                >
                  ✕
                </button>
              </div>

              <div className="grid">
                {filteredCollections.map((col) => (
                  <div
                    key={col.id}
                    className="popup-item"
                    onClick={() => {
                      setIndex(collections.findIndex(c => c.id === col.id));
                      setShowPopup(false);
                    }}
                  >
                    <img src={col.image} />
                    <span className="item-name">{col.name}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        <Subscription
          collection={collections[index]}
          notify={notify}
          setNotify={setNotify}
          autoBuy={autoBuy}
          setAutoBuy={setAutoBuy}
          notifyPrice={notifyPrice}
          setNotifyPrice={setNotifyPrice}
          buyPrice={buyPrice}
          setBuyPrice={setBuyPrice}
          buyAmount={buyAmount}
          setBuyAmount={setBuyAmount}
          handleCreate={handleCreate}
          isValid={isValid}
        />

      </div>
    </div>
  );
}