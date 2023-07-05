import * as Yup from "yup";
import YupPassword from "yup-password";
import RouteList from "./RouteList";
YupPassword(Yup);

function App() {
  return <RouteList />;
}

export default App;
