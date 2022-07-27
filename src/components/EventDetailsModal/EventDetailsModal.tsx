import { Modal } from "antd";
import { Id } from "convex/values";
import EventDetails from "../EventDetails/EventDetails";

interface EventDetailsModalProps {
  onClose: () => void;
  eventId?: Id;
}

const EventDetailsModal = ({ eventId, onClose }: EventDetailsModalProps) => {
  return (
    <Modal
      title="Event Details"
      visible={!!eventId}
      footer={null}
      onCancel={onClose}
    >
      {eventId && <EventDetails eventId={eventId} />}
    </Modal>
  );
};

export default EventDetailsModal;
