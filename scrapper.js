import puppeteer from "puppeteer";

async function scrapeGoogleResults(keyword) {
  const browser = await puppeteer.launch({
    headless: false, // Altere para false para abrir o navegador visível
    args: ["--no-sandbox", "--disable-setuid-sandbox"] // Evita bloqueios do Google
  });

  const page = await browser.newPage();

  // Simular um comportamento mais humano
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
  );
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`https://www.google.com/search?q=${encodeURIComponent(keyword)}`, {
    waitUntil: "load",
    timeout: 60000, // Tempo máximo de carregamento
  });

  await page.waitForSelector("h3");

  const results = await page.evaluate(() => {
    let items = [];
    let elements = document.querySelectorAll("h3");
    elements.forEach(element => {
      items.push(element.innerText);
    });
    return items;
  });

  await browser.close();
  return results;
}

export default { scrapeGoogleResults };
