import { useState, useEffect } from "react";

function InputField({ label, id, value, handleChange, type = "text" }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
        className="w-full p-3 h-10 block border border-gray-300 rounded-md shadow-sm"
      />
    </div>
  );
}

// Room Form Start
function RoomForm({ newRoom, handleChange, addRoom }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Add New Room
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <form
          onSubmit={addRoom}
          className="flex flex-col md:flex-row gap-3 items-end justify-between"
        >
          <div className="flex flex-col w-full">
            <InputField
              label="Room Number"
              id="number"
              value={newRoom.number}
              handleChange={handleChange}
              type="number"
            />
          </div>
          <div className="flex flex-col w-full">
            <InputField
              label="Floor"
              id="floor"
              value={newRoom.floor}
              handleChange={handleChange}
              type="number"
            />
          </div>
          <div className="flex flex-col w-full">
            <InputField
              label="Occupants"
              id="occupants"
              value={newRoom.occupants}
              handleChange={handleChange}
              type="number"
            />
          </div>
          <div className="flex flex-col w-full">
            <InputField
              label="Price (QAR)"
              id="price"
              value={newRoom.price}
              handleChange={handleChange}
              type="number"
            />
          </div>
          <button
            type="submit"
            className="font-bold w-full h-10 bg-black hover:bg-gray-800 duration-300 text-white rounded-lg text-sm px-3 py-2"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
// Room Form End

// Booking Form Start
function BookingForm({ newBooking, handleChange, addBooking }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Create New Booking
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <form
          onSubmit={addBooking}
          className="flex flex-col md:flex-row gap-3 items-end justify-between"
        >
          <div className="flex flex-col w-full">
            <InputField
              label="Tenant Name"
              id="tenantName"
              type="text"
              value={newBooking.tenantName}
              handleChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-full">
            <InputField
              label="Room Number"
              id="roomNumber"
              type="number"
              value={newBooking.roomNumber}
              handleChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-full">
            <InputField
              label="Occupants"
              id="occupants"
              type="number"
              value={newBooking.occupants}
              handleChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-full">
            <InputField
              label="Start Date"
              id="startDate"
              value={newBooking.startDate}
              type="date"
              handleChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-full">
            <InputField
              label="Price (QAR)"
              id="price"
              value={newBooking.price}
              type="number"
              handleChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="font-bold w-full h-10 bg-black hover:bg-gray-800 duration-300 text-white rounded-lg text-sm px-3 py-2"
          >
            Book
          </button>
        </form>
      </div>
    </div>
  );
}
// Booking Form End

