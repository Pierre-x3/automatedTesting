const showRow = async (page, codigo) => {
  let row = await page.evaluate( (codigo) =>{ 
    const title = [
      'codigo', 'nombre', 'descripcion', 
      'colorprimario', 'colorsecundario', 'tipodeprenda',
      'tela', 'sexo', 'estado', 'imagen', 'button'
    ];
    const objs = {};

    let rows = document.querySelectorAll('table tbody tr');
    for (let row of rows ){
      let tds = row.querySelectorAll('td');
      const obj = {};
      for(let i=0; i<title.length; i++){
        let td = tds[i];
        if(title[i] === 'button'){
          obj[title[i]] = td.querySelector('button');
        }else{
          obj[title[i]] = td.innerHTML;
        }
      }
      objs[tds[0].innerHTML] = obj;
    }
    return objs[codigo];
  }, codigo);

  return row;
}

module.exports = showRow;