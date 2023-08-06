function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
    
    let modifyTheContent = [];

    const convertToHTMLPosition = (() => {
      const initialPosition = htmlContent.indexOf(plainText);
      return (plainTextPosition) => {
        const { start, end } = plainTextPosition;
        const startingHTMLPosition = initialPosition + start;
        return { start: startingHTMLPosition, end: startingHTMLPosition + (end - start) };
      };
    })();
  
    let indexingInLast = 0;
    plainTextPositions.forEach((plainTextPosition) => {
      const { start: startingHTMLPosition, end: endHTMLPosition } = convertToHTMLPosition(plainTextPosition);

      modifyTheContent.push(htmlContent.slice(indexingInLast, startingHTMLPosition));

      modifyTheContent.push(`<mark>${htmlContent.slice(startingHTMLPosition, endHTMLPosition)}</mark>`);

      indexingInLast = endHTMLPosition;
    });
  
    modifyTheContent.push(htmlContent.slice(indexingInLast));
  
    return modifyTheContent.join('');
  }
  
  module.exports = highlightHTMLContent;