import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { CardComponent } from "./CardComponent";

test("displays article title", async () => {
  const title = "My article title";
  render(<CardComponent article={{ title }} />);

  expect(screen.getByRole("heading")).toHaveTextContent(title);
});
