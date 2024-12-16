"use client";

import { useEffect, useState } from "react";

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

interface Course {
  title: string;
}

interface Purchase {
  id: string;
  user: User;
  course: Course | null;
  status: "PROCESSING" | "ACCEPTED" | "REJECTED";
}

const Page: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [filteredPurchases, setFilteredPurchases] = useState<Purchase[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await fetch("/api/admin/fetch-purchases");
        if (!res.ok) {
          throw new Error(`Failed to fetch purchase demands: ${res.status}`);
        }
        const data: Purchase[] = await res.json();
        setPurchases(data);
        setFilteredPurchases(data); // Initialize filtered purchases
      } catch (err) {
        console.error(err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  useEffect(() => {
    filterPurchases(search, selectedStatus);
  }, [search, selectedStatus, purchases]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const filterPurchases = (searchValue: string, statusFilter: string) => {
    const filtered = purchases.filter((purchase) => {
      const isEmailMatch = purchase.user.email.toLowerCase().includes(searchValue);
      const isStatusMatch = statusFilter === "ALL" || purchase.status === statusFilter;
      return isEmailMatch && isStatusMatch;
    });
    setFilteredPurchases(filtered);
  };

  const handleApprove = async (purchaseId: string) => {
    try {
      const res = await fetch("/api/admin/approve-purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchaseId }),
      });

      if (!res.ok) {
        throw new Error(`Failed to approve purchase: ${res.status}`);
      }

      // Update the status of the purchase in the frontend
      setFilteredPurchases((prev) =>
        prev.map((purchase) =>
          purchase.id === purchaseId
            ? { ...purchase, status: "ACCEPTED" }
            : purchase
        )
      );
    } catch (err) {
      console.error(err);
      alert("Error approving purchase. Please try again.");
    }
  };

  const handleReject = async (purchaseId: string) => {
    try {
      const res = await fetch("/api/admin/rejecte-purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchaseId }),
      });

      if (!res.ok) {
        throw new Error(`Failed to approve purchase: ${res.status}`);
      }
      // Update the status of the purchase in the frontend
      setFilteredPurchases((prev) =>
        prev.map((purchase) =>
          purchase.id === purchaseId
            ? { ...purchase, status: "REJECTED" }
            : purchase
        )
      );
    } catch (err) {
      console.error(err);
      alert("Error rejecting purchase. Please try again.");
    }
  };
  const handleProcessing = async (purchaseId: string) => {
    try {
      const res = await fetch("/api/admin/proccess-purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchaseId }),
      });

      if (!res.ok) {
        throw new Error(`Failed to approve purchase: ${res.status}`);
      }
      // Update the status of the purchase in the frontend
      setFilteredPurchases((prev) =>
        prev.map((purchase) =>
          purchase.id === purchaseId
            ? { ...purchase, status: "PROCESSING" }
            : purchase
        )
      );
    } catch (err) {
      console.error(err);
      alert("Error rejecting purchase. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <h1 className="text-center">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Pending Course Approvals</h1>

        {/* Search and Status Filter */}
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={handleSearch}
            className="border p-2 rounded w-1/2 shadow-sm focus:ring focus:ring-blue-200"
          />
          <select
            value={selectedStatus}
            onChange={handleStatusFilterChange}
            className="border p-2 rounded shadow-sm"
          >
            <option value="ALL">All Statuses</option>
            <option value="PROCESSING">Processing</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        {/* Purchases Table */}
        <table className="min-w-full border-collapse bg-white shadow-sm">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">First Name</th>
              <th className="p-4 text-left">Last Name</th>
              <th className="p-4 text-left">Course Title</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchases.map((purchase) => (
              <tr
                key={purchase.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4">{purchase.user.email}</td>
                <td className="p-4">{purchase.user.firstName}</td>
                <td className="p-4">{purchase.user.lastName}</td>
                <td className="p-4">{purchase.course?.title || "N/A"}</td>
                <td className="p-4">{purchase.status}</td>
                <td className="p-4 flex gap-2">
                  {purchase.status === "PROCESSING" && (
                    <>
                      <button
                        onClick={() => handleApprove(purchase.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(purchase.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {purchase.status === "ACCEPTED" && (
                    <button
                      onClick={() => handleReject(purchase.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                  )}
                  {purchase.status === "REJECTED" && (
                    <button
                      onClick={() => handleProcessing(purchase.id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                    >
                      Mark as Processing
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
