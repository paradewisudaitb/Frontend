import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContentEditable from "react-contenteditable";
import { setLocalPicrewText } from "./picrewFunctions";
import "./PicrewContent.scss";
import Logo from "../../../images/logo/logo-sm.png";

class Path {
  constructor(main, sub) {
    this.main = main;
    this.sub = sub;
  }
  getAlt() {
    return `${this.main}-${this.sub}`;
  }
  getImg(data) {
    let target = data[this.main][this.sub];
    return target == undefined ? "" : target;
  }
}

const levelData = {
  "level-1": new Path("base", "bg"),
  "level-2": new Path("base", "skin"),
  "level-3": new Path("base", "rambut-belakang"),
  "level-4": new Path("accessories", "inner"),
  "level-5": new Path("accessories", "outer"),
  "level-6": new Path("accessories", "jahim"),
  "level-7": new Path("face", "telinga"),
  "level-8": new Path("base", "etc"),
  "level-9": new Path("face", "mata"),
  "level-10": new Path("face", "hidung"),
  "level-11": new Path("face", "alis"),
  "level-12": new Path("face", "mulut"),
  "level-13": new Path("face", "janggut"),
  "level-14": new Path("face", "etc"),
  "level-15": new Path("base", "rambut-poni"),
  "level-16": new Path("accessories", "etc"),
  "level-17": new Path("accessories", "kepala"),
  "level-18": new Path("accessories", "pose"),
};

const EditableText = ({ text: html, setText: setHtml, className }) => {
  const handleChange = (evt) => {
    const text = evt.target.value;
    setLocalPicrewText(text);
    setHtml(text);
  };
  return (
    <ContentEditable
      html={html}
      className={className}
      disabled={false}
      onChange={handleChange}
    />
  );
};

export const PicrewContent = ({ data, text, setText, showText }) => {
  const images = [];
  for (const [key, value] of Object.entries(levelData)) {
    value.getImg(data) !== undefined &&
      value.getImg(data) !== "" &&
      images.push(
        <img
          className={key}
          src={value.getImg(data)}
          alt={value.getAlt()}
          key={value.getAlt()}
        />
      );
  }
  return (
    <div className="picrew-content">
      {images.length > 0 ? (
        images
      ) : (
        <p>Susun avatarmu dengan memilih komponen-komponen di kanan/bawah!</p>
      )}
      <img src={Logo} className="logo" alt="logo-wispril-avatar" />
      <AnimatePresence>
        {showText && (
          <motion.h5
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text"
          >
            <EditableText className="shadow" text={text} setText={setText} />
            <EditableText text={text} setText={setText} />
          </motion.h5>
        )}
      </AnimatePresence>
    </div>
  );
};