// Finance or Payment Form Start
import IDCard from "../assets/idcardsample.png";
import dataFile from "../data/data.json";
const PaymentForm = ({ addPayment, handleChange, newPayment }) => {
  const [tenantData, setTenantData] = useState([]); // State to hold tenant data
  const [selectedTenant, setSelectedTenant] = useState({
    idPhoto: "",
    roomNumber: "",
    startDate: "",
    paymentDue: "",
  });

  useEffect(() => {
    setTenantData(dataFile.tenants); // Set tenant data directly from the JSON file
  }, []);

  // Handler for tenant selection
  const handleTenantChange = (e) => {
    const selectedValue = parseInt(e.target.value); // Get the selected tenant ID

    // Find the selected tenant data from tenantData array
    const tenant = tenantData.find((tenant) => tenant.id === selectedValue);

    // Update the state with the selected tenant's details
    if (tenant) {
      setSelectedTenant({
        name: tenant.name,
        idPhoto: tenant.idPhoto,
        roomNumber: tenant.roomNumber,
        startDate: tenant.startDate,
        paymentDue: tenant.paymentDue,
      });
    } else {
      setSelectedTenant({
        name: "",
        idPhoto: "",
        roomNumber: "",
        startDate: "",
        paymentDue: "",
      });
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Add New Payment
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <form
          onSubmit={addPayment}
          className="flex flex-col gap-3 items-end justify-between"
        >
          <div className="flex flex-col w-full">
            <div>
              <label
                htmlFor="tenant"
                className="block text-sm font-medium text-gray-700"
              >
                Tenant Name
              </label>
              <select
                name="tenant"
                className="font-bold text-justify bg-transparent w-full px-3 h-10 block border border-gray-300 rounded-md shadow-sm"
                onChange={handleTenantChange}
              >
                <option
                  value=""
                  className="font-thin text-black"
                  unselectable="true"
                >
                  -- Select Tenant --
                </option>
                {tenantData.map((tenant) => (
                  <option key={tenant.id} value={tenant.id}>
                    {tenant.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex sm:flex-row flex-col gap-5 w-full">
            <div className="sm:w-1/4 flex flex-col gap-2 items-start">
              <span className="block text-sm font-medium text-gray-700">
                Qatar ID/Driving Licence/Passport
              </span>
              <img
                src={selectedTenant.idPhoto ? selectedTenant.idPhoto : IDCard}
                className="object-contain rounded-lg drop-shadow-md"
                alt={`${selectedTenant.name}'s ID`}
              />
            </div>

            <div className="sm:w-3/4 flex flex-col justify-between gap-5">
              <div className="grid sm:grid-row grid-col justify-between sm:grid-cols-3 grid-cols-2 gap-5">
                <div>
                  <span className="block text-sm font-medium text-gray-700">
                    Room No.
                  </span>
                  <p className="font-bold">
                    {selectedTenant.roomNumber
                      ? selectedTenant.roomNumber
                      : "-"}
                  </p>
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-700">
                    Start Date
                  </span>
                  <p className="font-bold">
                    {selectedTenant.startDate ? selectedTenant.startDate : "-"}
                  </p>
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-700">
                    Payment Due
                  </span>
                  <p className="font-bold">
                    {selectedTenant.paymentDue === 0 ? (
                      <span className="rounded-lg text-green-700 drop-shadow-md">
                        Paid
                      </span>
                    ) : selectedTenant.paymentDue ? (
                      "QAR " + selectedTenant.paymentDue
                    ) : (
                      <span>-</span>
                    )}
                  </p>
                </div>
              </div>

              {selectedTenant.paymentDue <= 0 ? null : (
                <div className="flex gap-3 items-end justify-between">
                  <div className="flex flex-col w-3/4 justify-between gap-2">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="payingamount"
                    >
                      Paying Amount (QAR)
                    </label>
                    <input
                      className="p-3 h-10 block border border-gray-300 rounded-md shadow-sm"
                      type="number"
                      id="payingamount"
                    />
                  </div>
                  <button
                    type="submit"
                    className="font-bold w-1/4 h-10 bg-black hover:bg-gray-800 duration-300 text-white rounded-lg text-sm px-3 py-2"
                  >
                    Pay
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
// Finance or Payment Form End

// Staff Form Start
function StaffForm({ newStaff, setNewStaff, addStaffMember, error }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Add New Staff
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <form
          onSubmit={addStaffMember}
          className="flex flex-col md:flex-row gap-3 items-end justify-between"
        >
          <div className="flex flex-col w-full">
            <label
              htmlFor="staffName"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="staffName"
              value={newStaff.name}
              onChange={(e) =>
                setNewStaff({ ...newStaff, name: e.target.value })
              }
              className="w-full p-3 h-10 block border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              htmlFor="position"
              className="block text-sm font-medium text-gray-700"
            >
              Position
            </label>
            <input
              type="text"
              id="position"
              value={newStaff.position}
              onChange={(e) =>
                setNewStaff({ ...newStaff, position: e.target.value })
              }
              className="w-full p-3 h-10 block border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700"
            >
              Contact
            </label>
            <input
              type="number"
              id="contact"
              value={newStaff.contact}
              onChange={(e) =>
                setNewStaff({ ...newStaff, contact: e.target.value })
              }
              className="w-full p-3 h-10 block border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              htmlFor="salary"
              className="block text-sm font-medium text-gray-700"
            >
              Salary (QAR)
            </label>
            <input
              type="number"
              id="salary"
              value={newStaff.salary}
              onChange={(e) =>
                setNewStaff({ ...newStaff, salary: e.target.value })
              }
              className="w-full p-3 h-10 block border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="font-bold w-full h-10 bg-black hover:bg-gray-800 duration-300 text-white rounded-lg text-sm px-3 py-2"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
// Staff Form End

// Maintenance Form Start
function MaintenanceForm({
  newComplaint,
  setNewComplaint,
  addComplaint,
  error,
}) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          File new Maintenance
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <form
          onSubmit={addComplaint}
          className="flex flex-col md:flex-row gap-3 items-end justify-between"
        >
          <div className="flex flex-col w-full">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={newComplaint.description}
              onChange={(e) =>
                setNewComplaint({
                  ...newComplaint,
                  description: e.target.value,
                })
              }
              className="w-full p-3 h-10 block border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="font-bold sm:w-1/4 w-full h-10 bg-black hover:bg-gray-800 duration-300 text-white rounded-lg text-sm px-3 py-2"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
// Maintenance Form End
export { RoomForm, BookingForm, PaymentForm, StaffForm, MaintenanceForm };
