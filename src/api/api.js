const BASE_URL = "http://prem-eu4.bot-hosting.net:20428";

// إنشاء طلب
export async function createRequest(data) {
  const res = await fetch(`${BASE_URL}/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create request");
  }

  return await res.json();
}

// جلب طلبات المستخدم (للـ UI)
export async function getUserRequests(userId) {
  const res = await fetch(`${BASE_URL}/requests?user_id=${userId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch requests");
  }

  return await res.json();
}


export async function deleteRequest(id) {
  const res = await fetch(`${BASE_URL}/requests/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete");
  }

  return await res.json();
}



export async function updateRequest(id, data) {
  const res = await fetch(`${BASE_URL}/requests/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}