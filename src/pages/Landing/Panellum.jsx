import React from "react";
import { Pannellum } from "pannellum-react";
import panellumBG from "../../images/panellum/sample.jpg";
import { Navbar } from "../../components/TemplateComponents/Navbar";
import "./Panellum.scss";

export const Panellum = () => {
  return (
    <>
      <Navbar />
      <Pannellum
        width="100%"
        height="100vh"
        image={panellumBG}
        pitch={10}
        yaw={180}
        hfov={110}
        autoLoad
        showZoomCtrl={false}
      >
        <Pannellum.Hotspot type="custom" pitch={31} yaw={150} name="hs1" />
      </Pannellum>
    </>
  );
};
