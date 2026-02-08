import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// rota de teste
app.get("/", (req, res) => {
  res.json({ status: "Achados do Zé API rodando 🔧" });
});

// rota de busca de ferramentas na Shopee
app.get("/shopee/ferramentas", async (req, res) => {
  try {
    const response = await fetch(
      "https://shopee.com.br/api/v4/search/search_items?by=relevancy&keyword=ferramentas&limit=5&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2",
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept": "application/json"
        }
      }
    );

    const data = await response.json();

    const items = data.items.map(item => ({
      title: item.item_basic.name,
      price: item.item_basic.price / 100,
      itemid: item.item_basic.itemid,
      shopid: item.item_basic.shopid
    }));

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados da Shopee" });
  }
});

app.listen(PORT, () => {
  console.log("API rodando na porta", PORT);
});
