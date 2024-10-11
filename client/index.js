import express from "express";
import expressLayouts from "express-ejs-layouts";
import cookieParser from "cookie-parser";
import viewRoute from "./routes/cursoRoute.js";
import cepRoute from "./routes/cepRoute.js";
import loginRoute from "./routes/loginRoute.js";
import mensalidadeRoute from "./routes/mensalidadeRoute.js";

const app = express();

app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "ejs");
app.set("layout", "./layout");

app.use(expressLayouts);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use("/", viewRoute);
app.use("/cep", cepRoute);
app.use("/login", loginRoute);
app.use("/mensalidade", mensalidadeRoute);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
