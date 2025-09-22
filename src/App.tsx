import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Countdown from "./components/Countdown";
import DurationChips, { type Preset } from "./components/DurationChips";
import Footer from "./components/Footer";

const presets: Preset[] = [
  { label: "6h", minutes: 360 },
  { label: "8h", minutes: 480 },
  { label: "8h 30m", minutes: 510 },
  { label: "9h", minutes: 540 },
];

const LS_KEYS = { start: "wc.startISO", mins: "wc.minutes" } as const;

export default function App() {
  const [startISO, setStartISO] = useState<string>(
    () => localStorage.getItem(LS_KEYS.start) || ""
  );
  const [minutes, setMinutes] = useState<number>(
    () => Number(localStorage.getItem(LS_KEYS.mins)) || 480
  );

  useEffect(() => {
    if (startISO) localStorage.setItem(LS_KEYS.start, startISO);
  }, [startISO]);
  useEffect(() => {
    localStorage.setItem(LS_KEYS.mins, String(minutes));
  }, [minutes]);

  const showCountdown = useMemo(() => Boolean(startISO), [startISO]);

  return (
    <Page>
      <Shell>
        <Header>
          <H1>Workday Countdown</H1>
          <P>
            Pick your start time and duration. See time left, end time, and
            progress.
          </P>
          <FieldRow>
            <Label>
              Start time
              <Input
                type="datetime-local"
                value={startISO}
                onChange={(e) => setStartISO(e.target.value)}
              />
            </Label>
            <div>
              <Label>Duration</Label>
              <DurationChips
                value={minutes}
                onChange={setMinutes}
                presets={presets}
              />
            </div>
          </FieldRow>
          <Reset onClick={() => setStartISO("")}>Reset</Reset>
        </Header>

        {showCountdown && <Countdown startISO={startISO} minutes={minutes} />}
      </Shell>
      <Footer />
    </Page>
  );
}

const Page = styled.main`
  min-height: 100%;
  display: grid;
  place-items: center;
  padding: 24px 24px 64px;
  @media (max-width: 640px) {
    padding: 12px 12px 72px;
  }
`;

const Shell = styled.div`
  width: min(980px, 96vw);
  display: grid;
  gap: 18px;
`;

const Header = styled.header`
  display: grid;
  gap: 12px;
  align-items: start;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadow.soft};
  padding: 20px;
  @media (max-width: 640px) {
    padding: 14px;
    gap: 10px;
  }
`;

const H1 = styled.h1`
  margin: 0;
  font-size: clamp(22px, 6vw, 42px);
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.primaryAlt}
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const P = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: clamp(12px, 2.8vw, 16px);
`;

const FieldRow = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr auto;
  align-items: end;
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  display: grid;
  gap: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
`;

const Input = styled.input`
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.cardAlt};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: inherit;
  width: 100%; 
  font-size: 16px; 
`;

const Reset = styled.button`
  justify-self: start;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: inherit;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radii.pill};
  cursor: pointer;
  font-weight: 600;
  @media (max-width: 640px) {
    padding: 10px 14px;
  }
`;
