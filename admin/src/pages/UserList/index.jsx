import "./style.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as api from "../../api";
import { useSelector } from "react-redux";

export default function UserList() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      if (!currentUser?.isAdmin) return;

      const { data } = await api.getUsers({ new: true });
      setUsers(data);
    };

    getUsers();
  }, [currentUser?.isAdmin]);

  const handleDelete = (id) => {
    setUsers(users.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.username}</div>;
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "createdAt", headerName: "createdAt", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId={(row) => row._id}
        checkboxSelection
      />
    </div>
  );
}
