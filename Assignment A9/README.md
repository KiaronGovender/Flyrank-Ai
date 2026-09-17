# Assignment A9 - Web Scraping Project

## Project Overview

This project demonstrates web scraping techniques using Python, focusing on:
- Fetching and parsing robots.txt files
- Navigating website structures
- Collecting product catalog data
- Respecting site guidelines (robots.txt)

---

## Target Classification

### Site
**books.toscrape.com** - A sandbox e-commerce website designed for testing web scraping techniques. It mimics a real bookstore with categories, products, prices, and availability information.

### Why This Site
This site is ideal for learning web scraping because:
- It's explicitly designed as a "sandbox" for testing purposes
- The site even states "We love being scraped!" on the homepage
- It has a clear, predictable HTML structure
- No complex JavaScript rendering required
- Perfect for practicing ethical scraping with robots.txt

### How Much Data
First 3 catalogue pages only:
### What Data We Collect
From each catalogue page and individual product pages:
- Page titles and navigation structure
- Book/product titles
- Prices (when available)
- Availability status (In stock/Out of stock)
- Product images (URLs only, not downloaded)

### Why This Is Appropriate
This scraping project is appropriate because:
1. **Educational Purpose**: The site is explicitly designed for learning and testing web scraping skills
2. **Sandbox Environment**: It's a controlled environment with no real commercial data
3. **Respectful Scraping**: We check robots.txt first and follow its guidelines
4. **Rate Limiting**: We add delays between requests to avoid overloading the server
5. **No Personal Data**: Only public product information is collected, no user data

---

## Robots.txt Analysis

**Status:** Not found (404)  
**Message:** no robots file found

The robots.txt file does not exist at `https://books.toscrape.com/robots.txt`. This is a common scenario where websites choose not to have a robots.txt file, meaning they don't explicitly restrict web crawlers. However, this doesn't mean the site encourages scraping - it simply means there are no explicit rules defined.

### Implications
- No `Disallow` rules exist for any user agents
- By default, without a robots.txt file, crawlers can access all publicly available content
- This is different from permission - it's just absence of restrictions
- We still scrape ethically by respecting the site's educational purpose and adding rate limits

---

## Collected Data Summary

### Catalogue Pages Visited

### Total Books Collected
0 individual book records collected

---

## Technical Notes

### Libraries Used
- `requests`: For HTTP requests and content fetching
- `beautifulsoup4`: For HTML parsing and data extraction
- `time`: For adding delays between requests (rate limiting)

### Best Practices Followed
1. ✅ Checked robots.txt before scraping
2. ✅ Added 1-second delay between requests
3. ✅ Used appropriate User-Agent header
4. ✅ Only collected publicly available data
5. ✅ Respected site's educational purpose

---

*Generated on: 2026-09-17*
