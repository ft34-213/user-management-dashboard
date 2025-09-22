import { useState, useEffect, useMemo } from "react";
import UserList from "./components/Userlist";
import UserForm from "./components/Userform";
import usersData from "./users.json";
import "./App.css";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });
  const [showFilter, setShowFilter] = useState(false);

  // Sort
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  // --- Fetch users ---
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch users");
        const apiUsers = await res.json();

        const uniqueLocalUsers = usersData.slice(0, 90).map((user, index) => ({
          ...user,
          id: index + 11,
        }));

        setUsers([...apiUsers, ...uniqueLocalUsers]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // --- Add user ---
  const handleAddUser = (user) => {
    if (!user.name?.trim() || !user.email?.trim() || !user.department?.trim()) {
      alert("Name, Email and Department are required!");
      return;
    }

    setUsers((prev) => {
      const maxId = prev.length > 0 ? Math.max(...prev.map((u) => u.id)) : 0;
      const newUser = { ...user, id: maxId + 1 };
      return [...prev, newUser];
    });

    setShowForm(false);
  };

  // --- Edit user ---
  const handleEditUser = (id, updatedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
    );
  };

  // --- Delete user ---
  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  // --- Filter + Search + Sort ---
  const processedUsers = useMemo(() => {
    let filtered = users.filter((user) => {
      const [first, ...rest] = user.name.split(" ");
      const last = rest.join(" ");
      const dept = user.department || user.company?.name || "";

      return (
        first.toLowerCase().includes(filterData.firstName.toLowerCase()) &&
        last.toLowerCase().includes(filterData.lastName.toLowerCase()) &&
        user.email.toLowerCase().includes(filterData.email.toLowerCase()) &&
        dept.toLowerCase().includes(filterData.department.toLowerCase()) &&
        (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });

    // Sort
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.key] || "";
        const bVal = b[sortConfig.key] || "";
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [users, filterData, searchTerm, sortConfig]);

  // --- Pagination ---
  const totalPages = Math.ceil(processedUsers.length / rowsPerPage);
  const currentUsers = processedUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Reset page when rowsPerPage, searchTerm, or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [rowsPerPage, searchTerm, filterData]);

  return (
    <div className="container">
      <h1>User Management Dashboard</h1>

      {/* Buttons + Search */}
      <div className="search-filter">
        <button onClick={() => setShowForm(true)}>+ Add User</button>
        <button onClick={() => setShowFilter(!showFilter)}>Filter</button>
        <input
          type="text"
          placeholder="Search by name/email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Add User Form below buttons */}
      {showForm && (
        <UserForm onSubmit={handleAddUser} onCancel={() => setShowForm(false)} />
      )}

      {/* Filter Box */}
      {showFilter && (
        <div className="filter-box">
          <input
            placeholder="First Name"
            value={filterData.firstName}
            onChange={(e) =>
              setFilterData({ ...filterData, firstName: e.target.value })
            }
          />
          <input
            placeholder="Last Name"
            value={filterData.lastName}
            onChange={(e) =>
              setFilterData({ ...filterData, lastName: e.target.value })
            }
          />
          <input
            placeholder="Email"
            value={filterData.email}
            onChange={(e) =>
              setFilterData({ ...filterData, email: e.target.value })
            }
          />
          <input
            placeholder="Department"
            value={filterData.department}
            onChange={(e) =>
              setFilterData({ ...filterData, department: e.target.value })
            }
          />
          <button onClick={() => setShowFilter(false)}>Apply</button>
        </div>
      )}

      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <UserList
            users={currentUsers}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
          />

          {/* Pagination */}
          <div className="pagination">
            <span>Rows per page: </span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default App;




