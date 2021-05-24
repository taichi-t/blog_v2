const getFormattedHeadingsArray = (headingElements: Element[]) => {
  const depthDirective = (nodeName: string) => {
    switch (nodeName) {
      case 'H1':
        return 0;
      case 'H2':
        return 1;
      case 'H3':
        return 2;
      case 'H4':
        return 3;
      case 'H5':
        return 4;
      case 'H6':
        return 5;
      default:
        return 5;
    }
  };
  const formattedHeading = headingElements.map((heading) => {
    const { textContent: title, id, nodeName } = heading;
    const depth = depthDirective(nodeName);
    return { title, id, depth };
  });
  return formattedHeading;
};

export default getFormattedHeadingsArray;
