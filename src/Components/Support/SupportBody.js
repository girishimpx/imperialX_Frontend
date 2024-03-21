import React, { useState, useEffect } from "react";
import "./SupportBody.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";

import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import Axios from "../../Axios";
import Consts from '../../Constansts'
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  transbg: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
    overflow: "hidden",
    position: "relative",
  },
  middlepart: {
    background: "#000 !important",
    borderRadius: "10px 10px 0 0 !important",
    boxShadow: "none !important",
    overflow: "hidden",
    position: "relative",
  },
});

let socket = io.connect(Consts.socketurl);
const SupportBody = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [chat, setchat] = useState();
  const [chaterr, setchaterr] = useState();
  const [mychat1, setmychat1] = useState();
  const [key, setkey] = useState();

  const getmychat1 = async () => {
    Axios.get("/SupportNew/myQuery", {
      headers: {
        Authorization: localStorage.getItem("Mellifluous"),
      },
    })
      .then((res) => {
        const reverseddate = res.data.result[0].Query.reverse();
        res.data.result[0].Query = reverseddate;

        setkey(`${res.data.result[0].admin}${res.data.result[0].user_id}`);
        socket.emit("join_room1", {
          room: `${res.data.result[0].admin}${res.data.result[0].user_id}`,
        });
        setmychat1(reverseddate);
      })
      .catch((err) => {
        setchaterr(err.response.data.message);
      });
  };
  const sendMessage1 = async () => {

const time =`${Date.now()}` 
    socket.emit("send_message1", {
      room: key,
      author: "user",
      time: time,
      message: chat,
    });
  


    Axios.post(
      "/SupportNew/addQuery",
      { message: chat },
      {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      }
    )
      .then((res) => {
        const message = {
          author: "user",
          time: time,
          message: chat,
        };

        setmychat1((prev) => [message, ...prev]);
        setchat("")
      })
      .catch((err) => {
        setchaterr(err.response.data.message);
      });
  };
  const timechangring = (values) => {
    let dates = Number(values);
    let a = `${
      new Date(dates).getHours() >= 13
        ? new Date(dates).getHours() - 12
        : new Date(dates).getHours()
    }:${new Date(dates).getMinutes()} ${
      new Date(dates).getHours() >= 12 ? "PM" : "AM"
    }    `;
    let b = `   ${new Date(dates).getDate()}-${
      new Date(dates).getMonth() + 1
    }-${new Date(dates).getFullYear()}`;

    return [a, b];
  };

  useEffect(() => {
    getmychat1();
  }, []);

  const sendMessage123 = async () => {
    socket.emit("send_message1", {
      room: key,
      author: "user",
      time: `${Date.now()}`,
      message: chat,
    });
  };
  useEffect(() => {
    socket.on("receive_message1", (data) => {
      setmychat1((prev) => [data, ...prev]);
    });
  }, []);

  return (
    <div className="support-body">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
            <Item className={classes.transbg}>
              <Button
                className="back-icon-page"
                variant="contained"
                startIcon={<ArrowBackIcon />}
                onClick={() => {
                  navigate("/supportmain");
                }}
              >
                Back
              </Button>
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Item className={classes.middlepart}>
              <div className="support-title">Support</div>
              <div className="chat-box-outer">
                <div className="chat-box-inner">
                  {mychat1 &&
                    mychat1?.map((item, index) => {
                      return (
                        <div>
                          {item.author == "user" && (
                            <div className="chat-person-2">
                              <div className="avatarchat2-outer">
                                <div className="avatarchat2">
                                  {/* <img src={avatarchat2} alt="avatarchat2" /> */}
                                </div>
                                <label>You</label>
                              </div>
                              <p>{item.message}</p>
                              <span className="timing">
                                {timechangring(item.time)}
                              </span>
                            </div>
                          )}
                          {item.author == "admin" && (
                            <div className="chat-person-1">
                              <div className="avatarchat1-outer">
                                <div className="avatarchat1">
                                  {/* <img src={avatarchat1} alt="avatarchat1" /> */}
                                </div>
                                <label>Admin</label>
                              </div>
                              <p>{item.message}</p>
                              <span className="timing1">
                                {timechangring(item.time)}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="message-text-box">
                <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  maxRows={4}
                  value={chat}
                  onChange={(e) => {
                    if (chat?.length < 3) {
                      const result = e.target.value.replace(/[^a-z][^0-9]/gi, "");
                      setchat(result);
                    } else {
                      setchat(e.target.value);
                    }
                  }}
                />
                {chat?.length > 1 && <SendIcon onClick={sendMessage1} />}
              </div>
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
            <Item className={classes.transbg}></Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SupportBody;
