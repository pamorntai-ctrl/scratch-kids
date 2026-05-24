const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')

const CARDS_DIR = path.resolve(__dirname, '..', 'public', 'cards')
const PDF_DIR = path.join(CARDS_DIR, 'pdf')

const FILES = [
  { name: 'action-cards',    width: 2.5, height: 3.5 },
  { name: 'apple-collector', width: 5,   height: 3.5 },
  { name: 'catch-stars',     width: 5,   height: 3.5 },
  { name: 'space-shooter',   width: 5,   height: 3.5 },
  { name: 'whack-a-mole',    width: 5,   height: 3.5 },
  { name: 'maze-runner',     width: 5,   height: 3.5 },
  { name: 'sky-drifter',     width: 5,   height: 3.5 },
]

const IN_TO_PX = 96 // CSS pixels per inch

;(async () => {
  fs.mkdirSync(PDF_DIR, { recursive: true })

  const browser = await puppeteer.launch({
    headless: 'shell',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  for (const file of FILES) {
    const htmlPath = `file://${path.join(CARDS_DIR, file.name + '.html')}`
    const pdfPath  = path.join(PDF_DIR, file.name + '.pdf')

    console.log(`Generating ${file.name}.pdf …`)

    const page = await browser.newPage()

    // Set viewport so the page renders at the right physical size
    await page.setViewport({
      width:  Math.round(file.width  * IN_TO_PX),
      height: Math.round(file.height * IN_TO_PX),
      deviceScaleFactor: 2, // retina quality
    })

    await page.goto(htmlPath, { waitUntil: 'networkidle0', timeout: 30000 })

    // Wait for Google Fonts
    await page.waitForFunction(() => document.fonts.ready)

    await page.pdf({
      path: pdfPath,
      width:  `${file.width}in`,
      height: `${file.height}in`,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    })

    await page.close()
    console.log(`  ✓ ${path.basename(pdfPath)} (${file.width}" × ${file.height}")`)
  }

  await browser.close()
  console.log('\nAll PDFs saved to cards/pdf/')
})()
