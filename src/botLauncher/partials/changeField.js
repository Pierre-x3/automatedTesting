const changeField = async (page, fields) => {
  await page.evaluate( (fields)=>{
    for (let field of fields){
      let objField = document.querySelector(`[name="${field.name}"]`);
      objField.value = field.value;
    }
  }, fields);
  await page.waitForTimeout(5000);
  let submit = await page.$('button[type="submit"]');
  submit.click();
  await page.waitForNavigation({
    waitUntil: 'networkidle0',
  });
}

module.exports = changeField;