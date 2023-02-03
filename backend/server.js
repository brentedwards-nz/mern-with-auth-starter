const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Routes
const authRoutes = require("./src/routes/authRoutes");
const testRoutes = require("./src/routes/testRoutes");

// Server
const app = express();
app.use(express.json());
app.use(cors({
	origin: ["http://localhost:3000", "https://mern-with-auth-starter-frontend.onrender.com"],
	credentials: true,
	methods: ['GET', 'POST', 'OPTIONS']
}));

app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
const server = http.createServer(app);

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"]
	}
});

// Mongoose
const PORT = process.env.PORT || process.env.API_PORT;
mongoose
	.set('strictQuery', true)
	.connect(process.env.MONGO_URI)
	.then(() => {
		server.listen(PORT, () => {
			console.log(`Mongoose API server is listening on localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.log("database connection failed. Server not started");
		console.error(err);
	});

io.on("connection", (socket) => {
	socket.emit("socket.created", socket.id);

	socket.on("broadcast", ({ message }) => {
		socket.broadcast.emit("message", { message })
	});
});