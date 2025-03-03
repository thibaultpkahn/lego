const axios = require('axios');
const cheerio = require('cheerio');

async function scrape(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const deals = [];

    $('.product').each((index, element) => {
      const title = $(element).find('.product-title a').text().trim();
      const price = parseFloat($(element).find('.price').text().replace(/[^\d.,]/g, '').replace(',', '.'));
      const discount = parseInt($(element).find('.discount-badge').text().replace(/[^\d]/g, ''), 10);
      const link = $(element).find('.product-title a').attr('href');

      if (title && price && link) {
        deals.push({
          title,
          price,
          discount: discount || 0,
          link: link.startsWith('http') ? link : `https://www.avenuedelabrique.com${link}`
        });
      }
    });

    return deals;
  } catch (error) {
    console.error("Erreur lors du scraping :", error);
    return [];
  }
}

module.exports = { scrape };

const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage data response
 * @param  {String} data - html response
 * @return {Object} deal
 */
const parse = data => {
  const $ = cheerio.load(data, { xmlMode: true });

  return $('div.prods a')
    .map((i, element) => {
      const price = parseInt(
        $(element)
          .find('span.prodl-prix span')
          .text()
      );

      const discount = Math.abs(parseInt(
        $(element)
          .find('span.prodl-reduc')
          .text()
      ));

      return {
        discount,
        price,
        title: $(element).attr('title'),
      };
    })
    .get();
};

/**
 * Scrape a given url page
 * @param {String} url - url to parse
 * @returns 
 */
module.exports.scrape = async url => {
  const response = await fetch(url);

  if (response.ok) {
    const body = await response.text();
    return parse(body);
  }

  console.error(response);
  return null;
};

