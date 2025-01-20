const axios = require("axios");

const API_URL = "https://v6.exchangerate-api.com/v6/";
const API_KEY = process.env.EXCHANGE_RATE_API_KEY;

const convertCurrency = async (req, res) => {
  try {
    const { from, to, amount } = req.body;

    const url = `${API_URL}/${API_KEY}/pair/${from}/${to}/${amount}`;
    const response = await axios.get(url);

    if (response.data && response.data.result === "success") {
      res.json({
        base: from,
        target: to,
        conversionRate: response.data.conversion_rate,
        convertedAmount: response.data.conversion_result,
      });
    } else {
      res.status(400).json({
        message: "Error converting currency",
        details: response.data,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error converting currency",
      details: error.message,
    });
  }
};

module.exports = { convertCurrency };
