import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import moment, { Moment } from 'moment';
import { useState } from 'react';
import { useMutation } from '../../../convex/_generated/react';
import { useInviteLink } from '../../hooks/inviteLink.hooks';
import './CreateEvent.scss';

type Inputs = {
  title: string;
  description: string;
  time: [Moment, Moment];
  slots: number;
};

const CreateEvent = () => {
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [copyLinkModalOpen, setCopyLinkModalOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [form] = Form.useForm<Inputs>();
  const createEvent = useMutation('createEvent');
  const { getInviteLink, copyInviteLink } = useInviteLink();

  const defaultStartTime = moment()
    .add(1, 'day')
    .set('hours', 18)
    .set('minutes', 0);
  const defaultEndTime = moment(defaultStartTime).add(2, 'hours');

  const handleFinish = async () => {
    const { title, description, time, slots } = form.getFieldsValue();

    const inviteCode = await createEvent({
      title,
      description,
      startDate: time[0].toISOString(),
      endDate: time[1].toISOString(),
      slots,
    });

    setInviteCode(inviteCode);
    form.resetFields();
    setCreateEventModalOpen(false);
    setCopyLinkModalOpen(true);
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setCreateEventModalOpen(true)}
      >
        Create Event
      </Button>
      <Modal
        title="Create Event"
        visible={createEventModalOpen}
        onOk={() => form.submit()}
        onCancel={() => {
          form.resetFields();
          setCreateEventModalOpen(false);
        }}
        maskClosable={false}
      >
        <Form
          form={form}
          onFinish={handleFinish}
          layout="vertical"
          initialValues={{
            time: [defaultStartTime, defaultEndTime],
            slots: 5,
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Title is required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Description is required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date and time"
            name="time"
            rules={[{ required: true, message: 'Date and time is required' }]}
          >
            <DatePicker.RangePicker
              showTime={{ format: 'HH:mm' }}
              format="MM/DD/YYYY HH:mm"
              minuteStep={15}
            />
          </Form.Item>
          <Form.Item
            label="Number of slots"
            name="slots"
            rules={[{ required: true, message: 'Number of slots is required' }]}
          >
            <InputNumber min={1} max={25} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Copy link"
        visible={copyLinkModalOpen}
        footer={null}
        onCancel={() => setCopyLinkModalOpen(false)}
        maskClosable={false}
      >
        <p>
          Copy link to this event and share it with people you'd like to invite.
        </p>
        <div className="CreateEvent__copyLink">
          <Input disabled value={getInviteLink(inviteCode)} />
          <Button
            type="primary"
            onClick={() => copyInviteLink(inviteCode)}
            ghost
          >
            Copy link
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CreateEvent;
