import { useEffect, useState } from "react";
import { getUserRequests } from "../api/api";

import { collections } from "../data/collections";
import { models } from "../data/models";
import { backdrops } from "../data/backgrounds";
import { deleteRequest } from "../api/api";



async function handleDelete(id) {
  if (!confirm("Delete this subscription?")) return;

  try {
    await deleteRequest(id);

    await loadRequests(); // 🔥 يجلب البيانات من جديد

  } catch (err) {
    console.error(err);
  }
}



export default function Subscriptions() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    try {
      const data = await getUserRequests(735946392);
      console.log("API DATA:", data);
      setRequests(data);
    } catch (err) {
      console.error("LOAD ERROR:", err);
    }
  }

  return (
    <div className="app">
      <div className="main-content">
        <h2>Subscriptions</h2>

        {requests.length === 0 ? (
          <p>No subscriptions</p>
        ) : (
          <div className="sub-grid">
            {requests.map((req, index) => {
              // 🔹 collection
              const collection = collections.find(
                (c) => String(c.id) === String(req.collection_id)
              );

              // 🔹 models
              let modelIds = [];
              if (Array.isArray(req.model_ids)) {
                modelIds = req.model_ids;
              }

              // 🔹 backgrounds
              let backdropIds = [];
              if (Array.isArray(req.backdrop_ids)) {
                backdropIds = req.backdrop_ids;
              }

              // 🔹 notification
              const notifyEnabled = req.notification?.enabled;
              const notifyPrice = req.notification?.max_price;

              // 🔹 buy
              const buyEnabled = req.buy?.enabled;
              const buyPrice = req.buy?.max_price;
              const buyQuantity = req.buy?.quantity;

              return (
                <div className="sub-card" key={index}>
                  
                  {/* Title + Image */}
                  <div className="sub-title">
                    <img
                      src={collection?.image}
                      style={{
                        width: "32px",
                        height: "32px",
                        marginBottom: "6px",
                      }}
                    />
                    <div>{collection?.name || "Unknown"}</div>
                  </div>

                  {/* Info */}
                  <div className="sub-info">
                    <p>
                      Models:{" "}
                      {modelIds.length
                        ? `${modelIds.length} selected`
                        : "All"}
                    </p>

                    <p>
                      Backgrounds:{" "}
                      {backdropIds.length
                        ? `${backdropIds.length} selected`
                        : "All"}
                    </p>

                    <p>
                      🔔{" "}
                      {notifyEnabled
                        ? `Up to ${notifyPrice} Ton`
                        : "No notify"}
                    </p>

                    <p>
                      💰{" "}
                      {buyEnabled
                        ? `Auto buy (${buyPrice}${
                            buyQuantity ? ` Ton × ${buyQuantity}` : ""
                          })`
                        : "No auto buy"}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="sub-actions">
                    <button className="sub-btn edit">Edit</button>

                    <button
                      className="sub-btn delete"
                      onClick={() => handleDelete(req.id)}
                    >
                      Delete
                    </button>

                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}