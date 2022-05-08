import { React, useRef, useState } from "react";
import { ListGroup, Row, Col, Button } from "react-bootstrap";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import "./cal.css";
import mom from "moment-timezone";
import { BsFillSunFill, BsMoonStarsFill, BsClockFill } from "react-icons/bs";
import { signin } from "../../actions";
import axios from "axios";
import Carousel from "react-grid-carousel";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Reserve_Date from "./Reserve_Date";

const Calendar = (props) => {
  const dispatch = useDispatch();
  console.log(props.data.id);
  const token = JSON.parse(useSelector((state) => state.auth));
  var token_copy = token;
  const config = { headers: { Authorization: `Bearer ${props.data.token}` } };
  var reserved_slots = [];
  const Get_timetable = async (date) => {
    try {
      const res = await axios.get(
        `https://future-medical.herokuapp.com/user/timetable/${props.data.id}/${date}`
      );
      const data = await res.data;
      console.log(data);
      if (data == "no reservations in this date") {
        return [];
      }

      for (var i = 0; i < data.length; i++) {
        reserved_slots.push(data[i].slot);
      }

      return reserved_slots;
    } catch (err) {
      console.error(err);
    }
  };

  const Get_Reserve = async (r) => {
    try {
      const res = await axios.post(
        `https://future-medical.herokuapp.com/user/reservation/meeting`,
        { doctorEmail: r.doctorEmail, date: r.date, day: r.day, slot: r.slot },
        config
      );
      const data = await res.data;
      console.log(data);
      alert(data);
    } catch (err) {
      console.error(err);
    }
  };

  const ref = useRef(null);
  //   const scroll = (scrollOffset) => {
  //     ref.current.scrollLeft += scrollOffset;
  //   };

  let momentObject = moment();
  mom.tz.setDefault("Egypt/Cairo");

  var dr_app = [];
  for (var i = 0; i < props.data.timetable.length; i++) {
    const f = props.data.timetable[i].from.split(":");
    const t = props.data.timetable[i].to.split(":");
    dr_app.push({ day: props.data.timetable[i].day, from: f[0], to: t[0] });
  }
  var days = [];

  for (var i = 0; i < 90; i++) {
    const day = moment().add(i, "day");
    for (var j = 0; j < dr_app.length; j++) {
      if (day.format("dddd") === dr_app[j].day) {
        days.push(day);
        break;
      }
    }
  }

  const [mor, setmor] = useState([]);
  const [eve, seteve] = useState([]);
  const [data, setdata] = useState("");
  const [date2, setdate] = useState("");

  const get_slots = (e, item) => {
    setdone_reserve(false);
    setdata(item); //to know the day and date clicked
    var morning_shifts = [];
    var evening_shifts = [];
    const day = item.format("dddd");
    const date = `${item.format("DD-MM-YYYY")}`; //to api
    (async () => {
      var reserved = await Get_timetable(date);
      console.log(reserved);

      for (var i = 0; i < dr_app.length; i++) {
        if (dr_app[i].day === day) {
          //check day
          if (dr_app[i].from <= 12) {
            const num_slots =
              parseInt(parseInt(dr_app[i].to) - parseInt(dr_app[i].from)) * 2;
            console.log(num_slots);
            var c = parseInt(dr_app[i].from);
            var d = parseInt(dr_app[i].from) + 1;

            for (var k = 0; k < num_slots; k++) {
              //check for slot state
              if (k % 2 === 0) {
                if (reserved.includes(`${c}:00 - ${c}:30`)) {
                  morning_shifts.push({
                    slot: `${c}:00 - ${c}:30`,
                    state: true,
                  });
                } else {
                  morning_shifts.push({
                    slot: `${c}:00 - ${c}:30`,
                    state: false,
                  });
                }
              } else {
                if (reserved.includes(`${c}:30 - ${d}:00`)) {
                  morning_shifts.push({
                    slot: `${c}:30 - ${d}:00`,
                    state: true,
                  });
                } else {
                  morning_shifts.push({
                    slot: `${c}:30 - ${d}:00`,
                    state: false,
                  });
                }

                c += 1;
                d += 1;
              }
            }
          } else if (dr_app[i].from > 12) {
            const num_slots =
              parseInt(parseInt(dr_app[i].to) - parseInt(dr_app[i].from)) * 2;
            console.log(num_slots);
            var c = parseInt(dr_app[i].from);
            var d = parseInt(dr_app[i].from) + 1;
            for (var k = 0; k < num_slots; k++) {
              if (k % 2 === 0) {
                if (reserved.includes(`${c}:00 - ${c}:30`)) {
                  evening_shifts.push({
                    slot: `${c}:00 - ${c}:30`,
                    state: true,
                  });
                } else {
                  evening_shifts.push({
                    slot: `${c}:00 - ${c}:30`,
                    state: false,
                  });
                }
              } else {
                if (reserved.includes(`${c}:30 - ${d}:00`)) {
                  evening_shifts.push({
                    slot: `${c}:30 - ${d}:00`,
                    state: true,
                  });
                  c += 1;
                  d += 1;
                } else {
                  evening_shifts.push({
                    slot: `${c}:30 - ${d}:00`,
                    state: false,
                  });
                  c += 1;
                  d += 1;
                }
              }
            }
          }
        }
      }

      setmor(morning_shifts);
      seteve(evening_shifts);
    })();
  };

  const [can, setcan] = useState(false);
  const [slot_time, setslot] = useState("");
  let r = {};
  const reserve = (e, slot) => {
    e.preventDefault();
    let y = `${data.format("DD-MM-YYYY")}`;
    r.doctorEmail = props.data.email;
    r.date = y;
    y = `${data.format("dddd")}`;
    r.day = y;
    r.slot = slot;
    //Api
    token_copy.meetings.push({
      Date: r.date,
      day: r.day,
      slot: r.slot,
      doctor: { username: props.data.username },
    });
    dispatch(signin(token_copy)); //update the state
    console.log(r);
    Get_Reserve(r);
    setdone_reserve(true);
    setcan(false);
    setslot("");
  };

  const [done_reserve, setdone_reserve] = useState(false);

  return (
    <ListGroup variant="flush">
      <div>
        <ListGroup.Item>
          <Row>
            {/* <h6>{momentObject.format("MMM YYYY")}</h6> */}
            <Col>
              {/* <button
                type="button"
                style={{ color: "black" }}
                class="btn btn-outline-light"
                className="scrolling"
                onClick={() => scroll(-20)}
              >
                <AiOutlineLeft />
              </button> */}
              {/* <Col>
                <button onClick={() => scroll(-20)}>LEFT</button>
                <button onClick={() => scroll(20)}>RIGHT</button>
              </Col> */}
              <div className="Calender_buttons">
                {/* <Slider {...settings} className="slider_container_UI"> */}
                <Carousel
                  cols={7}
                  rows={1}
                  gap={1}
                  responsiveLayout={[
                    {
                      breakpoint: 1200,
                      cols: 5,
                    },
                    {
                      breakpoint: 990,
                      cols: 3,
                    },
                    {
                      breakpoint: 550,
                      cols: 1,
                    },
                  ]}
                  mobileBreakpoint={670}
                  arrowRight={<ChevronRightIcon className="right-arrow" />}
                  arrowLeft={<ChevronLeftIcon className="left-arrow" />}
                >
                  {days.map((item, index) => (
                    <Carousel.Item key={index}>
                      <button
                        type="button"
                        id="calender-btn"
                        class="btn"
                        onClick={(e) => get_slots(e, item)}
                      >
                        <Reserve_Date
                          day={item.format("DD")}
                          month={momentObject.format("MMM")}
                          year={momentObject.format("YYYY")}
                        />
                        {/* {item.format("dddd")} <br /> {item.format("DD")} */}
                      </button>
                    </Carousel.Item>
                  ))}
                </Carousel>
                {/* </Slider> */}
              </div>

              {/* <button
                type="button"
                class="btn btn-outline-light"
                className="scrolling"
                style={{ color: "black" }}
                // onClick={() => scroll(20)}
              >
                <AiOutlineRight />
              </button> */}
            </Col>
          </Row>
          <br />
          <Row>
            <h6>
              <BsFillSunFill style={{ color: "#ffe135" }} />
              {done_reserve ? (
                <strong>0 Slots</strong>
              ) : (
                <strong>{mor.length} Slots</strong>
              )}
            </h6>
            <Col>
              <div className="slots-UI">
                {done_reserve
                  ? ""
                  : mor.map((item) => (
                      <Button
                        onClick={() => {
                          setslot(item.slot);
                          setcan(true);
                        }}
                        variant="outline-primary"
                        disabled={item.state}
                        style={{ color: "black", marginRight: "10px" }}
                      >
                        {item.slot}
                      </Button>
                    ))}
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <h6>
              <BsMoonStarsFill style={{ color: "#273be2" }} />
              {done_reserve ? (
                <strong>0 Slots</strong>
              ) : (
                <strong>{eve.length} Slots</strong>
              )}
            </h6>
            <Col>
              <div className="slots-UI">
                {done_reserve
                  ? ""
                  : eve.map((item) => (
                      <Button
                        onClick={() => {
                          setslot(item.slot);
                          setcan(true);
                        }}
                        variant="outline-primary"
                        style={{ color: "black", marginRight: "1px" }}
                        disabled={item.state}
                      >
                        {item.slot}
                      </Button>
                    ))}
              </div>
            </Col>
          </Row>
          <br />
          {can && !done_reserve ? (
            <>
              <Row>
                <Col>
                  <BsClockFill /> <label>{slot_time}</label>
                </Col>
                <Col>
                  <Button onClick={(e) => reserve(e, slot_time)}>
                    Reserve
                  </Button>
                </Col>
              </Row>
            </>
          ) : (
            ""
          )}
        </ListGroup.Item>
      </div>
      <br />
    </ListGroup>
  );
};
export default Calendar;
