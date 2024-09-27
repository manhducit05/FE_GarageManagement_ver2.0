import React, { useState, useEffect } from 'react';
import axiosToken from '../../context/axiosToken';

const AdminPermissions = () => {
  const API = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [permissions, setPermissions] = useState([]); // Initialize as an array

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await axiosToken.get(`${API}/roles/permissions`);
        console.log('API Response: ', res.data);

        if (res.data.roles) {
          setPermissions(res.data.roles); // Set permissions directly from the array
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, [API]);

  useEffect(() => {
    console.log('Updated permissions: ', permissions);
  }, [permissions]);

  const handleCheckboxChange = (recordId, permissionType) => (event) => {
    const checked = event.target.checked;
    console.log(recordId)

    setPermissions((prevPermissions) => {
      const updatedPermissions = [...prevPermissions]; // Copy the array for immutability
      const permissionIndex = updatedPermissions.findIndex((perm) => perm._id === recordId);

      if (permissionIndex !== -1) {
        const currentPermissions = updatedPermissions[permissionIndex].permissions;
        console.log(currentPermissions)
        if (checked) {
          // Add permission if it's not already in the list
          if (!currentPermissions.includes(permissionType)) {
            updatedPermissions[permissionIndex].permissions.push(permissionType);
          }
        } else {
          // Remove permission if it's unchecked
          updatedPermissions[permissionIndex].permissions = currentPermissions.filter(
            (perm) => perm !== permissionType
          );
        }
      }

      return updatedPermissions;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fetchPermissions = async () => {
      setLoading(true); // Start loading when initiating the delete request
      try {
        const res = await axiosToken.patch(`${API}/roles/permissions/update`);
      } catch (error) {
        setError(error.message); // Set error if something goes wrong
        console.error("Delete error:", error);
      } finally {
        setLoading(false); // End loading after the delete operation
      }
    };

    fetchPermissions(); // 
    console.log("Per lúc sau: ", permissions)
    // Logic to send data to the server
  };

  return (
    <>
      <div>
        <h1>Phân quyền</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <table className="table table-hover table-sm">
              <thead>
                <tr>
                  <th>Tính năng</th>
                  {
                    permissions.map((item) => (
                      <th className="text-center" key={item._id}>
                        {item.title}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={permissions.length + 1}>
                    <b>Danh sách sản phẩm</b>
                  </td>
                </tr>
                <tr>
                  <td>Xem</td>
                  {permissions.map((item) => (
                    <td className="text-center" key={item.id}>
                      <input
                        type="checkbox"
                        checked={item.permissions.includes('products_view') || false}
                        onChange={handleCheckboxChange(item._id, 'products_view')}
                      />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Thêm</td>
                  {permissions.map((item) => (
                    <td className="text-center" key={item.id}>
                      <input
                        type="checkbox"
                        checked={item.permissions.includes('products_create')}
                        onChange={handleCheckboxChange(item._id, 'products_create')}
                      />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Sửa</td>
                  {permissions.map((item) => (
                    <td className="text-center" key={item.id}>
                      <input
                        type="checkbox"
                        checked={item.permissions.includes('products_edit') || false}
                        onChange={handleCheckboxChange(item._id, 'products_edit')}
                      />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Xóa</td>
                  {permissions.map((item) => (
                    <td className="text-center" key={item.id}>
                      <input
                        type="checkbox"
                        checked={item.permissions.includes('products_delete') || false}
                        onChange={handleCheckboxChange(item._id, 'products_delete')}
                      />
                    </td>
                  ))}
                </tr>
                {/* Add more permission rows here */}
              </tbody>
            </table>

            <button className="btn btn-primary" type="submit">
              Cập nhật
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default AdminPermissions;
