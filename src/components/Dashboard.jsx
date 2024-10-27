import React, { useEffect, useState } from "react";
// import TenantIcon from "../assets/tenant.png";
// import IncomeIcon from "../assets/income.png";
// import ComplaintIcon from "../assets/complain.png";
// import PaymentIcon from "../assets/payment.png";
// import AvaRoomIcon from "../assets/avabed.png";
// import OccuRoomIcon from "../assets/bedperson.png";
import dataFile from "../data/data.json";

const Dashboard = () => {
  const [tenants, setTenants] = useState([]);
  const [income, setIncome] = useState(0);
  const [openComplaints, setOpenComplaints] = useState(0);
  const [upcomingPayments, setUpcomingPayments] = useState(0);
  const [availableRooms, setAvailableRooms] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchDashboardData = () => {
      try {
        // Directly use the imported data
        const data = dataFile;

        // Update state with fetched data
        setTenants(data.tenants);
        setIncome(data.income);
        setOpenComplaints(data.openComplaints);
        setUpcomingPayments(data.upcomingPayments);
        setAvailableRooms(data.availableRooms);
        setRecentActivity(data.recentActivity);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="px-5 mt-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow p-2 rounded-lg flex gap-3 h-max items-center">
          <img
            src="https://img.icons8.com/plumpy/384/person-at-home.png"
            className="h-16 w-16"
            alt="icon"
          />
          <div>
            <h3 className="text-lg text-sm">Total Tenants</h3>
            <p className="text-2xl">{tenants.length}</p>
          </div>
        </div>
        <div className="bg-white shadow p-2 rounded-lg flex gap-3 h-max items-center">
          <img
            src="https://img.icons8.com/plumpy/384/request-money.png"
            className="h-16 w-16"
            alt="icon"
          />
          <div>
            <h3 className="text-lg text-sm">Total Income (QAR)</h3>
            <p className="text-2xl">{income.toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-white shadow p-2 rounded-lg flex gap-3 h-max items-center">
          <img
            src="https://img.icons8.com/plumpy/384/complaint.png"
            className="h-16 w-16"
            alt="icon"
          />
          <div>
            <h3 className="text-lg text-sm">Open Complaints</h3>
            <p className="text-2xl">{openComplaints}</p>
          </div>
        </div>
        <div className="bg-white shadow p-2 rounded-lg flex gap-3 h-max items-center">
          <img
            src="https://img.icons8.com/plumpy/384/bribery.png"
            className="h-16 w-16"
            alt="icon"
          />
          <div>
            <h3 className="text-lg text-sm">Upcoming Payments</h3>
            <p className="text-2xl">{upcomingPayments}</p>
          </div>
        </div>
        <div className="bg-white shadow p-2 rounded-lg flex gap-3 h-max items-center">
          <img
            src="https://img.icons8.com/plumpy/384/empty-bed.png"
            className="h-16 w-16"
            alt="icon"
          />
          <div>
            <h3 className="text-lg text-sm">Available Rooms</h3>
            <p className="text-2xl">{availableRooms}</p>
          </div>
        </div>
        <div className="bg-white shadow p-2 rounded-lg flex gap-3 h-max items-center">
          <img
            src="https://img.icons8.com/plumpy/384/occupied-bed.png"
            className="h-16 w-16"
            alt="icon"
          />
          <div>
            <h3 className="text-lg text-sm">Occupied Rooms</h3>
            <p className="text-2xl">{availableRooms}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
        <ul className="flex flex-col gap-2">
          {recentActivity.map((activity, index) => (
            <li
              key={index}
              className="shadow px-4 py-3 border border-gray-200 rounded-lg"
            >
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
