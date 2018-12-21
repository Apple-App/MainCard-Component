import React from "react";
import { Glyphicon } from "react-bootstrap";
const Video = ({video}) => {
  return (
    <div>
      <div id="heroImageContainer" className="movie">
        <a className="trailer_play_action_button">
          <div
            className="heroImage movie js-lazyLoad"
            style={{
              backgroundImage: `url(https://img.youtube.com/vi/${
                video.video.split("=")[1]
              }/hqdefault.jpg)`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center 40%",
              width: "100%",
              cursor: "pointer"
            }}
          />
          <div className="playButton in">
            <span className="glyphicon glyphicon-play" />
            {/* <Glyphicon glyph="play" /> */}
          </div>
          <h1 className="title hidden-xs" data-type="title">
            {video.title}
          </h1>
          <span className="h3 year mobile-hide-year">{video.year}</span>
        </a>
      </div>
      <div id="movie-admin-panel" className="admin_panel js-admin-panel" />
      <h1 id="movie-title" className="title clearfix visible-xs">
        {video.title}
        <span className="h3 year"> ({video.year})</span>
      </h1>
    </div>
  );
};
export default Video;