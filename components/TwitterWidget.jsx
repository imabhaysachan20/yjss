"use client";

import React from 'react';
import Script from 'next/script';

function TwitterWidget() {
  return (
    <>
      <div className="twitter-widget-container">
        <a className="twitter-timeline" href="https://twitter.com/Yjssofficial?ref_src=twsrc%5Etfw">
          Tweets by Yjssofficial
        </a>
      </div>
      <Script src="https://platform.twitter.com/widgets.js" strategy="afterInteractive" />
    </>
  );
}

export default TwitterWidget;
