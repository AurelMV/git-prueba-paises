const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.text({ type: "*/*" })); // Acepta text/xml

const SOAP_URL = "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso";

app.get("/", (req, res) => {
    res.send("✅ Proxy SOAP activo. Usa /soap con método POST para enviar tus solicitudes.");
  });

app.post("/soap", async (req, res) => {
  try {
    const { headers, data } = await axios.post(SOAP_URL, req.body, {
      headers: {
        "Content-Type": "text/xml;charset=UTF-8",
        "SOAPAction": req.headers["soapaction"],
      },
    });
    res.send(data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(4000, () => {
  console.log("🟢 Proxy SOAP escuchando en http://localhost:4000");
});
