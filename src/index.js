import vanillaPhoneTextBox from "./vanillaPhoneTextBox.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PhoneTextBox from "./PhoneTextBox.js";

vanillaPhoneTextBox(document.getElementById("phone"));

const rootElement = document.getElementById("reactPhoneTextBox");
const root = createRoot(rootElement);

root.render(
    <StrictMode>
      <PhoneTextBox />
    </StrictMode>
  );
