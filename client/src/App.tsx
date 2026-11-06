import { Route, Router, Switch } from "wouter";
import Layout from "@/components/Layout";
import Accommodation from "@/pages/Accommodation";
import Attractions from "@/pages/Attractions";
import DayDetail from "@/pages/DayDetail";
import Home from "@/pages/Home";
import MapPage from "@/pages/MapPage";
import PrintView from "@/pages/PrintView";
import Transport from "@/pages/Transport";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  return (
    <Router base={base}>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/day/:id" component={DayDetail} />
          <Route path="/map" component={MapPage} />
          <Route path="/transport" component={Transport} />
          <Route path="/stay" component={Accommodation} />
          <Route path="/sights" component={Attractions} />
          <Route path="/print" component={PrintView} />
          <Route>
            <div>
              <h1 className="font-serif text-3xl">沒有這一頁</h1>
              <a className="mt-3 inline-block text-beni" href={import.meta.env.BASE_URL}>
                回總覽
              </a>
            </div>
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}
