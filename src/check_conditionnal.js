import puppeteer from 'puppeteer'

export default async function(show, groupToCheck, conditionToCheck){
    const browser = await puppeteer.launch({
        headless: !show,
        defaultViewport : { 'width' : 1920, 'height' : 1080 }
    })

    const url = 'https://bubble.io/page?type=page&name=scrapping_testing&id=sandbox-wesley&tab=tabs-1';
    const page = await browser.newPage();
    await page.goto(url);

    await page.setViewport( { 'width' : 1920, 'height' : 1080 } );

    await page.setUserAgent( 'UA-TEST' );

    page.waitForNavigation({
        waitUntil: 'networkidle0',
      })

    const elementTreeSelector = 'body > div.body > div.visual-edit-toolbox > div.toolbox-pane > div.layers-box.builder > h2';
    await page.waitForSelector(elementTreeSelector, {visible: true});
    await page.evaluate((elementTreeSelector)=>document.querySelector(elementTreeSelector).click(), elementTreeSelector);


    const hiddenElementsEye = 'body > div.body > div.visual-edit-toolbox > div.toolbox-pane > div.layers-box.builder > div > div.options > div.composer-checkbox.bubble-ui > div';
    await page.waitForSelector(hiddenElementsEye);
    await page.evaluate((hiddenElementsEye)=>document.querySelector(hiddenElementsEye).click(), hiddenElementsEye);

    console.log('Entering loop ->');

    var finalI;


    for(var i = 1; i < 20; i=i+2){
        console.log('Index : ' + i);

        const group = 'body > div.body > div.visual-edit-toolbox > div.toolbox-pane > div.layers-box.builder > div > div.tree > div > div:nth-child(' + i + ') > div.element-caption';
        await page.waitForSelector(group);
        let element = await page.$(group);
        let value = await page.evaluate(el => el.textContent, element);

        if(value == groupToCheck){
            finalI = i;
            console.log(groupToCheck + ', child n°' + i + ', has been found !!');
            break;
        }

        console.log(value);
        console.log('------------');
    }

    const groupToVerifySelector = 'body > div.body > div.visual-edit-toolbox > div.toolbox-pane > div.layers-box.builder > div > div.tree > div > div:nth-child(' + finalI + ') > div.element-caption';
    await page.waitForSelector(groupToVerifySelector);
    await page.evaluate((groupToVerifySelector)=>document.querySelector(groupToVerifySelector).click(), groupToVerifySelector);
    
    console.log(groupToCheck + ' has been clicked.');

    const conditionnalSelector = 'body > div.property-editor-2.ui-draggable.ui-draggable-handle > div.tabs > div.tab.tab-2';
    await page.waitForSelector(conditionnalSelector);
    await page.evaluate((conditionnalSelector)=>document.querySelector(conditionnalSelector).click(), conditionnalSelector);


    var finalCondition = '';

    for(var j = 1; j < 4; j = j+1){
        console.log('Conditionnal index : ' + j);

        const condiSelector = 'body > div.property-editor-2.ui-draggable.ui-draggable-handle > div.viewport > div > div:nth-child(1) > div.condition > div > div > span:nth-child(' + j + ')';
        await page.waitForSelector(condiSelector);
        let element = await page.$(condiSelector);
        let value = await page.evaluate(el => el.textContent, element);

        finalCondition = finalCondition + value;
        console.log('found : ' + value);
    }


    console.log('-----------------------------')
    console.log('The 1st final condition is :');
    console.log('--> ' + finalCondition);
    console.log('--> ' + conditionToCheck);

    var isExact = Boolean((conditionToCheck == finalCondition));

    console.log(isExact);

    await browser.close();

    return isExact;

    

}