export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const body = req.body;

    // DEBUG (opcional)
    console.log("Webhook recebido:", body);

    // 🔥 Z-API pode mandar em formatos diferentes
    const phone =
      body?.phone ||
      body?.from ||
      body?.data?.phone ||
      body?.data?.from;

    if (!phone) {
      return res.status(200).json({ message: "No phone found" });
    }

    const message =
      "Boa noite, faça o seu pedido pelo nosso cardápio digital: https://seulink.com";

    // 🚀 Envia resposta
    await fetch(
      "https://api.z-api.io/instances/3F23E854F0989254BE639A29748A502A/token/B562973264BFC1519296AD33/send-text",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Client-Token": "Fd3898887d04c427a8cf5f9ac252788a9S",
        },
        body: JSON.stringify({
          phone: phone,
          message: message,
        }),
      }
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erro:", error);
    return res.status(500).json({ error: "Internal error" });
  }
}
