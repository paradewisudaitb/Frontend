import React, { useState, useEffect } from "react";
import Tooltip from "../shared/Tooltip";
import { List, ListItemPost } from "../shared/List";
import { sendAnalyticsAction, WISUDAWAN_ACTION } from "../../api/analytics";
import "./Message.scss";

const MessageForm = ({ onPost }) => {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [tooltipMsg, setTooltipMsg] = useState("");
  const ANONYMOUS = "Anonoymous";
  const ERROR_NAME = `Nama yang kosong akan langsung dijadikan ${ANONYMOUS}`;
  const ERROR_MSG = "Pesan tidak boleh kosong";

  const validate = () => {
    let res = [];
    if (name === "") res.push(ERROR_NAME);
    if (msg === "") res.push(ERROR_MSG);
    setTooltipMsg(res);
  };

  useEffect(() => {
    validate();
  }, [name, msg]);

  const handleSubmit = async () => {
    if (!msg) return;
    sendAnalyticsAction(WISUDAWAN_ACTION, "Send message");
    onPost(name, msg);
  };

  return (
    <div className="message-form">
      <div className="message form-col">
        <h6>Pesan</h6>
        <textarea
          type="text-area"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Jika dibiarkan kosong, maka akan menjadi “Pengagum rahasia”"
        ></textarea>
      </div>
      <div className="sender form-col">
        <h6>Pengirim (Opsional)</h6>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Dari aku yang sudah lama memendam rasa"
        ></input>
      </div>
      <Tooltip text={tooltipMsg}>
        <button className="message-send" onClick={handleSubmit}>
          <h5>KIRIM</h5>
        </button>
      </Tooltip>
    </div>
  );
};

const Messages = (props) => {
  let messageList = null;
  if (props.data) {
    messageList = props.data.map((el, idx) => {
      return (
        <ListItemPost key={idx} title={el.sender}>
          {el.message}
        </ListItemPost>
      );
    });
  } else {
    messageList = <p>Yuk tulis pesan untuk wisudawan ini!</p>;
  }

  return <List>{messageList}</List>;
};

export { MessageForm, Messages };
