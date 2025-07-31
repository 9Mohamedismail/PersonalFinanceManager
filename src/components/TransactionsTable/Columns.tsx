import { Tag, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const tagColors = {
  applied: "blue",
  interviewing: "gold",
  offer: "green",
  rejected: "red",
  followup: "orange",
};

const getColumns = ({}) => {
  return [
    {
      title: "company",
      dataIndex: "company",
      key: "company",
      editable: true,
    },
    {
      title: "position",
      dataIndex: "position",
      key: "position",
      editable: true,
    },
    {
      title: "job description link",
      dataIndex: "url",
      key: "url",
      editable: true,
    },
    {
      title: "location",
      dataIndex: "location",
      key: "location",
      editable: true,
    },
    {
      title: "job type",
      dataIndex: "jobType",
      key: "jobType",
      editable: true,
    },
    {
      title: "apply date",
      dataIndex: "date",
      key: "date",
      editable: true,
    },
    {
      title: "tag",
      key: "tag",
      dataIndex: "tag",
      editable: true,
    },
    {
      dataIndex: "action",
      width: 50,
      render: (_, record) => {
        const menuItems = [
          {
            key: "edit",
            label: "Edit",
            onClick: () => openModal("edit", record),
          },
          {
            key: "delete",
            label: "Delete",
            danger: true,
            onClick: () => handleDelete([record.key]),
          },
        ];

        return (
          <div className="row-actions">
            <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
              <MoreOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
            </Dropdown>
          </div>
        );
      },
    },
  ].map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });
};

export default getColumns;
