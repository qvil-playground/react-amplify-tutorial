import React, { Component } from "react";
import Amplify, {
  // Analytics,
  // Storage,
  API,
  graphqlOperation
} from "aws-amplify";
import aws_exports from "./aws-exports";
import { listEvents } from "./graphql/queries";
import { createEvent } from "./graphql/mutations";
import { Input, Button } from "./components";
// import { withAuthenticator } from "aws-amplify-react";
Amplify.configure(aws_exports);

class App extends Component {
  state = {
    events: [],
    name: "",
    when: "",
    where: "",
    description: ""
  };

  setEvent = (name, when, where, description) => async () => {
    const newEvent = await API.graphql(
      graphqlOperation(createEvent, {
        name,
        when,
        where,
        description
      })
    );
    console.log(JSON.stringify(newEvent, undefined, 2));
    this.getListEvents();
  };

  getListEvents = async () => {
    console.log("listQuery");
    const AllEvents = await API.graphql(graphqlOperation(listEvents));
    console.log(JSON.stringify(AllEvents, undefined, 2));
    this.setState({ events: AllEvents.data.listEvents.items });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { getListEvents, handleChange, setEvent } = this;
    const { name, when, where, description, events } = this.state;

    return (
      <div>
        <h1>My Events</h1>
        <h2>Command Event</h2>
        <Input
          type="text"
          placeholder="name"
          value={name}
          onChange={handleChange("name")}
        />
        <Input
          type="text"
          placeholder="when"
          value={when}
          onChange={handleChange("when")}
        />
        <Input
          type="text"
          placeholder="where"
          value={where}
          onChange={handleChange("where")}
        />
        <Input
          type="text"
          placeholder="description"
          value={description}
          onChange={handleChange("description")}
        />
        <Button
          color="palevioletred"
          onClick={setEvent(name, when, where, description)}
        >
          Add Events
        </Button>
        <Button onClick={getListEvents}>Search Events</Button>
        <h2>List of Events(More Detail Check it out console!)</h2>
        <ul>
          {events.map((event, index) => (
            <li key={index}>{event.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

// export default withAuthenticator(App, true);
export default App;
