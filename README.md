![Medusa Taxer Integration](https://rigby-web.fra1.digitaloceanspaces.com/medusataxjar.png)

<div align="center">
  <h1>Medusa TaxJar Integration | Rigby</h1>
  <p>Streamline tax calculations for your Medusa store with TaxJar.</p>

  <!-- Shields.io Badges -->
  <a href="https://github.com/rigby-sh/medusa-taxjar-integration/blob/main/LICENSE">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg" />
  </a>
  <a href="https://rigbyjs.com/en#contact">
    <img alt="Support" src="https://img.shields.io/badge/support-contact%20author-blueviolet.svg" />
  </a>

  <!-- Documentation and Website Links -->
  <p>
    <a href="https://www.medusajs.com/">Medusa</a> |
    <a href="https://www.taxjar.com/">TaxJar</a> |
    <a href="https://rigbyjs.com/en">Rigby</a>
  </p>
</div>
<br>

## About the integration

The **Medusa TaxJar Integration** connects [Medusa](https://www.medusajs.com/) with [TaxJar](https://www.taxjar.com/), enabling seamless automation of tax calculations for products and shipping. By leveraging this integration, you can save time and eliminate manual tax handling, allowing you to focus on your core e-commerce operations.

**Key features include:**

- **Automated tax calculations** tailored for diverse product categories.
- **Product tax code management** to ensure tax accuracy.
- **Real-time updates** to stay compliant with tax laws.

## Integration Overview

### Step 1: Set up your TaxJar account

1. Create an account on [TaxJar](https://www.taxjar.com/).
2. Obtain your **API key** and configure your business details, including nexus information.

### Step 2: Extend Medusa's ProductCategory Model

Enhance the ProductCategory model to include a `tax_code` property. This allows TaxJar to calculate taxes based on product categories. Follow the detailed implementation steps outlined in the [documentation](#).

### Step 3: Sync Tax Codes

Utilize the TaxJar API to fetch and seed tax codes into your database. A sample script is provided in the guide for easy seeding. -> [See the guide here ->](https://rigbyjs.com/blog/medusa-taxjar)

### Step 4: Implement a Custom Tax Provider

Replace Medusa's default tax provider with a custom TaxJar provider. This step ensures that your transactions leverage TaxJar's powerful tax calculation engine.

### Step 5: Admin Configuration

Add a user-friendly widget in the Medusa admin panel to assign tax codes to product categories.

### Wrapping Up

By completing these steps, your Medusa store will have automated tax calculations, making tax compliance and management effortless.

## Need help?

If you have any questions, need help with installing or configuring the integration, or require assistance with your Medusa project—we are here to help!

### About us

<img src="https://rigby-web.fra1.digitaloceanspaces.com/rigby-medusa.svg" alt="Rigby Medusa Expert" width="180">

We are battle-tested Medusa.js Experts & JavaScript Masters - Our software house specializes in B2B & Multi-Vendor Marketplace eCommerce development.

### How can we help you?

- **Consulting in the field of strategy development**
- **Composable eCommerce development in Medusa.js**
- **System maintenance and long-term support**
- **Support in ongoing Medusa projects**
- **Medusa Plugin development**
- **Ecommerce & data migration**

Check out our project featured on Medusa: https://medusajs.com/blog/patyna/

### Contact us

💻 [Contact us](https://rigbyjs.com/en#contact)  
📧 hello@rigbyjs.com  

## Useful Links

- [Rigby blog](https://rigbyjs.com/en/blog)
- [Medusa website](https://medusajs.com)
- [Community Discord](https://discord.gg/medusajs)
- [Medusa repo](https://github.com/medusajs/medusa/blob/develop/LICENSE)
- [Medusa Docs](https://github.com/medusajs/medusa)
- [TaxJar website](https://www.taxjar.com/)
- [TaxJar API Docs](https://developers.taxjar.com/api/)

## License

Licensed under the [MIT License](https://github.com/rigby-sh/medusa-taxjar-integration/blob/main/LICENSE).
