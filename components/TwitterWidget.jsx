"use client";

import React from 'react';

function TwitterWidget() {
  return (
    <div className="twitter-widget-container">
      <a className="twitter-timeline" href="https://twitter.com/Yjssofficial?ref_src=twsrc%5Etfw">Tweets by Yjssofficial</a>
      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
    </div>
  );
}

export default TwitterWidget;
