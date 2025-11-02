import React, { useEffect, useState } from "react";
import EventTableItem from "../../components/admin/EventTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListEvent = () => {
  const { axios } = useAppContext();
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get("/api/admin/events");
      if (data.success) {
        setEvents(data.event);
        console.log("fetched data:", data)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <h1>All events</h1>

      <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 text-left uppercase">
            <tr>
              <th scope="col" className="px-2 py-4 xl:px-6">
                #
              </th>
              <th scope="col" className="px-2 py-4">
                {" "}
                Event Title
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                {" "}
                Date
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                {" "}
                Status
              </th>
              <th scope="col" className="px-2 py-4">
                {" "}
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(events) && events.length > 0 ? (
              events.map((event, index) => (
                <EventTableItem
                  key={event._id}
                  event={event}
                  fetchEvents={fetchEvents}
                  index={index + 1}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400">
                  No events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEvent;
