import React, { useState, useEffect } from "react";
import axios from "axios";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState({});
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const years = [2024, 2025, 2026, 2027, 2028, 2029];

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/holidays`
      );
      const holidayData = {};
      data.forEach((holiday) => (holidayData[holiday.date] = holiday.name));
      setHolidays(holidayData);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  const addHoliday = async (date) => {
    const holidayName = prompt("Enter holiday name:");
    if (holidayName) {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/holidays`, {
          date,
          name: holidayName,
        });
        setHolidays((prev) => ({ ...prev, [date]: holidayName }));
      } catch (error) {
        console.error("Error adding holiday:", error);
      }
    }
  };

  const deleteHoliday = async (date) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/holidays/${date}`
      );
      setHolidays((prev) => {
        const updatedHolidays = { ...prev };
        delete updatedHolidays[date];
        return updatedHolidays;
      });
    } catch (error) {
      console.error("Error deleting holiday:", error);
    }
  };

  const handleYearSelect = (year) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setShowYearDropdown(false);
  };

  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-xl mb-6">
        <button
          onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          ← Prev
        </button>

        <div className="relative">
          <h2
            onClick={() => setShowYearDropdown((prev) => !prev)}
            className="text-2xl font-bold cursor-pointer px-4 py-2 border rounded-lg bg-white shadow-md hover:bg-gray-200 transition"
          >
            {`${currentDate.toLocaleString("default", {
              month: "long",
            })} ${year}`}
          </h2>

          {showYearDropdown && (
            <div className="absolute left-0 mt-2 bg-white border rounded-lg shadow-md w-36 p-2 z-10">
              {years.map((yearOption) => (
                <div
                  key={yearOption}
                  onClick={() => handleYearSelect(yearOption)}
                  className="cursor-pointer p-2 hover:bg-blue-100 rounded transition"
                >
                  {yearOption}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Next →
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-3 border-b pb-3 max-w-xl w-full">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-bold text-center text-lg">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-3 max-w-xl w-full mt-3">
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={index} className="w-20 h-20"></div>
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const date = index + 1;
          const fullDate = `${year}-${(month + 1)
            .toString()
            .padStart(2, "0")}-${date.toString().padStart(2, "0")}`;

          return (
            <div
              key={date}
              className={`relative w-20 h-20 border border-gray-300 flex flex-col items-center justify-center text-lg font-semibold rounded-lg transition cursor-pointer 
                ${
                  holidays[fullDate] ? "bg-green-200" : "bg-white"
                } hover:bg-blue-100`}
            >
              <span>{date}</span>
              {holidays[fullDate] && (
                <div
                  onClick={() => deleteHoliday(fullDate)}
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-md cursor-pointer hover:bg-red-600"
                >
                  {holidays[fullDate]} ❌
                </div>
              )}
              <button
                onClick={() => addHoliday(fullDate)}
                className="absolute inset-0 w-full h-full opacity-0 hover:opacity-100 transition"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
