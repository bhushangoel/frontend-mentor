import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Todo from "./todo";

test("TODO renders successfully", async () => {
	render(<Todo />);

	const element = await screen.findByText(/TODO/i);

	expect(element).toBeInTheDocument();
});

// test("3 todo exists", async () => {
// 	render(<Todo />);
// 	expect(screen.getAllByTestId("record").length).toBe(3);
// });

// test("clear completed", async () => {
// 	render(<Todo />);
// 	expect(screen.getAllByTestId("record").length).toBe(3);
// 	const a = await screen.findByText(/Clear completed/i);
// 	await userEvent.click(a);
// 	expect(screen.getAllByTestId("record").length).toBe(2);
// });
