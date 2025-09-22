import styled from "styled-components";

export type Preset = { label: string; minutes: number };

export default function DurationChips({
  value,
  onChange,
  presets,
}: {
  value: number;
  onChange: (m: number) => void;
  presets: Preset[];
}) {
  return (
    <Wrap>
      {presets.map((p) => (
        <Chip
          key={p.minutes}
          active={value === p.minutes}
          onClick={() => onChange(p.minutes)}
        >
          {p.label}
        </Chip>
      ))}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 10px;
`;

const Chip = styled.button<{ active?: boolean }>`
  border: 1px solid
    ${({ active, theme }) =>
      active ? theme.colors.primary : theme.colors.border};
  background: ${({ active, theme }) =>
    active ? theme.colors.primary : "transparent"};
  color: ${({ active }) => (active ? "#0b1220" : "inherit")};
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radii.pill};
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 0.2px;
  transition: transform 0.08s ease, background 0.15s ease, color 0.15s ease,
    border-color 0.15s ease;
  &:hover {
    transform: translateY(-1px);
  }
  font-size: clamp(12px, 2.8vw, 14px); 
  min-height: 36px;
`;
