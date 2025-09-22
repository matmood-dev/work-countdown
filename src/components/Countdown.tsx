import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import {
  addMinutes,
  diff,
  formatClock,
  formatHMS,
} from "../utils/time";
import type { TimeLeft } from "../utils/time";


const Danger = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-weight: 700;
`;

function useInterval(callback: () => void, delay: number) {
  const saved = useRef(callback);
  useEffect(() => {
    saved.current = callback;
  }, [callback]);
  useEffect(() => {
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default function Countdown({
  startISO,
  minutes,
}: {
  startISO: string;
  minutes: number;
}) {
  const start = useMemo(
    () => (startISO ? new Date(startISO) : new Date()),
    [startISO]
  );
  const end = useMemo(() => addMinutes(start, minutes), [start, minutes]);

  const [left, setLeft] = useState<TimeLeft>(() => diff(new Date(), end));
  useInterval(() => setLeft(diff(new Date(), end)), 1000);

  const done = left.totalMs === 0;
  const pct = useMemo(() => {
    const total = minutes * 60_000;
    const elapsed = Math.min(
      total,
      Math.max(0, new Date().getTime() - start.getTime())
    );
    return Math.round((elapsed / total) * 100);
  }, [start, minutes, left.totalMs]);

  return (
    <Card>
      <Title>Countdown to End of Workday</Title>
      <Big>{done ? "00:00:00" : formatHMS(left)}</Big>
      <Row>
        <EndAt>
          Ends at <strong>{formatClock(end)}</strong>
          {done && (
            <>
              {" "}
              • <Danger>Workday is over</Danger> 🎉
            </>
          )}
        </EndAt>
        <small style={{ color: "#94A3B8" }}>{minutes} min total</small>
      </Row>
      <Bar pct={pct} aria-label={`Progress ${pct}%`} />
    </Card>
  );
}

const Card = styled.section`
  width: min(880px, 96vw);
  margin: 24px auto;
  padding: 22px;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadow.soft};
  @media (max-width: 640px) { padding: 16px; margin: 16px auto; }
`;

const Title = styled.h2`
  margin: 0 0 8px;
  font-size: clamp(18px, 4.2vw, 28px);
`;

const Big = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: clamp(36px, 12vw, 84px);
  line-height: 1;
  letter-spacing: .5px;
`;

const Row = styled.div`
  display: grid;
  gap: 12px;
  align-items: center;
  margin-top: 18px;
  grid-template-columns: 1fr auto;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const EndAt = styled.div`
  font-size: clamp(12px, 3.2vw, 14px);
  color: ${({ theme }) => theme.colors.muted};
`;

const Bar = styled.div<{ pct: number }>`
  margin-top: 16px;
  height: 10px;
  border-radius: 999px;
  overflow: hidden;
  background: #0b1220;
  border: 1px solid ${({ theme }) => theme.colors.border};
  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${({ pct }) => pct}%;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryAlt});
  }
  @media (max-width: 640px) { height: 8px; }
`;
