const selectButton = async(page, namebutton) => {
  await page.evaluate( (namebutton)=>{
    let forms = document.querySelectorAll('form');
    console.log('forms', forms);
    for ( let form of forms ){
      if (form.action.toLowerCase().indexOf(namebutton.toLowerCase()) != '-1'){
        form.querySelector('button').click();
      }
    }
  }, namebutton);
  await page.waitForNavigation({
    waitUntil: 'networkidle0',
  });
}

module.exports = selectButton;