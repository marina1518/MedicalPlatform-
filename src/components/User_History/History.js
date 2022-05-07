import React, { useState, useEffect } from "react";
import { BiMessageDetail } from "react-icons/bi";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../actions";
import { history } from "../../actions";

import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "../Floating_Buttons/TabPanel";

const History = () => {
  const dispatch = useDispatch();
  const token = JSON.parse(useSelector((state) => state.auth));
  console.log(token.token);
  var token_copy = token;

  const config = {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  };

  const Edit_history = async (history) => {
    try {
      const res = await axios.patch(
        "https://future-medical.herokuapp.com/user/edit/history",
        { history: history },
        config
      );
      alert(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  //edit history
  const [edit_h, setEdit_h] = useState(false);
  const [newh, setnewh] = useState(token.history);
  const setedit_history = () => {
    Edit_history(newh);
    token_copy.history = newh;
    dispatch(signin(token_copy));
    setEdit_h(false);
  };

  // Floating Buttons Code
  const labels = [
    "Surgeries",
    "Diseases allegories",
    "Family history",
    "Medications",
  ];

  const a11yProps = (index) => {
    return {
      id: `action-tab-${index}`,
      "aria-controls": `action-tabpanel-${index}`,
    };
  };

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className="card">
      <div className="card-header bg-transparent border-0">
        <h3 className="mb-0">
          <BiMessageDetail /> History
          {
            <EditIcon
              style={{ cursor: "pointer" }}
              onClick={(e) => setEdit_h(true)}
            />
          }
        </h3>
      </div>
      <div className="card-body pt-2">
        <Box
          sx={{
            // bgcolor: "background.paper",
            bgcolor: "transparent",
            width: "100%",
            position: "relative",
            minHeight: 200,
            fontWeight: "bold",
            fontSize: 19,
          }}
        >
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="action tabs example"
            >
              {labels.map((eachlabel, index) => (
                <Tab
                  key={index}
                  label={eachlabel}
                  {...a11yProps({ index })}
                  sx={{
                    fontWeight: "bold",
                  }}
                />
              ))}
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <p>
                {edit_h ? (
                  <Form.Control
                    as="textarea"
                    placeholder="Update History"
                    value={newh}
                    onChange={(e) => setnewh(e.target.value)}
                    style={{ height: "100px" }}
                  />
                ) : (
                  //   <input onChange={(e)=>setnewh(e.target.value)}></input>
                  token.history
                )}
              </p>

              {edit_h ? (
                //   <Button variant="outline-success" className="col-md-12 text-right" onClick={setedit_history}>Submit</Button>
                <ButtonGroup>
                  <Button
                    variant="outline-success"
                    className="col-md-12 text-right"
                    onClick={setedit_history}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="col-md-12 text-right"
                    onClick={(e) => setEdit_h(false)}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              ) : (
                ""
              )}
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <p>
                {edit_h ? (
                  <Form.Control
                    as="textarea"
                    placeholder="Update History"
                    value={newh}
                    onChange={(e) => setnewh(e.target.value)}
                    style={{ height: "100px" }}
                  />
                ) : (
                  //   <input onChange={(e)=>setnewh(e.target.value)}></input>
                  token.history
                )}
              </p>

              {edit_h ? (
                //   <Button variant="outline-success" className="col-md-12 text-right" onClick={setedit_history}>Submit</Button>
                <ButtonGroup>
                  <Button
                    variant="outline-success"
                    className="col-md-12 text-right"
                    onClick={setedit_history}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="col-md-12 text-right"
                    onClick={(e) => setEdit_h(false)}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              ) : (
                ""
              )}
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <p>
                {edit_h ? (
                  <Form.Control
                    as="textarea"
                    placeholder="Update History"
                    value={newh}
                    onChange={(e) => setnewh(e.target.value)}
                    style={{ height: "100px" }}
                  />
                ) : (
                  //   <input onChange={(e)=>setnewh(e.target.value)}></input>
                  token.history
                )}
              </p>

              {edit_h ? (
                //   <Button variant="outline-success" className="col-md-12 text-right" onClick={setedit_history}>Submit</Button>
                <ButtonGroup>
                  <Button
                    variant="outline-success"
                    className="col-md-12 text-right"
                    onClick={setedit_history}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="col-md-12 text-right"
                    onClick={(e) => setEdit_h(false)}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              ) : (
                ""
              )}
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              <p>
                {edit_h ? (
                  <Form.Control
                    as="textarea"
                    placeholder="Update History"
                    value={newh}
                    onChange={(e) => setnewh(e.target.value)}
                    style={{ height: "100px" }}
                  />
                ) : (
                  //   <input onChange={(e)=>setnewh(e.target.value)}></input>
                  token.history
                )}
              </p>

              {edit_h ? (
                //   <Button variant="outline-success" className="col-md-12 text-right" onClick={setedit_history}>Submit</Button>
                <ButtonGroup>
                  <Button
                    variant="outline-success"
                    className="col-md-12 text-right"
                    onClick={setedit_history}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="col-md-12 text-right"
                    onClick={(e) => setEdit_h(false)}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              ) : (
                ""
              )}
            </TabPanel>
          </SwipeableViews>
        </Box>
      </div>
    </div>
  );
};

export default History;
