import styled from "styled-components";

export default function Footer() {
  return (
    <Wrap>
      © {new Date().getFullYear()} Workday Countdown ·{" "}
      <a
        href="https://matmood.netlify.app"
        target="_blank"
        rel="noreferrer"
        style={{ color: "inherit", marginLeft: 6 }}
      >
        Mahmood
      </a>
    </Wrap>
  );
}

const Wrap = styled.footer`
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  padding: 10px 12px calc(10px + env(safe-area-inset-bottom));
  background: rgba(16, 24, 39, 0.8);
  backdrop-filter: blur(8px);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
`;
