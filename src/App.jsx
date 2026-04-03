import { useState } from "react";
import { useEffect } from "react";


import CollectionSelector from "./components/CollectionSelector";
import Tabs from "./components/Tabs";
import SelectedSection from "./components/SelectedSection";
import ModelsSection from "./components/ModelsSection";
import BackgroundsSection from "./components/BackgroundsSection";
import Subscription from "./components/Subscription";


import { collections } from "./data/collections";
import { models } from "./data/models";
import { backdrops } from "./data/backgrounds";

export default function App() {

// ============================================================================= //
  const [index, setIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [search, setSearch] = useState("");
  const [showModels, setShowModels] = useState(false);
  const currentCollection = collections[index];
  const [selectedModels, setSelectedModels] = useState([]);
  const [modelSearch, setModelSearch] = useState("");

  const [showBackgrounds, setShowBackgrounds] = useState(false);
  const [selectedBackgrounds, setSelectedBackgrounds] = useState([]);
  const [bgSearch, setBgSearch] = useState("");

  const [activeTab, setActiveTab] = useState("models");

  const [notify, setNotify] = useState(false);
  const [autoBuy, setAutoBuy] = useState(false);

  const [notifyPrice, setNotifyPrice] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [buyAmount, setBuyAmount] = useState("");


  const filteredCollections = collections.filter(col =>
  col.name.toLowerCase().includes(search.toLowerCase()));

  const filteredModels = models.filter(
    (m) => m.collectionId === currentCollection.id);


  const isValid =
    (notify || autoBuy) &&

    (!notify || notifyPrice !== "") &&

    (!autoBuy || (buyPrice !== "" && buyAmount !== ""));

    
  useEffect(() => {
    setSelectedModels([]);
  }, [index]);


// ============================================================================= //
    

// ============================================================================= //
  function next() {
    if (index === collections.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }
// ============================================================================= //


// ============================================================================= //
  function prev() {
    if (index === 0) {
      setIndex(collections.length - 1);
    } else {
      setIndex(index - 1);
    }
  }
// ============================================================================= //


// ============================================================================= //
  function selectModel(model) {
    setSelectedModels((prev) => [...prev, model]);
  }
// ============================================================================= //


// ============================================================================= //
  function removeModel(model) {
    setSelectedModels((prev) =>
      prev.filter((m) => m.id !== model.id)
    );
}
// ============================================================================= //


// ============================================================================= //
function handleCreate() {
  
  const data = {
    user_id: window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 0,

    collection_id: collections[index].id,

    model_ids: JSON.stringify(
      selectedModels.map((m) => m.id)
    ),

    backdrop_ids: JSON.stringify(
      selectedBackgrounds.map((b) => b.id)
    ),

    notif_enabled: notify ? 1 : 0,
    notif_price: notify ? Number(notifyPrice) : null,

    buy_enabled: autoBuy ? 1 : 0,
    buy_price: autoBuy ? Number(buyPrice) : null,
    quantity: autoBuy ? Number(buyAmount) : null,

    created_at: Date.now(),
  };


  if (!window.Telegram || !window.Telegram.WebApp) {
    alert("Not inside Telegram ❌");
    return;
  }

  window.Telegram.WebApp.sendData(JSON.stringify(data));
}
// ============================================================================= //


// ============================================================================= //
  return (
    <div className="app">

      <div className="top-bar">
        {/*Collection Selector*/}
        <CollectionSelector
          collections={collections}
          index={index}
          next={next}
          prev={prev}
          onClick={() => setShowPopup(true)}
        />
        {/**/}
      </div>

      <div className="main-content">

        {/*tabs*/}
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {/**/}



        {/*SelectedSection*/}
        <SelectedSection
          selectedModels={selectedModels}
          selectedBackgrounds={selectedBackgrounds}
          setSelectedModels={setSelectedModels}
          setSelectedBackgrounds={setSelectedBackgrounds}
        />
        {/**/}




        {/* ================================================================ */}
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
        {/* ================================================================ */}



        {/* ================================================================ */}
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
        {/* ================================================================ */}




        {/* COLLECTIONS POPUP*/}
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
                {filteredCollections.map((col, i) => (
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
        {/**/}




        {/* UI - LAST ADD */}
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
        {/**/}

      </div>

    {/* MAIN DEV END HERE */}
    </div>
  );
// ============================================================================= //


}