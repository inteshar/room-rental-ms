import React, { useState } from "react";
import BinIcon from "../assets/delete.svg";
import CheckIcon from "../assets/check.png";
import { MaintenanceForm } from "./Forms";

function Maintenance() {
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState({
    description: "",
    status: "Open",
  });

  const [error, setError] = useState("");

  const addComplaint = (e) => {
    e.preventDefault();
    if (!newComplaint.description) {
      setError("Description are required.");
      return;
    }
    setComplaints([...complaints, newComplaint]);
    setNewComplaint({ description: "", status: "Open" });
    setError(""); // Clear any previous error
  };

  const updateComplaintStatus = (index, status) => {
    const updatedComplaints = complaints.map((complaint, i) =>
      i === index ? { ...complaint, status } : complaint
    );
    setComplaints(updatedComplaints);
  };

  return (
    <div className="px-5 mt-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Maintenance</h2>
      <MaintenanceForm
        {...{ newComplaint, setNewComplaint, addComplaint, error }}
      />

      <ComplaintList
        complaints={complaints}
        updateComplaintStatus={updateComplaintStatus}
      />
    </div>
  );
}

function ComplaintList({ complaints, updateComplaintStatus }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Maintenance List</h3>
      <ul className="flex flex-col gap-2">
        {complaints.length > 0 ? (
          complaints.map((complaint, index) => (
            <li
              key={index}
              className="flex items-center justify-between shadow px-4 py-3 border border-gray-200 rounded-lg"
            >
              <p className="w-2/4 text-sm text-gray-500">
                {complaint.description}
              </p>
              {complaint.status === "Open" ? (
                <p className="border border-red-500 text-sm text-red-500 rounded-md p-1 bg-red-100 font-bold text-xs">
                  Pending
                </p>
              ) : (
                <p className="border border-green-500 text-sm text-green-500 rounded-md p-1 bg-green-100 font-bold text-xs">
                  Solved
                </p>
              )}
              <button
                onClick={() =>
                  updateComplaintStatus(
                    index,
                    complaint.status === "Open" ? "Resolved" : "Open"
                  )
                }
                className="text-indigo-600 hover:text-indigo-900 mt-2"
              >
                <img
                  src={complaint.status === "Open" ? CheckIcon : BinIcon}
                  alt=""
                  className="h-8"
                />
              </button>
            </li>
          ))
        ) : (
          <li className="flex items-center justify-between shadow px-4 py-3 border border-gray-200 rounded-lg">
            No Maintenance issues filed yet.
          </li>
        )}
      </ul>
    </div>
  );
}

export default Maintenance;
