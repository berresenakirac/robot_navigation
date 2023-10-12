import React, { Component } from 'react';
import Config from "../scripts/config";

class WaypointForm extends Component {
  state = {
    ros: null,
    x: 0,
    y: 0,
    z: 0,
    connected: false,
  };

  componentDidMount() {
    this.init_connection();
  }

  init_connection() {
    const ros = new window.ROSLIB.Ros();
    console.log(ros);

    ros.on("connection", () => {
      console.log("connection established in Teleoperation Component!");
      console.log(ros);
      this.setState({ ros, connected: true });
    });

    ros.on("close", () => {
      console.log("connection is closed!");
      this.setState({ connected: false });
      setTimeout(() => {
        try {
          ros.connect(
            `ws://${Config.ROSBRIDGE_SERVER_IP}:${Config.ROSBRIDGE_SERVER_PORT}`
          );
        } catch (error) {
          console.log("connection problem ");
        }
      }, Config.RECONNECTION_TIMER);
    });

    try {
      ros.connect(
        `ws://${Config.ROSBRIDGE_SERVER_IP}:${Config.ROSBRIDGE_SERVER_PORT}`
      );
    } catch (error) {
      console.log(`ws://${Config.ROSBRIDGE_SERVER_IP}:${Config.ROSBRIDGE_SERVER_PORT}`);
      console.log("connection problem ");
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: parseFloat(value) });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { x, y, z } = this.state;
    const twist = new window.ROSLIB.Message({
      linear: { x, y, z },
      angular: { x: 0, y: 0, z: 0 },
    });
    const cmd_vel = new window.ROSLIB.Topic({
      ros: this.state.ros, // ROS örneği burada kullanılıyor
      name: "cmd_vel",
      messageType: "geometry_msgs/Twist",
    });
    cmd_vel.publish(twist);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Send Waypoint</h2>
        <label>
          X:
          <input
            type="number"
            name="x"
            value={this.state.x}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Y:
          <input
            type="number"
            name="y"
            value={this.state.y}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Z:
          <input
            type="number"
            name="z"
            value={this.state.z}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit">Move Robot</button>
      </form>
    );
  }
}

export default WaypointForm;
