import { useCallback, useContext, useRef, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";
import AccessTokenContext from "../components/AccessTokenContext";

function useRefManager({ mount, unmount } = {}) {
  const storedRefs = useRef({});
  const refCallbacks = useRef({});
  const getRef = useCallback(
    id => {
      if (!refCallbacks.current[id]) {
        refCallbacks.current[id] = ref => {
          if (!storedRefs.current[id] && ref) {
            if (mount) {
              mount(ref);
            }
            storedRefs.current[id] = ref;
          } else if (!ref) {
            if (unmount) {
              unmount(storedRefs.current[id]);
            }
            delete storedRefs.current[id];
          }
        };
      }
      return refCallbacks.current[id];
    },
    [mount, unmount]
  );
  return { refs: storedRefs, getRef };
}

function useResizeObserver({ onResize }) {
  const resizeObserver = useRef(null);

  function getResizeObserver() {
    if (resizeObserver.current !== null) {
      return resizeObserver.current;
    } else {
      const observer = new ResizeObserver(onResize);
      resizeObserver.current = observer;
      return observer;
    }
  }

  return {
    observe: node => getResizeObserver().observe(node),
    unobserve: node => getResizeObserver().unobserve(node)
  };
}

function useMeasurements() {
  const [measurements, setMeasurements] = useState({});
  const { observe, unobserve } = useResizeObserver({
    onResize: entries => {
      const nextMeasurements = {};
      for (const key in refs.current) {
        nextMeasurements[key] = refs.current[key].getBoundingClientRect();
      }
      setMeasurements(nextMeasurements);
    }
  });
  const { refs, getRef } = useRefManager({
    mount: observe,
    unmount: unobserve
  });
  return { measurements, getRef };
}

function useAuthState() {
  const [accessToken] = useContext(AccessTokenContext);
  const isAuthenticated = !!accessToken;
  return isAuthenticated;
}

export { useAuthState, useMeasurements };
