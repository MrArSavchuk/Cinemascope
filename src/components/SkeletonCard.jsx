import styled from "styled-components";

const Card = styled.div`
  border-radius: 14px; overflow: hidden;
  background: rgba(255,255,255,.06);
  border: 1px solid var(--stroke);
  animation: pulse 1.2s infinite ease-in-out;

  @keyframes pulse {
    0% { opacity: .5; }
    50% { opacity: 1; }
    100% { opacity: .5; }
  }
`;
const Box = styled.div`
  height: ${({ h }) => h}px; background: rgba(255,255,255,.08);
`;

export default function SkeletonCard() {
  return (
    <Card>
      <Box h={270} />
      <div style={{ padding: 12 }}>
        <Box h={16} />
        <div style={{ height: 8 }} />
        <Box h={12} />
      </div>
    </Card>
  );
}