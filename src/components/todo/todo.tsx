import React, { useState } from "react";
import "./todo.css";
function Todo() {
	interface ITodo {
		todo: string;
		status: string;
	}

	const [todoList, setTodoList] = useState([
		{
			id: 1,
			todo: "Study frontend from youtube",
			status: "active",
		},
		{
			id: 2,
			todo: "record video for chopta",
			status: "complete",
		},
		{
			id: 3,
			todo: "edit video for chopta",
			status: "active",
		},
	]);

	const _getCurrentState = () => {
		console.log("too List : ", todoList);
	};
	_getCurrentState();

	const _getActiveCount = () => {
		return todoList.filter((item) => item.status === "active").length;
	};

	const activeItems = _getActiveCount();

	const addTodo = (e: any) => {
		if (e.code === "Enter" && e.keyCode === 13) {
			const { value } = e.target;
			if (value !== "") {
				const newTodo = {
					todo: value,
					status: "active",
					id: todoList.length + 1,
				};
				const newTodoArr = [...todoList, newTodo];
				setTodoList(newTodoArr);
				e.target.value = "";
			}
		}
	};

	const _changeStatus = (value: string, status: "complete" | "active") => {
		const newTodoArr = todoList.map((todo) => {
			if (todo.id.toString() === value) {
				todo.status = status;
			}
			return todo;
		});
		return newTodoArr;
	};

	const markAsComplete = (e: any) => {
		const { checked } = e.target;
		const { nodeValue: value } = e.target.attributes.value;
		if (checked) {
			const newTodoArr = _changeStatus(value, "complete");
			setTodoList(newTodoArr);
		} else {
			const newTodoArr = _changeStatus(value, "active");
			setTodoList(newTodoArr);
		}
	};

	const clearComplete = () => {
		const newTodoArr = todoList.filter((todo) => {
			return todo.status !== "complete";
		});
		setTodoList(newTodoArr);
	};

	return (
		<>
			<div className="todos">
				<h2>TODO</h2>
				<div className="filter-container flex">
					<span className="total-items">
						{activeItems} {activeItems > 1 ? "items" : "item"} left
					</span>
					<ul className="filters">
						<li>All</li>
						<li>Active</li>
						<li>Complete</li>
					</ul>
					<span className="clear-all" onClick={clearComplete}>
						Clear completed
					</span>
				</div>
				<input
					type="text"
					placeholder="Create a new TODO..."
					onKeyDownCapture={addTodo}
				/>

				<ul className="todo-list">
					{todoList.length &&
						todoList.map((item) => {
							return (
								<li
									data-testid="record"
									className={`list-item ${
										item.status === "complete" && "complete"
									}`}
									key={item.id}>
									<input
										type="checkbox"
										value={item.id}
										name={item.id.toString()}
										id={item.id.toString()}
										checked={item.status === "complete" || false}
										onChange={markAsComplete}
									/>
									{item.todo}
								</li>
							);
						})}
				</ul>
			</div>
		</>
	);
}

export default Todo;
