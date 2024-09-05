import { useEffect, useState } from "react"
import { getAllCustomers } from "../apis/getAllCustomers"
import "./list.css"
import { useNavigate } from "react-router-dom"

// const CustomerList = () => {
//     const navigate = useNavigate()
//     const [customers, setCustomers] = useState([])
//     const fetchAllCustomers = async () => {
//         const res = await getAllCustomers()
//         console.log(res);
//         setCustomers(res?.data)

//     }
//     useEffect(() => {
//         fetchAllCustomers();
//     }, [])
//     return (
//         <>
//             <div className="list">
//                 <h1 className="list-title">Customers List</h1>
//                 <div className="addCustomer">
//                     <button onClick={() => navigate("/addCustomer")} className="addCustomer-btn">Add Customer</button>
//                 </div>
//                 <table className="list-table">
//                     <thead className="list-header">
//                         <tr>
//                             <th>Sr.no.</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Phone No.</th>
//                             <th>Address</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="list-body">
//                         {customers && customers.length > 0 ? customers.map((customer, index) => (
//                             <tr key={index} className="list-row">
//                                 <td>{index + 1}</td>
//                                 <td>{customer.name}</td>
//                                 <td>{customer.email}</td>
//                                 <td>{customer.phone}</td>
//                                 <td>{customer.address}</td>
//                                 <td>
//                                     <div className="action-buttons">
//                                         <button className="edit-btn">Edit</button>
//                                         <button className="delete-btn">Delete</button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         )) : (
//                             <tr>
//                                 <td colSpan="6">No customers found</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//         </>
//     )
// }
const CustomerList = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
    });

    // const fetchAllCustomers = async (page = 1) => {
    //     try {
    //         const res = await axios.get('/api/customers', {
    //             params: { page, limit: pagination.limit }
    //         });
    //         setCustomers(res.data.data);
    // setPagination({
    //     ...res.data.pagination,
    //     page
    // });
    //     } catch (error) {
    //         console.error('Error fetching customers:', error);
    //     }
    // };
    const fetchAllCustomers = async () => {
        const res = await getAllCustomers({ page: pagination.page })
        console.log(res);
        setCustomers(res?.data)
        setPagination({
            ...res.pagination
        });

    }

    useEffect(() => {
        fetchAllCustomers();
    }, [pagination.page]);

    const handlePageChange = (newPage) => {
        console.log(newPage);

        if (newPage > 0 && newPage <= pagination.totalPages) {
            // fetchAllCustomers(newPage);
            setPagination(prev => ({
                ...prev,
                page: newPage
            }));
        }
    };

    const handleDelete = async (id) => {
        console.log(id);

    }

    return (
        <>
            <div className="list">
                <h1 className="list-title">Customers List</h1>
                <div className="addCustomer">
                    <button onClick={() => navigate("/addCustomer")} className="addCustomer-btn">Add Customer</button>
                </div>
                <table className="list-table">
                    <thead className="list-header">
                        <tr>
                            <th>Sr.no.</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone No.</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="list-body">
                        {customers.length > 0 ? customers.map((customer, index) => (
                            <tr key={index} className="list-row">
                                <td>{(pagination.page - 1) * pagination.limit + index + 1}</td>
                                <th>
                                    <div className="header-with-image">
                                        <img src={customer.image} alt="Profile Icon" className="profile-icon" />
                                    </div>
                                </th>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.address}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="edit-btn" onClick={() => navigate(`/editCustomer/${customer?._id}`)}>Edit</button>
                                        <button className="delete-btn" onClick={() => handleDelete(customer?._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6">No customers found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className="pagination-btn"
                    >
                        Previous
                    </button>
                    <span>Page {pagination.page} of {pagination.totalPages}</span>
                    <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.totalPages}
                        className="pagination-btn"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default CustomerList