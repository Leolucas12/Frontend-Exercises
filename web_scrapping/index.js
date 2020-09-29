const puppeteer = require('puppeteer');
const fs = require('fs');
 
(async () => {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage();
    await page.goto('https://instagram.com/rocketseat_oficial')

    //método evaluate serve para executar no browser
    const imgList = await page.evaluate(() => {
        //pegar todas as imagens em um NodeList
        const nodeList = document.querySelectorAll('article img')
        //transformar o NodeList em Array com spread
        const imgArray = [...nodeList]
        //transformar os elementos html em objetos JS com map
        const imgList = imgArray.map( ({src}) => ({
            src
        }))
        //deixar disponível para fora da função
        return imgList
    })

    //escrever os dados em arquivo local
    fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
        if (err) throw new Error('something went wrong')

        console.log('well done!')
    })

    await browser.close();
})();
