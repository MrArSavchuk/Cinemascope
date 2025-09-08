import { createContext, useCallback, useContext, useState } from "react";
import styled from "styled-components";

const Wrap = styled.div`
  position: fixed; right: 16px; bottom: 16px; z-index: 50;
  display: grid; gap: 10px;
`;
const ToastEl = styled.div`
  padding: 12px 14px;
  border-radius: 10px;
  background: ${({ type }) => (type === 'error' ? '#bb2d3b' : '#2d7ebb')};
  color: white; font-weight: 700; box-shadow: 0 10px 24px rgba(0,0,0,.3);
`;

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((msg, type='info', ttl=3500) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), ttl);
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <Wrap>
        {toasts.map(t => <ToastEl key={t.id} type={t.type}>{t.msg}</ToastEl>)}
      </Wrap>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}