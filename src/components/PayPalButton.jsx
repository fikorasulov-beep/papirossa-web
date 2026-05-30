import { useEffect, useRef, useState } from "react";
import {
  PAYPAL_CLIENT_ID,
  PAYPAL_CURRENCY,
  PAYPAL_SDK_BASE,
  PAYPAL_ENABLED,
} from "../config.js";

// Lazy-load the PayPal JS SDK once per page
let sdkPromise = null;
function loadSdk() {
  if (sdkPromise) return sdkPromise;
  if (typeof window !== "undefined" && window.paypal) {
    sdkPromise = Promise.resolve(window.paypal);
    return sdkPromise;
  }
  sdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `${PAYPAL_SDK_BASE}?client-id=${PAYPAL_CLIENT_ID}&currency=${PAYPAL_CURRENCY}&intent=capture`;
    script.async = true;
    script.onload = () => resolve(window.paypal);
    script.onerror = () => reject(new Error("PayPal SDK failed to load"));
    document.head.appendChild(script);
  });
  return sdkPromise;
}

/**
 * Renders a PayPal Smart Button. Charges `amount` in PAYPAL_CURRENCY.
 *
 * Props:
 *   amount      number  — total to charge (e.g. 42.50)
 *   description string  — appears on the PayPal receipt
 *   onSuccess   fn      — called with (orderDetails) on approval
 *   onError     fn      — called with (err) on failure
 */
export default function PayPalButton({ amount, description = "Order", onSuccess, onError }) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | loading | ready | error

  // If template is not configured yet, show a demo placeholder instead.
  if (!PAYPAL_ENABLED) {
    return (
      <button
        type="button"
        className="paypal-demo-btn"
        onClick={() => {
          if (onSuccess) onSuccess({ demo: true, amount });
        }}
      >
        <span className="paypal-logo">
          <strong style={{ color: "#003087" }}>Pay</strong>
          <strong style={{ color: "#009cde" }}>Pal</strong>
        </span>
        <span style={{ marginLeft: 8, opacity: 0.6 }}>(demo)</span>
      </button>
    );
  }

  useEffect(() => {
    if (!amount || amount <= 0) return;
    let cancelled = false;
    setStatus("loading");

    loadSdk()
      .then((paypal) => {
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = "";
        paypal
          .Buttons({
            style: { layout: "vertical", color: "gold", shape: "rect", label: "paypal" },
            createOrder: (data, actions) =>
              actions.order.create({
                purchase_units: [
                  {
                    description,
                    amount: { value: Number(amount).toFixed(2), currency_code: PAYPAL_CURRENCY },
                  },
                ],
              }),
            onApprove: (data, actions) =>
              actions.order.capture().then((details) => {
                if (onSuccess) onSuccess(details);
              }),
            onError: (err) => {
              console.error("PayPal error:", err);
              if (onError) onError(err);
              setStatus("error");
            },
          })
          .render(containerRef.current)
          .then(() => setStatus("ready"));
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
        if (onError) onError(err);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, description]);

  return (
    <div className="paypal-button-wrap">
      {status === "loading" && <div className="paypal-loading">Loading PayPal...</div>}
      {status === "error" && (
        <div className="paypal-error">PayPal failed to load. Check your Client ID.</div>
      )}
      <div ref={containerRef} />
    </div>
  );
}
