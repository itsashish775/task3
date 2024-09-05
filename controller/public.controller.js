const User = require("../models/customers.model");

const publicController = {
    register: async (req, res) => {
        try {
            console.log(req.body);
            const customer = await User.create(req.body)
            res.status(201).json({
                status: 201,
                message: "customer created",
                data: customer
            })
        } catch (error) {
            res.status(500).json({
                message: "Some Error ...",
                err: error.message
            })
        }
    },
    getCustomerById: async (req, res) => {
        try {
            const { id } = req.params;
            // Validate ID
            if (!id) {
                return res.status(400).json({ message: "Customer ID is required" });
            }

            // Find the customer by ID
            const customer = await User.findById(id);

            // Check if customer exists
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }

            // Send the customer data
            res.status(200).json({
                message: "Customer fetched successfully",
                data: customer
            });
        } catch (error) {
            res.status(500).json({
                message: "Some Error ...",
                err: error.message
            })
        }
    },
    updateCustomerById: async (req, res) => {
        try {
            const { id } = req.params;
            const updates = req.body;
            console.log(id, updates);


            // Validate ID
            if (!id) {
                return res.status(400).json({ message: "Customer ID is required" });
            }

            // Find and update the customer by ID
            const updatedCustomer = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

            // Check if customer exists
            if (!updatedCustomer) {
                return res.status(404).json({ message: "Customer not found" });
            }

            // Send the updated customer data
            res.status(200).json({
                status: 200,
                message: "Customer updated successfully",
                data: updatedCustomer
            });
        } catch (error) {
            res.status(500).json({
                message: "Some Error ...",
                err: error.message
            })
        }
    },
    getAllCustomer: async (req, res) => {
        try {
            console.log(req.url);

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            // Calculate the number of documents to skip
            const skip = (page - 1) * limit;

            // Fetch customers with pagination
            const customers = await User.find().skip(skip).limit(limit);
            const totalCustomers = await User.countDocuments(); // Get total number of customers

            res.status(200).json({
                message: "Customers fetched successfully",
                data: customers,
                pagination: {
                    total: totalCustomers,
                    page,
                    limit,
                    totalPages: Math.ceil(totalCustomers / limit),
                },
            });
        } catch (error) {
            res.status(500).json({
                message: "Some Error ...",
                err: error.message
            })
        }
    },
    uploadImage: async (req, res) => {
        try {
            if (req.file) {
                const data = `${process.env.BACKEND_URL}/${req.file.filename}`;
                return res.status(200).json({
                    status: 200,
                    message: 'Image upload successful',
                    url: data,
                });
            }
        } catch (error) {

            res.status(500).json({
                message: "Some Error ...",
                err: error.message
            })
        }
    },
    uploadVideo: async (req, res) => {
        try {
            if (req.file) {
                const data = `${process.env.BACKEND_URL}/${req.file.filename}`;
                return res.status(200).json({
                    status: 200,
                    message: 'Video upload successful',
                    url: data,
                });
            }
        } catch (error) {

            res.status(500).json({
                message: "Some Error ...",
                err: error.message
            })
        }
    },
}

module.exports = publicController