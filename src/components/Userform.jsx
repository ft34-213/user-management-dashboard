import { useState } from "react";

function UserForm({ onSubmit, onCancel, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    ...initialData,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      department: formData.department.trim(),
    };

    if (!trimmedData.name || !trimmedData.email || !trimmedData.department) {
      alert("Name, Email, and Department are required!");
      return;
    }

    onSubmit(trimmedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleChange}
      />
      <button type="submit" className="save">
        Save
      </button>
      <button type="button" className="cancel" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default UserForm;





