const partials = require('./partials');


const launcher = async (page, test) => {

  try{
    await partials.login(page);
    await partials.selectButton(page, test.namebutton);
    await partials.selectButtonInTable(page, test.codigo);
    await partials.changeField(page, test.fields);
    await page.waitForTimeout(5000);
    return await partials.showRow(page, test.codigo);
  }catch(err){
    console.error(err);
  }

}


module.exports = {launcher};