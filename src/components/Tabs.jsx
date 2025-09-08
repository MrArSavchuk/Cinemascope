import styled from "styled-components";

const Bar = styled.div`
  display: inline-flex; gap: 8px; padding: 8px; border-radius: 12px;
  background: rgba(0,0,0,.2); border: 1px solid var(--stroke);
`;

const Tab = styled.button`
  padding: 8px 12px; border-radius: 10px; border: 1px solid var(--stroke);
  background: ${({ active }) => active ? 'var(--brand)' : 'rgba(30,30,30,.7)'};
  color: ${({ active }) => active ? '#0b1220' : 'var(--text)'};
  font-weight: 800;
`;

export default function Tabs({ value, onChange }) {
  return (
    <Bar>
      <Tab active={value === 'movie'} onClick={() => onChange('movie')}>Movies</Tab>
      <Tab active={value === 'tv'} onClick={() => onChange('tv')}>TV Shows</Tab>
    </Bar>
  );
}