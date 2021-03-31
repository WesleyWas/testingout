import puppeteer from 'puppeteer'

export default async function(show){
    const browser = await puppeteer.launch({
        headless: !show
    })

    const url = 'https://bubble.io/page?type=page&name=scrapper&id=sandbox-wesley&tab=tabs-2';
    const page = await browser.newPage();
    await page.goto(url);

    page.waitForNavigation({
        waitUntil: 'networkidle0',
      })

    // 1 element : body > div.body > div.mainwindow > div.tabs-2.tabcanvas > div > div.root-tokens > div.row > div > div
    const workflowRedBlockSelector = 'body > div.body > div.mainwindow > div.tabs-2.tabcanvas > div > div.root-tokens > div:nth-child(3) > div > div';
    await page.waitForSelector(workflowRedBlockSelector);
    await page.click(workflowRedBlockSelector);

    //
    const redBlockTextSelector = 'body > div.property-editor-2.ui-draggable.ui-draggable-handle > div.viewport > div > div > div:nth-child(4) > div > div.body > div > div > div';
    await page.waitForSelector(redBlockTextSelector);
    let element = await page.$(redBlockTextSelector);
    let value = await page.evaluate(el => el.textContent, element);

    console.log(value)

    //await page.click(workflowButtonSelector);
}