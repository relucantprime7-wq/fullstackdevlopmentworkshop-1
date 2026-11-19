const express = require('express');
const app = express();

app.use(express.json());

// In-memory data
let leaves = [
    {
        id: 701,
        employeeName: "Ananya Singh",
        employeeCode: "EMP101",
        leaveType: "Casual",
        days: 2,
        status: "Pending"
    },
    {
        id: 702,
        employeeName: "Rahul Verma",
        employeeCode: "EMP102",
        leaveType: "Sick",
        days: 3,
        status: "Pending"
    },
    {
        id: 703,
        employeeName: "Simran Kaur",
        employeeCode: "EMP103",
        leaveType: "Earned",
        days: 1,
        status: "Approved"
    }
];

// Validation function
function validateLeave(data) {
    const { employeeName, employeeCode, leaveType, days, status } = data;

    if (!employeeName || !employeeCode || !leaveType || days === undefined || !status) {
        return "All fields are required";
    }

    if (!Number.isInteger(days) || days <= 0) {
        return "Days must be a positive integer";
    }

    if (!["Casual", "Sick", "Earned"].includes(leaveType)) {
        return "Invalid leaveType";
    }

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
        return "Invalid status";
    }

    return null;
}

// 1. GET all leave requests
app.get('/api/leaves', (req, res) => {
    res.status(200).json(leaves);
});

// 2. POST new leave request
app.post('/api/leaves', (req, res) => {
    const error = validateLeave(req.body);

    if (error) {
        return res.status(400).json({ message: error });
    }

    const newLeave = {
        id: Date.now(),
        ...req.body
    };

    leaves.push(newLeave);

    res.status(201).json(newLeave);
});

// 6. FILTER by status (must be before /:id)
app.get('/api/leaves/filter', (req, res) => {
    const { status } = req.query;

    if (!status) {
        return res.status(400).json({ message: "Status query is required" });
    }

    const filteredLeaves = leaves.filter(
        leave => leave.status.toLowerCase() === status.toLowerCase()
    );

    res.status(200).json(filteredLeaves);
});

// 7. GET pending requests (must be before /:id)
app.get('/api/leaves/pending', (req, res) => {
    const pendingLeaves = leaves.filter(
        leave => leave.status === "Pending"
    );

    res.status(200).json(pendingLeaves);
});

// 3. GET leave request by ID
app.get('/api/leaves/:id', (req, res) => {
    const id = Number(req.params.id);

    const leave = leaves.find(l => l.id === id);

    if (!leave) {
        return res.status(404).json({ message: "Leave request not found" });
    }

    res.status(200).json(leave);
});

// 4. PUT update leave request
app.put('/api/leaves/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = leaves.findIndex(l => l.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Leave request not found" });
    }

    const error = validateLeave(req.body);

    if (error) {
        return res.status(400).json({ message: error });
    }

    leaves[index] = {
        id: id,
        ...req.body
    };

    res.status(200).json(leaves[index]);
});

// 5. DELETE leave request
app.delete('/api/leaves/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = leaves.findIndex(l => l.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Leave request not found" });
    }

    leaves.splice(index, 1);

    res.status(200).json({ message: "Leave request deleted successfully" });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});