import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Spinner,
  Button,
  DropdownButton,
  Dropdown,
  FormCheck,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Usermap from "./user_entry_table_map";

function renderHeaders(headerNames, setSortBy, sortBy, setSortDir, sortDir) {
  if (headerNames && headerNames.length > 0) {
    return headerNames.map((header) => {
      if (header.visible)
        return (
          <th className="p-1" style={{cursor: 'pointer'}} key={header.Field} onClick={() => {sortBy !== header.Field ? setSortBy(header.Field) : setSortDir(!sortDir)}}>
            {header.name ?? header.Field} {sortBy === header.Field ? <i className={sortDir ? "bi bi-caret-down-fill": "bi bi-caret-up-fill"}></i> : <></>}
          </th>
        );
    });
  } else {
    <Spinner animation="border" />;
  }
}

function renderRow(user, selectedColumns) {
  if (selectedColumns && selectedColumns.length > 0) {
    return selectedColumns.map((column) => {
      if (column.visible) {
        if (column.Type === "datetime") {
          return (
            <td
              className="p-1"
              style={{ whiteSpace: "nowrap" }}
              key={`${user}${column.Field}`}
            >
              {new Date(user[column.Field]).toLocaleDateString()}
            </td>
          );
        } else if (column.Type === "boolean") {
          return (
            <td
              className="p-1 text-center fw-bold"
              style={{ whiteSpace: "nowrap" }}
              key={`${user}${column.Field}`}
            >
              <strong>
                {!user[column.Field] ? (
                  <i class="bi bi-x-circle"></i>
                ) : (
                  <i className="bi bi-check-circle-fill text-success"></i>
                )}
              </strong>
            </td>
          );
        } else if (column.Type === "string-boolean") {
          return (
            <td
              className="p-1 text-center fw-bold"
              style={{ whiteSpace: "nowrap" }}
              key={`${user}${column.Field}`}
            >
              <strong>
                {!user[column.Field] ? (
                  <></>
                ) : (
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{user[column.Field]}</Tooltip>}
                  >
                    <i className="bi bi-chat-left-dots-fill"></i>
                  </OverlayTrigger>
                )}
              </strong>
            </td>
          );
        } else {
          return (
            <td
              className="p-1"
              style={{ whiteSpace: "nowrap" }}
              key={`${user}${column.Field}`}
            >
              {user[column.Field]}
            </td>
          );
        }
      }
    });
  }
}

export default function UserManagement(props) {
  const [tableDesc, setTableDesc] = useState(null);
  const [users, setUsers] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState(null);
  const [sortBy, setSortBy] = useState(null)
  const [sortDir, setSortDir] = useState(true)

  const excludedDefault = ["google_id", "profile_picture_url", "id", "website"];

  useEffect(() => {
    fetch("/api/user-utility/table", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.ok ? res.json() : new Error("an unexpected error occurred");
      })
      .then((res) => {
        if (res && res.length > 0) {
          const mappedCols = res.map((col) => {
            if (Usermap[col.Field]) {
              col.name = Usermap[col.Field].name;
              col.Type = Usermap[col.Field].type;
            }
            return col;
          });
          console.log("loaded table desc");
          console.log(mappedCols);
          setTableDesc(mappedCols);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (tableDesc && tableDesc.length > 0) {
      const cols = tableDesc.map((col) => {
        if (!excludedDefault.includes(col.Field)) {
          col.visible = true;
        }

        return col;
      });
      setSelectedColumns(cols);
    } else {
      console.log("No table description provided. No actions taken.");
    }
  }, [tableDesc]);

  useEffect(() => {
    fetch("/api/user-utility/user", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.ok ? res.json() : new Error("An unexpected error occurred");
      })
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => {
        res.status(500).json({ err: err });
      });
  }, []);

  useEffect(() => {
    if (users && users.length > 0 && sortBy) {
        const newUsers = JSON.parse(JSON.stringify(users))
        newUsers.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : (a[sortBy] === b[sortBy] ? 0 : -1)))
        if (sortDir) {
            newUsers.reverse()
        }
        setUsers(newUsers)
    }
  }, [sortBy, sortDir])

  return (
    <Container fluid>
      <Row>
        <Col xl="12">
          <h2>User Management</h2>
          <p>
            All users that have singed into the website will appear. Use this
            page to modify user accounts and settings or remove users from the
            system. This page contains privileged information that is intended
            only for CheeseHacks Administrators.
          </p>
          <DropdownButton
            autoClose="outside"
            title="View"
            variant="dark"
            className="my-1"
            size="sm"
          >
            {selectedColumns &&
              selectedColumns.length > 0 &&
              selectedColumns.map((desc, i) => {
                return (
                  <FormCheck
                    className="m-1 border"
                    key={`${desc.Field}check`}
                    id={desc.Field + " "}
                    checked={desc.visible}
                    onChange={() => {
                      //console.log("running onchange");
                      const newSelected = JSON.parse(
                        JSON.stringify(selectedColumns)
                      );
                      //console.log(newSelected);
                      newSelected[i].visible = !newSelected[i].visible;
                      //console.log(newSelected);
                      setSelectedColumns(newSelected);
                    }}
                    label={desc.Field}
                  />
                );
              })}
          </DropdownButton>
          <div
            style={{ width: "100%", overflowX: "auto" }}
            className="border rounded"
          >
            <Table striped bordered hover>
              <thead>
                <tr>{renderHeaders(selectedColumns, setSortBy, sortBy, setSortDir, sortDir)}</tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user) => {
                    return (
                      <tr key={user.id}>{renderRow(user, selectedColumns)}</tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
