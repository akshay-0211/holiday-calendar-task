import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Holiday Calendar heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/Holiday Calendar/i);
  expect(headingElement).toBeInTheDocument();
});
