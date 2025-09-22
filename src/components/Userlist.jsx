import { useState } from "react";

function UserList({ users, onEdit, onDelete, sortConfig, setSortConfig }) {
  const [editingUserId, setEditingUserId] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", department: "" });

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditData({
      name: user.name,
      email: user.email,
      department: user.department || user.company?.name || "",
    });
  };

  const handleSave = () => {
    if (!editData.name.trim() || !editData.email.trim() || !editData.department.trim()) {
      alert("Name, Email, and Department are required!");
      return;
    }
    onEdit(editingUserId, editData);
    setEditingUserId(null);
  };

  const handleCancel = () => {
    setEditingUserId(null);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortSymbol = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort("id")}>ID{getSortSymbol("id")}</th>
          <th onClick={() => handleSort("name")}>Name{getSortSymbol("name")}</th>
          <th onClick={() => handleSort("email")}>Email{getSortSymbol("email")}</th>
          <th onClick={() => handleSort("department")}>Department{getSortSymbol("department")}</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          const isEditing = editingUserId === user.id;
          return (
            <tr key={user.id} className={isEditing ? "editing" : ""}>
              <td data-label="ID">{user.id}</td>
              <td data-label="Name">
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td data-label="Email">
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td data-label="Department">
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.department}
                    onChange={(e) => setEditData({ ...editData, department: e.target.value })}
                  />
                ) : (
                  user.department || user.company?.name || ""
                )}
              </td>
              <td data-label="Action">
                {isEditing ? (
                  <>
                    <button className="save" onClick={handleSave}>
                      Save
                    </button>
                    <button className="cancel" onClick={handleCancel}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button className="edit" onClick={() => handleEditClick(user)}>
                      Edit
                    </button>
                    <button className="delete" onClick={() => onDelete(user.id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default UserList;



