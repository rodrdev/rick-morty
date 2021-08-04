import "../styles/loading.css";
import { useEffect, useState } from "react";
function Loading() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let isMounted = true;

    setTimeout(() => {
      if (isMounted) setLoading(true);
    }, 100);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {loading && (
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </>
  );
}

export default Loading;
