// dealabs.js
const axios = require('axios');
const cheerio = require('cheerio');

async function scrape(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        // Un User-Agent crédible peut aider à éviter les blocages
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
      }
    });

    const $ = cheerio.load(data);
    const deals = [];

    // On essaie d'abord de récupérer les deals à l'aide d'un sélecteur basé sur l'attribut data-thread-id
    let articles = $('article[data-thread-id]');

    // Si aucun élément n'est trouvé, on tente avec le sélecteur pour la nouvelle version (ex: PostCard)
    if (articles.length === 0) {
      articles = $('article.PostCard');
    }

    articles.each((i, element) => {
      // Essai de récupération du titre
      const title =
        $(element)
          .find('a.thread-title, h3.PostCard-title')
          .first()
          .text()
          .trim() || '';

      // Récupération du lien associé
      let link = $(element)
        .find('a.thread-title, a.PostCard-link')
        .first()
        .attr('href') || '';
      if (link && !link.startsWith('http')) {
        link = `https://www.dealabs.com${link}`;
      }

      // Récupération du prix s'il est affiché (le sélecteur peut varier)
      const priceText = $(element)
        .find('.thread-price, div.PostCard-price')
        .first()
        .text()
        .trim();
      let price = parseFloat(
        priceText.replace(/[^\d.,]/g, '').replace(',', '.')
      );
      if (isNaN(price)) {
        price = 0;
      }

      // Récupération du pourcentage de réduction (si présent)
      const discountText = $(element)
        .find('.thread-discount, div.PostCard-discount')
        .first()
        .text()
        .trim();
      let discount = parseInt(
        discountText.replace(/[^\d]/g, ''),
        10
      );
      if (isNaN(discount)) {
        discount = 0;
      }

      if (title && link) {
        deals.push({
          title,
          price,
          discount,
          link
        });
      }
    });

    return deals;
  } catch (error) {
    console.error("Erreur lors du scraping de Dealabs :", error);
    return [];
  }
}

module.exports = { scrape };
