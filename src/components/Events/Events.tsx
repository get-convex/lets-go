import {
  DeleteOutlined,
  InfoOutlined,
  LinkOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Input, Modal, Popconfirm, Table } from "antd";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Id } from "../../../convex/_generated/dataModel";
import { useMutation } from "../../../convex/_generated/react";
import { useInviteLink } from "../../hooks/inviteLink.hooks";
import CreateEvent from "../CreateEvent/CreateEvent";
import EventDetailsModal from "../EventDetailsModal/EventDetailsModal";
import Empty from "./Empty/Empty";
import "./Events.scss";
import useEventsData from "./useEvents.hooks";

const Events = () => {
  const [detailsEventId, setDetailsEventId] = useState<
    Id<"events"> | undefined
  >();
  const [filterText, setFilterText] = useState("");
  const { events } = useEventsData(filterText);
  const deleteEvent = useMutation("deleteEvent");
  const deleteAttendee = useMutation("deleteAttendee");
  const { copyInviteLink } = useInviteLink();
  const [searchParams, setSearchParams] = useSearchParams();

  const ref = searchParams.get("ref");

  return (
    <div className="Events">
      <div className="Events__header">
        <span className="Events__header__title">My Events</span>
        <Input
          className="Events__header__filter"
          prefix={<SearchOutlined />}
          value={filterText}
          onChange={(e: any) => setFilterText(e.target.value)}
          placeholder="Search"
        />
        <CreateEvent />
      </div>
      <div className="Events__content">
        <ConfigProvider renderEmpty={Empty}>
          <Table
            columns={[
              {
                title: "Title",
                dataIndex: "title",
                key: "title",
                render: (title, event) => (
                  <div className="Events__tableRow__title">
                    <strong>{title}</strong>
                    <span>{event.date}</span>
                  </div>
                ),
              },
              {
                title: "Slots",
                dataIndex: "slots",
                key: "slots",
                render: (slots, event) =>
                  `${event.availableSlots} of ${slots} available`,
              },
              {
                title: "Event Host",
                render: (event) => event.host.label,
                key: "host",
                filters: [
                  {
                    text: "Hosting",
                    value: true,
                  },
                  {
                    text: "Attending",
                    value: false,
                  },
                ],
                filterMultiple: true,
                onFilter: (filter, event) =>
                  event.host.isCurrentUser === filter,
              },
              {
                title: "Status",
                key: "status",
                dataIndex: "status",
              },
              {
                key: "actions",
                render: (event) => (
                  <div className="Events__tableRow__actions">
                    {event.host.isCurrentUser ? (
                      <>
                        <Popconfirm
                          title="Are you sure you want to delete this event?"
                          onConfirm={() => deleteEvent({ eventId: event._id })}
                          okText="Delete"
                          cancelText="Cancel"
                        >
                          <Button
                            type="text"
                            shape="circle"
                            icon={<DeleteOutlined />}
                          />
                        </Popconfirm>
                        <Button
                          type="text"
                          shape="circle"
                          icon={<LinkOutlined />}
                          onClick={() => copyInviteLink(event.inviteCode)}
                        />
                      </>
                    ) : (
                      <Button
                        type="link"
                        danger
                        onClick={() => deleteAttendee({ eventId: event._id })}
                      >
                        Decline
                      </Button>
                    )}
                    <Button
                      type="text"
                      shape="circle"
                      icon={<InfoOutlined />}
                      onClick={() => setDetailsEventId(event._id)}
                    />
                  </div>
                ),
              },
            ]}
            dataSource={events}
            pagination={{
              position: ["bottomLeft"],
              hideOnSinglePage: true,
            }}
            rowKey="_id"
            rowClassName="Events__tableRow"
          />
        </ConfigProvider>
      </div>
      <EventDetailsModal
        eventId={detailsEventId}
        onClose={() => setDetailsEventId(undefined)}
      />
      <Modal
        title="Success!"
        visible={ref === "inviteAccepted"}
        onCancel={() => setSearchParams({})}
        footer={null}
      >
        <div className="Events__inviteAccepted">
          <img src="/invite-accepted.svg" alt="" />
          <p>
            You have successfully accepted the invitation! The event has been
            added to your list of events.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Events;
