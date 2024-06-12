import React, { useEffect, useState } from "react";

//include images into your bundle

//create your first component
const Home = () => {
	const myUser = "jairomendespradela";
	const [tasks, setTasks] = useState([]);

	/*
	** Siempre crea mi usuario al cargar mi aplicación para asegurarme de que existe un usuario
	*/
	const createMyUser = async () => {
		let response = await fetch(`https://playground.4geeks.com/todo/users/${myUser}`, {
			method: "POST",
			body: JSON.stringify(myUser),
			headers: {
				"Content-Type": "application/json"
			}
		});

		let data = await response.json();

		console.info(response);
		console.info(data);
	}

	const getMyUserInfo = async () => {
		let response = await fetch(`https://playground.4geeks.com/todo/users/${myUser}`);
		let data = await response.json();
		console.log("LISTA!")
		console.log(data.todos);
		let list = [];

		for (let i = 0; i < data.todos.length; i++) {
			console.log(data.todos[i]);
			list.push(data.todos[i]);
		}

		setTasks(list);
	}

	const addMyTask = async (task) => {
		let response = await fetch(`https://playground.4geeks.com/todo/todos/${myUser}`, {
			method: "POST",
			body: JSON.stringify(
				{
					"label": `${task}`,
					"is_done": false
				}
			),
			headers: {
				"Content-Type": "application/json"
			}
		});

		let data = await response.json();
	}

	const deleteMyTask = async (id) => {
		let response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, { method: "DELETE" });
		let data = await response.json();
	}

	useEffect(() => {
		createMyUser();
		getMyUserInfo();
	}, []);

	useEffect(() => {
		getMyUserInfo();
	},);

	const handleListAdd = (event) => {
		if (event.key == "Enter" && event.target.value != "") {
			addMyTask(event.target.value);
			getMyUserInfo();
			event.target.value = "";
		}
	}

	const handleListDelete = (id) => {
		deleteMyTask(id);
		getMyUserInfo();
	}

	return (
		<div className="container mt-5">
			<h1 className="text-center">Todo List</h1>
			<ul className="list-group w-50 mx-auto">
				<input className="px-3 py-2" type="text" name="list" id="list" onKeyDown={handleListAdd} />
				{tasks.map((element, index) => {
					return (<li className="list-group-item d-flex justify-content-between todo-list" key={element.id}>{element.label} <span className="button-delete fw-bolder" onClick={() => handleListDelete(element.id)}>  X  </span></li>);
				})}
				<p className="border p-2 text-secondary">{tasks.length > 0 ? tasks.length + " item(s) left" : "No tasks"}</p>
			</ul>
		</div>
	);
};

export default Home;