import { FC } from 'react';
import { ENV } from '@/env.server';
import Script from 'next/script';

const code = `
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "${ENV.CLARITY_ID}");
`;

export const MsClarity: FC = () => {
  return <Script id="ms-clarity">{code}</Script>;
};
