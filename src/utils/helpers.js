function noop() {}
function setRefs(...refs) {
  return function setRef(el) {
    refs.forEach(ref => {
      if (typeof ref === "function") {
        ref(el);
      } else if (ref.hasOwnProperty("current")) {
        ref.current = el;
      }
    });
  };
}

function mapGridToListOnItemsRendered(gridData, useOverscanForLoading = false) {
  const {
    visibleRowStartIndex = 0,
    visibleRowStopIndex = 0,
    overscanRowStartIndex = 0,
    overscanRowStopIndex = 0
  } = gridData;

  const startRow = useOverscanForLoading
    ? overscanRowStartIndex
    : visibleRowStartIndex;
  const endRow = useOverscanForLoading
    ? overscanRowStopIndex
    : visibleRowStopIndex;

  return {
    visibleStartIndex: startRow,
    visibleStopIndex: endRow
  };
}

export { noop, setRefs, mapGridToListOnItemsRendered };
