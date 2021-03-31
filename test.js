import scrape_workflow from './src/scrape_workflow.js';
import scrape_visual from './src/scrape_visual.js'
import check_conditionnal from './src/check_conditionnal.js'


var isExact = Boolean(await check_conditionnal(true, 'Group To Verify', 'Get hello from page URL is "hello"'));

if(isExact){
    console.log('Ok, this condition is right. Give +1.')
}else{
    console.log('This answer is wrong. Do not add any point to the final mark.')
}