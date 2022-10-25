import moment from "moment";
import notNull from "../../../convex/helpers/notNull";
import { useQuery } from "../../../convex/_generated/react";

const getStatus = (startDate: string, endDate: string) => {
  if (moment().isBefore(startDate)) {
    return "Upcoming";
  }
  if (moment().isAfter(endDate)) {
    return "Past";
  }
  return "Live";
};

const useEvents = (filterText: string) => {
  const eventsData = useQuery("getEvents");
  const validEventsData = eventsData?.filter(notNull);

  const events = validEventsData?.map((event) => ({
    _id: event._id,
    title: event.title,
    date: `${moment(event.startDate).format("MM/DD/YYYY HH:mm")} - ${moment(
      event.endDate
    ).format("MM/DD/YYYY HH:mm")}`,
    slots: event.slots,
    availableSlots: event.availableSlots,
    inviteCode: event.inviteCode,
    host: {
      label: `${event.hostDetails.name}${
        event.hostDetails.isCurrentUser ? " (Me)" : ""
      }`,
      isCurrentUser: event.hostDetails.isCurrentUser,
    },
    status: getStatus(event.startDate, event.endDate),
  }));

  const filteredEvents = events?.filter((event) =>
    event.title.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
  );

  return { events: filteredEvents };
};

export default useEvents;
