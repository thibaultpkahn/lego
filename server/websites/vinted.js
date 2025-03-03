const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

/**
 * Parse webpage data response
 * @param {String} data - HTML response
 * @returns {Array} - List of sales
 */
const parse = (data) => {
  const $ = cheerio.load(data);
  const sales = [];

  $('div.feed-grid__item').each((i, element) => {
    const title = $(element).find('h3').text().trim();
    const price = parseFloat($(element).find('.price').text().replace(/[^\d.,]/g, '').replace(',', '.'));
    const link = $(element).find('a').attr('href');
    const image = $(element).find('img').attr('src');

    if (title && price && link) {
      sales.push({
        title,
        price,
        link: link.startsWith('http') ? link : `https://www.vinted.fr${link}`,
        image
      });
    }
  });

  return sales;
};

/**
 * Scrape sales from Vinted for a given LEGO set
 * @param {String} legoId - LEGO set ID to search for
 * @returns {Array} - List of sales
 */
module.exports.scrape = async (legoId) => {
  try {
    const url = `https://www.vinted.fr/catalog?search_text=lego%20${legoId}`;
    const response = await fetch(url);
    const body = await response.text();
    const sales = parse(body);

    // Save to JSON file
    fs.writeFileSync(`vinted_sales_${legoId}.json`, JSON.stringify(sales, null, 2));

    console.log(`✅ ${sales.length} ventes sauvegardées dans vinted_sales_${legoId}.json`);
    return sales;
  } catch (error) {
    console.error("Erreur lors du scraping :", error);
    return [];
  }
};