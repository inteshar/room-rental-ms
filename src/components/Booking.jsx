import React, { useState, useEffect } from "react";
import EditIcon from "../assets/edit.svg";
import BinIcon from "../assets/delete.svg";
import PdfIcon from "../assets/pdf.png";
import { useLocation } from "react-router-dom";
import { BookingForm } from "./Forms";

// Print Pdf
import jsPDF from "jspdf";
import "jspdf-autotable";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    tenantName: "",
    roomNumber: "",
    occupants: "",
    startDate: "",
    price: "",
  });

  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.room) {
      const { room } = location.state;
      setNewBooking((prevBooking) => ({
        ...prevBooking,
        roomNumber: room.number || "",
        occupants: room.occupants || "",
        price: room.price || "",
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewBooking((prevBooking) => ({ ...prevBooking, [id]: value }));
  };

  const addBooking = (e) => {
    e.preventDefault();
    if (
      !newBooking.tenantName ||
      !newBooking.roomNumber ||
      !newBooking.occupants ||
      !newBooking.startDate ||
      !newBooking.price
    ) {
      return;
    }
    setBookings([...bookings, newBooking]);
    setNewBooking({
      tenantName: "",
      roomNumber: "",
      occupants: "",
      startDate: "",
      price: "",
    });
  };

  return (
    <div className="mt-20 px-5">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Booking Management
      </h2>
      <BookingForm
        newBooking={newBooking}
        handleChange={handleChange}
        addBooking={addBooking}
      />
      <BookingList bookings={bookings} />
    </div>
  );
};

function BookingList({ bookings }) {
  // Print Pdf
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add a modern business header with the company name and logo
    doc.setFontSize(22);
    doc.setTextColor(44, 62, 80); // Use a sleek dark color for title
    doc.text("Company Name", 14, 20); // Title
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Address Line 1, City, Country", 14, 28); // Company address
    doc.text("Phone: +123456789 | Email: contact@company.com", 14, 34); // Contact details

    // Add date and time in the header
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
    doc.setFontSize(10);
    doc.text(`Generated on: ${formattedDate} at ${formattedTime}`, 14, 42);

    // Add a professional separator line under the header
    doc.setDrawColor(169, 169, 169);
    doc.line(14, 46, 196, 46); // Thin line for a clean design

    // Table title
    doc.setFontSize(18);
    doc.setTextColor(44, 62, 80);
    doc.text("Booking Report", 14, 54);

    // Define the table columns
    const columns = [
      "SN",
      "Tenant Name",
      "Room No.",
      "Occupants",
      "Start Date",
      "Price",
    ];

    // Map bookings data to create rows
    const rows = bookings.map((booking, index) => [
      index + 1,
      booking.tenantName,
      booking.roomNumber,
      booking.occupants,
      booking.startDate,
      "QAR " + booking.price,
    ]);

    // Enhanced, modern table design with reduced row height
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 60,
      theme: "striped", // More modern striped design
      headStyles: {
        fillColor: [0, 0, 0], // Professional dark blue
        textColor: [255, 255, 255], // White text for the header
        fontSize: 11,
        fontStyle: "bold",
      },
      bodyStyles: {
        fontSize: 10,
        cellPadding: 3, // Reduced padding for more compact rows
        textColor: [54, 69, 79], // Dark gray text color for rows
        lineColor: [220, 220, 220], // Subtle gray lines
        minCellHeight: 5, // Setting minimum cell height to reduce row height
      },
      alternateRowStyles: {
        fillColor: [240, 248, 255], // Very light blue for alternate rows
      },
      margin: { top: 60, left: 14, right: 14 }, // Table margin for balanced layout
      styles: {
        overflow: "linebreak", // Text wrapping
      },
      columnStyles: {
        0: { halign: "left", cellWidth: 15 }, // SN centered
        1: { halign: "left", cellWidth: 50 }, // Tenant Name left-aligned
        2: { halign: "left", cellWidth: 25 }, // Room No centered
        3: { halign: "left", cellWidth: 25 }, // Capacity centered
        4: { halign: "left", cellWidth: 35 }, // Start Date centered
        5: { halign: "left", cellWidth: 35 }, // End Date centered
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
    doc.save(`bookings_report_${formattedDate}_${formattedTime}.pdf`);
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Booking List
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
                Tenant Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Room No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Occupants
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No Bookings Found.
                </td>
              </tr>
            ) : (
              bookings.map((booking, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {booking.tenantName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {booking.roomNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {booking.occupants}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {booking.startDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    QAR {booking.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => console.log("Edit Booking", index)}
                      className="bg-gray-200 border border-gray-800 hover:bg-gray-300 duration-300 rounded p-1 mr-2"
                    >
                      <img src={EditIcon} className="h-6" alt="Edit" />
                    </button>
                    <button
                      onClick={() => console.log("Delete Booking", index)}
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

export default Booking;
