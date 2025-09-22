import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`
*, *::before, *::after { box-sizing: border-box; }
:root { color-scheme: dark; }
html, body, #root { height: 100%; }
body {
margin: 0;
font-family: ${({ theme }) => theme.fonts.sans};
background: radial-gradient(1200px 600px at 10% -10%, #0ea5e91a, transparent),
radial-gradient(1000px 700px at 90% 10%, #22d3ee22, transparent),
${({ theme }) => theme.colors.bg};
color: ${({ theme }) => theme.colors.text};
}
::selection { background: #22d3ee55; }
`;