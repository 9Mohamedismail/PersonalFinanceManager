import { Empty, Table, ConfigProvider, theme } from "antd";
import styled from "styled-components";

import EditableCell from "./EditableCell";
import EditableRow from "./EditableRow";
import getColumns from "./Columns";
import TableButtons from "./TableButtons";

function JobTable() {
  const loading = false;
  const jobData = [1];

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : jobData.length ? (
        <div>
          <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
            <Table
              rowKey="key"
              components={{
                body: {
                  row: EditableRow,
                  cell: EditableCell,
                },
              }}
              columns={columns}
              dataSource={jobData}
              loading={loading}
            />
          </ConfigProvider>
        </div>
      ) : (
        <p> placeholder</p>
      )}
    </div>
  );
}

export default JobTable;
