const express = require('express');
const cors = require('cors'); // ✅ Import CORS

const app = express();
const port = 5000;

require("./db");

// ✅ Use CORS middleware
app.use(cors({
    origin: 'https://csp-web-project.onrender.com', // Your frontend URL (NO trailing slash)
    credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello");
});

// ✅ Use routes after middleware
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/Displaydata"));
app.use("/", require("./routes/Orderdata"));

app.listen(port, () => {
    console.log(`Server is started on port ${port}`);
});
