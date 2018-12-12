import React, { Component } from "react";
import Amplify, {
  // Analytics,
  // Storage,
  API,
  graphqlOperation
} from "aws-amplify";
import aws_exports from "./aws-exports";
import { listEvents } from "./graphql/queries";
// import { withAuthenticator } from "aws-amplify-react";
Amplify.configure(aws_exports);

class App extends Component {
  _listEvents = async () => {
    console.log("listQuery");
    const AllEvents = await API.graphql(graphqlOperation(listEvents));
    console.log(JSON.stringify(AllEvents, undefined, 2));
  };

  render() {
    return (
      <div>
        <button onClick={this._listEvents}>GraphQL Query</button>
      </div>
    );
  }
}

// export default withAuthenticator(App, true);
export default App;
