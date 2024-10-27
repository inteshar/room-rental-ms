import React, { useState } from "react";
import EditIcon from "../assets/edit.svg";
import BinIcon from "../assets/delete.svg";
import PdfIcon from "../assets/pdf.png";
import { useNavigate } from "react-router-dom";
import { RoomForm } from "./Forms";

import jsPDF from "jspdf";
import "jspdf-autotable";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    number: "",
    floor: "",
    occupants: "",
    price: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewRoom((prevRoom) => ({ ...prevRoom, [id]: value }));
  };

  const addRoom = (e) => {
    e.preventDefault();
    if (
      !newRoom.number ||
      !newRoom.floor ||
      !newRoom.occupants ||
      !newRoom.price
    ) {
      return;
    }

    // If validation passes, add the room and reset form
    setRooms([...rooms, newRoom]);
    setNewRoom({ number: "", floor: "", occupants: "", price: "" });
  };

  const navigate = useNavigate();

  const handleBookRoom = (room) => {
    navigate("/bookings", { state: { room } });
  };

  return (
    <div className="px-5 mt-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Room Management</h2>
      <RoomForm
        newRoom={newRoom}
        handleChange={handleChange}
        addRoom={addRoom}
      />
      <RoomList handleBookRoom={handleBookRoom} rooms={rooms} />
    </div>
  );
};

export default Rooms;

function RoomList({ rooms, handleBookRoom }) {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Declare date and time at the start so they can be accessed globally within this function
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

    // Function to add the company header
    const addHeader = () => {
      doc.setFontSize(22);
      doc.setTextColor(44, 62, 80); // Use a sleek dark color for title
      doc.text("Company Name", 14, 20); // Title
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text("Address Line 1, City, Country", 14, 28); // Company address
      doc.text("Phone: +123456789 | Email: contact@company.com", 14, 34); // Contact details

      // Add date and time in the header
      doc.setFontSize(10);
      doc.text(`Generated on: ${formattedDate} at ${formattedTime}`, 14, 42);

      // Add a professional separator line under the header
      doc.setDrawColor(169, 169, 169);
      doc.line(14, 46, 196, 46); // Thin line for a clean design

      // Table title
      doc.setFontSize(18);
      doc.setTextColor(44, 62, 80);
      doc.text("Rooms Report", 14, 54);
    };

    // First, add the header to the first page
    addHeader();

    // Define the table columns
    const columns = ["SN", "Room No.", "Floor", "Occupants", "Price", "Status"];

    // Map bookings data to create rows
    const rows = rooms.map((room, index) => [
      index + 1,
      room.number,
      room.floor,
      room.occupants,
      "QAR " + room.price,
      "Available",
    ]);

    // Enhanced, modern table design with reduced row height
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 60,
      theme: "striped",
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
        fontSize: 11,
        fontStyle: "bold",
      },
      bodyStyles: {
        fontSize: 10,
        cellPadding: 3,
        textColor: [54, 69, 79],
        lineColor: [220, 220, 220],
        minCellHeight: 5,
      },
      alternateRowStyles: {
        fillColor: [240, 248, 255],
      },
      margin: { top: 60, left: 14, right: 14 },
      styles: {
        overflow: "linebreak",
      },
      columnStyles: {
        0: { halign: "lef", cellWidth: 15 },
        1: { halign: "left", cellWidth: 50 },
        2: { halign: "left", cellWidth: 25 },
        3: { halign: "left", cellWidth: 25 },
        4: { halign: "left", cellWidth: 35 },
        5: { halign: "left", cellWidth: 35 },
      },
      didDrawPage: (data) => {
        // Add the header on every page
        addHeader();
      },
    });

    // Add a footer with dynamic page number
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(
        `Page ${i} of ${pageCount}`,
        196 - doc.getTextWidth(`Page ${i} of ${pageCount}`),
        285
      );
      doc.text(`Generated on: ${formattedDate}`, 14, 285); // Add timestamp in footer
    }

    // Save with dynamic name
    doc.save(`rooms_report_${formattedDate}_${formattedTime}.pdf`);
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Room List
        </h3>
        <button
          onClick={generatePDF}
          className="shadow-sm w-max rounded-md border border-gray-300"
        >
          <img src={PdfIcon} className="h-8" alt="Save PDF" />
        </button>
      </div>
      <div className="border-t border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SN
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Room Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Floor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Occupants
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rooms.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No Rooms Found.
                </td>
              </tr>
            ) : (
              rooms.map((room, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {room.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {room.floor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {room.occupants}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    QAR {room.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    <span className="px-4 py-1 text-green-800 bg-green-200 border border-green-800 rounded-full">
                      Available
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex">
                    {room.status === "Available" ? (
                      <button
                        onClick={() => handleBookRoom(room)}
                        className="bg-black hover:bg-gray-800 text-white duration-300 rounded p-1 mr-2"
                      >
                        Book
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBookRoom(room)}
                        className="bg-black hover:bg-gray-800 text-white duration-300 rounded p-1 mr-2"
                      >
                        Book
                      </button>
                    )}
                    <button
                      onClick={() => toggleRoomStatus(index)}
                      className="bg-gray-200 border border-gray-800 hover:bg-gray-300 duration-300 rounded p-1 mr-2"
                    >
                      <img src={EditIcon} className="h-6" alt="Edit" />
                    </button>
                    <button
                      onClick={() => deleteRoom(index)}
                      className="bg-red-200 border border-red-800 hover:bg-red-300 duration-300 rounded p-1"
                    >
                      <img src={BinIcon} className="h-6" alt="Delete" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
