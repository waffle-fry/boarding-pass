import { createContext } from "react";

const AppContext = createContext({
  logo: null,
  company_name: null,
  email_address: null,
  welcome_title: null,
  welcome_subtitle: null,
  teams: [],
  onboarded: [],
});

export default AppContext;
