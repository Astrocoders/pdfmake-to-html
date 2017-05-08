import pdfToHTML from '../index'

test('should properly convert a pdf doc definition to DOM', () => {
  const documentDefinition = [{
    stack: [
      {text: 'Text'},
      {text: 'Text'},
      {
        table: {
          body: [
            ['Column\nBreak', 'Column', 'Column'],
            ['Column', 'Column', 'Column'],
            ['Column', 'Column', {text: 'Column', bold: true}],
            ['Column', 'Column', {
              stack: [
                {text: 'Stacked cell'},
                {text: 'Stacked cell'},
                {text: 'Stacked cell'},
              ]
            }],
          ],
        },
      }
    ]
  }]

  expect(pdfToHTML({pdfDocument: documentDefinition}).innerHTML).toMatchSnapshot()
})
