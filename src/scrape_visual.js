import puppeteer from 'puppeteer'

export default async function(show){
    const browser = await puppeteer.launch({
        headless: !show,
        defaultViewport : { 'width' : 1920, 'height' : 1080 }
    })

    const url = 'https://bubble.io/page?type=page&name=custom-rg&id=sandbox-wesley&tab=tabs-1';
    const page = await browser.newPage();
    await page.goto(url);

    await page.setViewport( { 'width' : 1920, 'height' : 1080 } );

    await page.setUserAgent( 'UA-TEST' );

    page.waitForNavigation({
        waitUntil: 'networkidle0',
      })

    const elementTreeSelector = 'body > div.body > div.visual-edit-toolbox > div.toolbox-pane > div.layers-box.builder > h2';
    await page.waitForSelector(elementTreeSelector, {visible: true});
    //page.hover(elementTreeSelector);
    //await page.click(elementTreeSelector);
    await page.evaluate((elementTreeSelector)=>document.querySelector(elementTreeSelector).click(), elementTreeSelector);


    const hiddenElementsEye = 'body > div.body > div.visual-edit-toolbox > div.toolbox-pane > div.layers-box.builder > div > div.options > div.composer-checkbox.bubble-ui > div';
    await page.waitForSelector(hiddenElementsEye);
    await page.evaluate((hiddenElementsEye)=>document.querySelector(hiddenElementsEye).click(), hiddenElementsEye);
    //

    const plusSelector = 'body > div.body > div.visual-edit-toolbox > div.toolbox-pane > div.layers-box.builder > div > div.tree > div > div.state-entry.has-kids > div.plus-minus';
    await page.waitForSelector(plusSelector);
    await page.evaluate((plusSelector)=>document.querySelector(plusSelector).click(), plusSelector);

    const RG = 'body > div.body > div.visual-edit-toolbox > div.toolbox-pane > div.layers-box.builder > div > div.tree > div > div:nth-child(4) > div.state-entry.has-kids > div.element-caption';
    await page.waitForSelector(RG);
    await page.evaluate((RG)=>document.querySelector(RG).click(), RG);

    const expressionRGSelector = 'body > div.property-editor-2.ui-draggable.ui-draggable-handle > div.viewport > div > div:nth-child(1) > div:nth-child(2) > div > div.body > div > div > div > span';
    await page.waitForSelector(expressionRGSelector);
    let element = await page.$(expressionRGSelector);
    let value = await page.evaluate(el => el.textContent, element);

    console.log(value);





    //const hiddenElementsEye = 'body > div.body > div.visual-edit-toolbox > div.toolbox-pane > div.layers-box.builder > div > div.options > div.composer-checkbox.bubble-ui > div'
    //await page.waitForSelector(redBlockTextSelector)
    //let element = await page.$(redBlockTextSelector)
    //let value = await page.evaluate(el => el.textContent, element)

    //console.log(value)

    //await page.click(workflowButtonSelector);
}