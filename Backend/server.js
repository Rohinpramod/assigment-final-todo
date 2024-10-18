const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth",authRoutes);
app.use("/api/todos",todoRoutes);

app.get("/",(req,res)=>{
    res.send("Welcome to Todo API");
});

app.use(
    cors({
      origin: "https://assigment-final-todo.vercel.app/",
      optionsSuccessStatus: 200 ,
    })
  );

const helmet = require('helmet');
app.use(helmet());

const PORT = process.env.PORT || 5001
mongoose.connect(
    process.env.MONGODB_URI,{
        useNewUrlparser:true,
        useUnifiedTopology:true,
    }
)
.then(()=>{
    console.log("connected to MongoDB");
    app.listen(PORT,()=>console.log(`Server is connected to port ${PORT}`));
})
.catch((err)=>{
    console.error("MonogDB connection error",err);
    process.exit(1);
});