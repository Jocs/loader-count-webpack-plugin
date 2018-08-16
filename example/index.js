import pdfjs from 'pdfjs-dist/build/pdf'

(async function() {
  const pdf = pdfjs.getDocument('http://cdn.mozilla.net/pdfjs/tracemonkey.pdf')
  console.log(pdf)
})()
  