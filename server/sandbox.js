/* eslint-disable no-console, no-process-exit */
const avenuedelabrique = require('./websites/avenuedelabrique');
const dealabs = require('./websites/dealabs');
const vinted = require('./websites/vinted');

async function main() {
  try {
    // Avenue de la Brique
    console.log('🕵️‍♀️ Browsing Avenue de la Brique...');
    const legoDeals = await avenuedelabrique.scrape('https://www.avenuedelabrique.com/nouveautes-lego');
    console.log(`✅ ${legoDeals.length} deals trouvés sur Avenue de la Brique`);
    legoDeals.forEach(deal => {
      console.log(`📦 ${deal.title} - 💰 ${deal.price}€ - 🔥 ${deal.discount}%`);
    });
    console.log('------------------------------');

    // Dealabs
    console.log('🕵️‍♀️ Browsing Dealabs...');
    const dealabsDeals = await dealabs.scrape('https://www.dealabs.com/groupe/lego');
    console.log(`✅ ${dealabsDeals.length} deals trouvés sur Dealabs`);
    dealabsDeals.forEach(deal => {
      console.log(`📦 ${deal.title} - 💰 ${deal.price}€ - 🔥 ${deal.discount}%`);
    });
    console.log('------------------------------');

    // Vinted
    console.log('🕵️‍♀️ Browsing Vinted...');
    const legoId = '43230'; // ID LEGO à scraper
    const vintedSales = await vinted.scrape(legoId);
    console.log(`✅ ${vintedSales.length} ventes trouvées sur Vinted`);
    vintedSales.forEach(sale => {
      console.log(`📦 ${sale.title} - 💰 ${sale.price}€`);
      console.log(`🔗 Lien : ${sale.link}`);
      console.log('------------------------------');
    });

    console.log('✅ Tous les scrapes sont terminés !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du scraping :', error);
    process.exit(1);
  }
}

main();

