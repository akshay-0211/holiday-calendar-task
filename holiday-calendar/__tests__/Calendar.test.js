import { render, screen, fireEvent } from "@testing-library/react";
import Calendar from "../components/Calendar";

test("renders the calendar", () => {
  render(<Calendar />);
  expect(screen.getByText(/January|February|March/)).toBeInTheDocument();
});

test("allows adding a holiday", () => {
  render(<Calendar />);
  window.prompt = jest.fn(() => "Test Holiday");
  const dateCell = screen.getAllByText("1")[0];
  fireEvent.click(dateCell);
  expect(screen.getByText("Test Holiday")).toBeInTheDocument();
});
